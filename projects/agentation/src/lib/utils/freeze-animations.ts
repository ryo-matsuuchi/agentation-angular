// =============================================================================
// アニメーション凍結
// =============================================================================
//
// setTimeout、setInterval、requestAnimationFrameをモンキーパッチして、
// 凍結中はコールバックをサイレントにスキップする。
// またCSS animations/transitionsを一時停止するCSSを注入し、
// WAAPIアニメーションと動画も一時停止する。
//
// ツールバー/ポップアップコードはパッチをバイパスするために
// `originalSetTimeout`等をインポートする必要がある。
//
// パッチはこのモジュールのインポート時に副作用として適用される。
// =============================================================================

// 除外セレクタ — agentation UI要素は凍結対象外
const EXCLUDE_ATTRS = [
  "data-feedback-toolbar",
  "data-annotation-popup",
  "data-annotation-marker",
];
const NOT_SELECTORS = EXCLUDE_ATTRS
  .flatMap((a) => [`:not([${a}])`, `:not([${a}] *)`])
  .join("");

const STYLE_ID = "feedback-freeze-styles";
const STATE_KEY = "__agentation_freeze";

// ---------------------------------------------------------------------------
// ウィンドウ上の共有ミュータブル状態（HMRモジュール再実行を生き残る）
// ---------------------------------------------------------------------------
interface FreezeState {
  frozen: boolean;
  installed: boolean;
  origSetTimeout: typeof setTimeout;
  origSetInterval: typeof setInterval;
  origRAF: typeof requestAnimationFrame;
  // キューはHMRモジュール再実行を生き残るようウィンドウ上に配置
  pausedAnimations: Animation[];
  frozenTimeoutQueue: Array<() => void>;
  frozenRAFQueue: FrameRequestCallback[];
}

function getState(): FreezeState {
  if (typeof window === "undefined") {
    // SSRスタブ
    return {
      frozen: false,
      installed: true, // サーバー上でのパッチを防止
      origSetTimeout: setTimeout,
      origSetInterval: setInterval,
      origRAF: (cb: FrameRequestCallback) => 0 as unknown as number,
      pausedAnimations: [],
      frozenTimeoutQueue: [],
      frozenRAFQueue: [],
    };
  }
  const w = window as unknown as Record<string, unknown>;
  if (!w[STATE_KEY]) {
    w[STATE_KEY] = {
      frozen: false,
      installed: false,
      origSetTimeout: null,
      origSetInterval: null,
      origRAF: null,
      pausedAnimations: [],
      frozenTimeoutQueue: [],
      frozenRAFQueue: [],
    };
  }
  return w[STATE_KEY] as FreezeState;
}

const _s = getState();

// ---------------------------------------------------------------------------
// パッチのインストール（一度のみ — `installed`がウィンドウ上にあるためHMRを生き残る）
// ---------------------------------------------------------------------------
if (typeof window !== "undefined" && !_s.installed) {
  // 実際の関数を保存
  _s.origSetTimeout = window.setTimeout.bind(window);
  _s.origSetInterval = window.setInterval.bind(window);
  _s.origRAF = window.requestAnimationFrame.bind(window);

  // setTimeoutのパッチ — 凍結時はコールバックをキューに入れる（解凍時にリプレイ）
  (window as unknown as Record<string, unknown>)['setTimeout'] = (
    handler: TimerHandler,
    timeout?: number,
    ...args: unknown[]
  ): ReturnType<typeof setTimeout> => {
    if (typeof handler === "string") {
      return _s.origSetTimeout(handler, timeout) as unknown as ReturnType<typeof setTimeout>;
    }
    return _s.origSetTimeout(
      (...a: unknown[]) => {
        if (_s.frozen) {
          _s.frozenTimeoutQueue.push(() => (handler as (...args: unknown[]) => void)(...a));
        } else {
          (handler as (...args: unknown[]) => void)(...a);
        }
      },
      timeout,
      ...args,
    ) as unknown as ReturnType<typeof setTimeout>;
  };

  // setIntervalのパッチ — 凍結時はコールバックをスキップ
  (window as unknown as Record<string, unknown>)['setInterval'] = (
    handler: TimerHandler,
    timeout?: number,
    ...args: unknown[]
  ): ReturnType<typeof setInterval> => {
    if (typeof handler === "string") {
      return _s.origSetInterval(handler, timeout) as unknown as ReturnType<typeof setInterval>;
    }
    return _s.origSetInterval(
      (...a: unknown[]) => {
        if (!_s.frozen) (handler as (...args: unknown[]) => void)(...a);
      },
      timeout,
      ...args,
    ) as unknown as ReturnType<typeof setInterval>;
  };

  // requestAnimationFrameのパッチ — 凍結時はコールバックをキューに入れる（CPUスピンなし）
  // ラッパーは次のフレームで一度だけ発火し、まだ凍結中ならコールバックは
  // _s.frozenRAFQueueに保存され、解凍時にリプレイされる
  (window as unknown as Record<string, unknown>)['requestAnimationFrame'] = (
    callback: FrameRequestCallback,
  ): number => {
    return _s.origRAF((timestamp: number) => {
      if (_s.frozen) {
        _s.frozenRAFQueue.push(callback);
      } else {
        callback(timestamp);
      }
    });
  };

  _s.installed = true;
}

// ---------------------------------------------------------------------------
// エクスポート — ツールバー/ポップアップ用のオリジナル（パッチなし）タイミング関数
// ---------------------------------------------------------------------------
export const originalSetTimeout = _s.origSetTimeout;
export const originalSetInterval = _s.origSetInterval;

// ---------------------------------------------------------------------------
// 凍結 / 解凍
// ---------------------------------------------------------------------------

function isAgentationElement(el: Element | null): boolean {
  if (!el) return false;
  return EXCLUDE_ATTRS.some((attr) => !!el.closest?.(`[${attr}]`));
}

export function freeze(): void {
  if (typeof document === "undefined") return;
  if (_s.frozen) return;
  _s.frozen = true;
  _s.frozenTimeoutQueue = [];
  _s.frozenRAFQueue = [];

  // CSS注入 — CSSアニメーションを一時停止しトランジションを無効化
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
  }
  style.textContent = `
    *${NOT_SELECTORS},
    *${NOT_SELECTORS}::before,
    *${NOT_SELECTORS}::after {
      animation-play-state: paused !important;
      transition: none !important;
    }
  `;
  document.head.appendChild(style);

  // WAAPI — 実行中の非agentationアニメーションのみ一時停止して参照を保存
  // （完了済みアニメーションを一時停止するとplay()時に再開始してしまい、入口アニメーションが壊れる）
  _s.pausedAnimations = [];
  try {
    document.getAnimations().forEach((anim) => {
      if (anim.playState !== "running") return;
      const target = (anim.effect as KeyframeEffect)?.target as Element | null;
      if (!isAgentationElement(target)) {
        anim.pause();
        _s.pausedAnimations.push(anim);
      }
    });
  } catch {
    // getAnimationsが全環境で利用できるとは限らない
  }

  // 動画の一時停止
  document.querySelectorAll("video").forEach((video) => {
    if (!video.paused) {
      video.dataset['wasPaused'] = "false";
      video.pause();
    }
  });
}

export function unfreeze(): void {
  if (typeof document === "undefined") return;
  if (!_s.frozen) return;
  _s.frozen = false;

  // キューされたsetTimeoutコールバックを非同期でリプレイ
  // （停止したdelay() Promiseの解決、visibilitychangeで中断されたアニメーションループの再開等）
  // origSetTimeout(cb, 0)を使用してメインスレッドを一度にブロックしない
  // 実行前に_s.frozenを再チェック — スケジューリングと実行の間にfreeze()が再度呼ばれた場合、
  // 実行せずにコールバックを再キューする
  const timeoutQueue = _s.frozenTimeoutQueue;
  _s.frozenTimeoutQueue = [];
  for (const cb of timeoutQueue) {
    _s.origSetTimeout(() => {
      if (_s.frozen) {
        _s.frozenTimeoutQueue.push(cb);
        return;
      }
      try {
        cb();
      } catch (e) {
        console.warn("[agentation] Error replaying queued timeout:", e);
      }
    }, 0);
  }

  // キューされたrAFコールバックを次のフレームにスケジュール
  // _s.frozenを再チェック — フレーム発火前に再凍結された場合、再キューする
  const rafQueue = _s.frozenRAFQueue;
  _s.frozenRAFQueue = [];
  for (const cb of rafQueue) {
    _s.origRAF((ts: number) => {
      if (_s.frozen) {
        _s.frozenRAFQueue.push(cb);
        return;
      }
      cb(ts);
    });
  }

  // WAAPI — CSS除去前に一時停止したアニメーションを再開
  // （CSSを先に除去するとブラウザがアニメーションオブジェクトを置換する可能性がある）
  for (const anim of _s.pausedAnimations) {
    try {
      anim.play();
    } catch (e) {
      console.warn("[agentation] Error resuming animation:", e);
    }
  }
  _s.pausedAnimations = [];

  // CSS注入を除去
  document.getElementById(STYLE_ID)?.remove();

  // 動画を再開
  document.querySelectorAll("video").forEach((video) => {
    if (video.dataset['wasPaused'] === "false") {
      video.play().catch(() => {});
      delete video.dataset['wasPaused'];
    }
  });
}
