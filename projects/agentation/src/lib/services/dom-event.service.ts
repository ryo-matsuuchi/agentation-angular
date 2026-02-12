// =============================================================================
// DOMイベント管理サービス
// =============================================================================
//
// NgZone外で高頻度DOMイベント（mousemove, click, scroll等）を処理し、
// 変更検出のパフォーマンスオーバーヘッドを最小化する。
//

import { Injectable, NgZone, DestroyRef, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { deepElementFromPoint, isElementFixed } from '../utils/helpers';
import {
  identifyElement,
  getNearbyText,
  getElementClasses,
  getDetailedComputedStyles,
  getForensicComputedStyles,
  getFullElementPath,
  getAccessibilityInfo,
  getNearbyElements,
} from '../utils/element-identification';
import { getAngularComponentName } from '../detection/angular-detector';
import { originalSetTimeout } from '../utils/freeze-animations';

// マウスムーブコールバックの型
export interface MouseMoveResult {
  element: string;
  elementName: string;
  elementPath: string;
  rect: DOMRect | null;
  angularComponents?: string | null;
  position: { x: number; y: number };
}

// クリックコールバックの型
export interface ClickResult {
  x: number;
  y: number;
  clientY: number;
  element: string;
  elementPath: string;
  selectedText?: string;
  boundingBox?: { x: number; y: number; width: number; height: number };
  nearbyText?: string;
  cssClasses?: string;
  isMultiSelect?: boolean;
  isFixed?: boolean;
  fullPath?: string;
  accessibility?: string;
  computedStyles?: string;
  computedStylesObj?: Record<string, string>;
  nearbyElements?: string;
  angularComponents?: string;
  elementBoundingBoxes?: Array<{ x: number; y: number; width: number; height: number }>;
  targetElement?: HTMLElement;
}

@Injectable()
export class DOMEventService {
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  // イベントストリーム
  readonly mouseMove$ = new Subject<MouseMoveResult>();
  readonly elementClick$ = new Subject<ClickResult>();
  readonly escapePress$ = new Subject<void>();
  readonly scrollChange$ = new Subject<number>();

  // イベントリスナーのクリーンアップ関数
  private cleanupFns: Array<() => void> = [];
  private isAttached = false;

  // ドラッグ選択の状態
  private mouseDownPos: { x: number; y: number } | null = null;
  private dragStart: { x: number; y: number } | null = null;
  private isDragActive = false;
  private lastElementUpdate = 0;
  private justFinishedDrag = false;
  private readonly DRAG_THRESHOLD = 8;
  private readonly ELEMENT_UPDATE_THROTTLE = 50;

  // ドラッグ選択のイベントストリーム
  readonly dragStateChange$ = new Subject<boolean>();
  readonly dragRect$ = new Subject<{ left: number; top: number; width: number; height: number } | null>();
  readonly dragHighlights$ = new Subject<DOMRect[]>();
  readonly dragComplete$ = new Subject<ClickResult>();

  // ドラッグ開始を無視するテキスト要素・フォーム要素タグ
  private readonly TEXT_TAGS = new Set([
    'P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
    'LI', 'TD', 'TH', 'LABEL', 'BLOCKQUOTE', 'FIGCAPTION',
    'CAPTION', 'LEGEND', 'DT', 'DD', 'PRE', 'CODE',
    'EM', 'STRONG', 'B', 'I', 'U', 'S', 'A',
    'TIME', 'ADDRESS', 'CITE', 'Q', 'ABBR', 'DFN',
    'MARK', 'SMALL', 'SUB', 'SUP',
    'INPUT', 'TEXTAREA', 'SELECT',
  ]);

  // ドラッグ検出対象の有意な要素タグ
  private readonly MEANINGFUL_TAGS = new Set([
    'BUTTON', 'A', 'INPUT', 'IMG',
    'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
    'LI', 'LABEL', 'TD', 'TH',
    'SECTION', 'ARTICLE', 'ASIDE', 'NAV',
  ]);

  // 近傍要素検索セレクタ
  private readonly NEARBY_SELECTOR = 'button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th, div, span, section, article, aside, nav';

  // 最終要素検索セレクタ（mouseup時）
  private readonly FINAL_SELECTOR = 'button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th';

  /** DOMイベントリスナーを設置（ツールバー活性化時に呼び出し） */
  attach(options: {
    angularMode: 'smart' | 'filtered' | 'all' | 'off';
    outputDetail: string;
    blockInteractions: boolean;
  }): void {
    if (this.isAttached) return;
    this.isAttached = true;

    this.ngZone.runOutsideAngular(() => {
      // --- ドラッグ選択: mousedown ---
      const handleMouseDown = (e: MouseEvent): void => {
        // 左ボタンのみ（右クリック・中クリック等を除外）
        if (e.button !== 0) return;

        const target = deepElementFromPoint(e.clientX, e.clientY);
        if (!target) return;
        if (this.isToolbarElement(target)) return;

        // テキスト要素上ではネイティブ選択を優先
        if (this.TEXT_TAGS.has(target.tagName) || target.isContentEditable) return;

        this.mouseDownPos = { x: e.clientX, y: e.clientY };
      };

      document.addEventListener('mousedown', handleMouseDown);
      this.cleanupFns.push(() => document.removeEventListener('mousedown', handleMouseDown));

      // mousemoveリスナー
      const handleMouseMove = (e: MouseEvent): void => {
        // --- ドラッグ処理 ---
        if (this.mouseDownPos) {
          const dx = e.clientX - this.mouseDownPos.x;
          const dy = e.clientY - this.mouseDownPos.y;
          const distance = dx * dx + dy * dy;
          const thresholdSq = this.DRAG_THRESHOLD * this.DRAG_THRESHOLD;

          if (!this.isDragActive && distance >= thresholdSq) {
            this.dragStart = this.mouseDownPos;
            this.isDragActive = true;
            this.dragStateChange$.next(true);
          }

          if (this.isDragActive && this.dragStart) {
            // ドラッグ矩形を更新
            const left = Math.min(this.dragStart.x, e.clientX);
            const top = Math.min(this.dragStart.y, e.clientY);
            const width = Math.abs(e.clientX - this.dragStart.x);
            const height = Math.abs(e.clientY - this.dragStart.y);
            this.dragRect$.next({ left, top, width, height });

            // 要素検出のスロットリング
            const now = Date.now();
            if (now - this.lastElementUpdate < this.ELEMENT_UPDATE_THROTTLE) return;
            this.lastElementUpdate = now;

            const right = Math.max(this.dragStart.x, e.clientX);
            const bottom = Math.max(this.dragStart.y, e.clientY);

            const highlights = this.findElementsInRect(left, top, right, bottom);
            this.dragHighlights$.next(highlights);
            return; // ドラッグ中はホバー処理をスキップ
          }
        }

        // --- 通常のホバー処理 ---
        const target = deepElementFromPoint(e.clientX, e.clientY);
        if (!target) return;

        // フィードバックツールバー自体の要素は無視
        if (this.isToolbarElement(target)) {
          this.mouseMove$.next({
            element: '',
            elementName: '',
            elementPath: '',
            rect: null,
            position: { x: e.clientX, y: e.clientY },
          });
          return;
        }

        const { name: elementName, path } = identifyElement(target);

        // Angularコンポーネント検出
        let angularComponents: string | null = null;
        if (options.angularMode !== 'off') {
          const info = getAngularComponentName(target, { mode: 'auto' });
          angularComponents = info.path;
        }

        const displayName = angularComponents
          ? `${angularComponents} ${elementName}`
          : elementName;

        this.mouseMove$.next({
          element: displayName,
          elementName,
          elementPath: path,
          rect: target.getBoundingClientRect(),
          angularComponents,
          position: { x: e.clientX, y: e.clientY },
        });
      };

      document.addEventListener('mousemove', handleMouseMove);
      this.cleanupFns.push(() => document.removeEventListener('mousemove', handleMouseMove));

      // クリックリスナー（capture phaseで先に処理）
      const handleClick = (e: MouseEvent): void => {
        // ドラッグ直後のクリックは無視
        if (this.justFinishedDrag) {
          this.justFinishedDrag = false;
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const target = deepElementFromPoint(e.clientX, e.clientY);
        if (!target) return;
        if (this.isToolbarElement(target)) return;

        // リンクナビゲーション等のデフォルト動作を常に阻止（React版準拠）
        e.preventDefault();

        // インタラクティブ要素のイベント伝播のみブロック（React版準拠）
        // button, a, input等の要素はblockInteractions有効時のみstopPropagation
        // それ以外の要素（div等）のクリックイベントは常に伝播させる
        if (options.blockInteractions) {
          const isInteractive = !!target.closest(
            'button, a, input, select, textarea, [role="button"], [onclick]'
          );
          if (isInteractive) {
            e.stopPropagation();
          }
        }

        const { name: elementName, path: elementPath } = identifyElement(target);
        const rect = target.getBoundingClientRect();
        const isFixed = isElementFixed(target);

        // 要素の詳細情報を収集
        const nearbyText = getNearbyText(target);
        const cssClasses = getElementClasses(target);
        const fullPath = getFullElementPath(target);
        const accessibility = getAccessibilityInfo(target);
        const nearbyElements = getNearbyElements(target);

        // 常にポップアップ用のComputedStylesを収集（React版準拠）
        let computedStyles = '';
        const computedStylesObj = getDetailedComputedStyles(target);

        // フォレンジックモードでは追加で詳細文字列も取得
        if (options.outputDetail === 'forensic') {
          computedStyles = getForensicComputedStyles(target);
        } else {
          computedStyles = Object.entries(computedStylesObj)
            .map(([k, v]) => `${k}: ${v}`)
            .join('; ');
        }

        // Angularコンポーネント検出
        let angularComponents: string | undefined;
        if (options.angularMode !== 'off') {
          const info = getAngularComponentName(target, { mode: 'auto' });
          angularComponents = info.path || undefined;
        }

        const displayName = angularComponents
          ? `${angularComponents} ${elementName}`
          : elementName;

        const x = (e.clientX / window.innerWidth) * 100;
        const y = isFixed ? e.clientY : e.clientY + window.scrollY;

        this.elementClick$.next({
          x,
          y,
          clientY: e.clientY,
          element: displayName,
          elementPath,
          selectedText: window.getSelection()?.toString()?.trim() || undefined,
          boundingBox: {
            x: rect.x,
            y: isFixed ? rect.y : rect.y + window.scrollY,
            width: rect.width,
            height: rect.height,
          },
          nearbyText: nearbyText || undefined,
          cssClasses: cssClasses || undefined,
          isFixed,
          fullPath: fullPath || undefined,
          accessibility: accessibility || undefined,
          computedStyles: computedStyles || undefined,
          computedStylesObj: Object.keys(computedStylesObj).length > 0 ? computedStylesObj : undefined,
          nearbyElements: nearbyElements || undefined,
          angularComponents,
          targetElement: target,
        });
      };

      document.addEventListener('click', handleClick, true);
      this.cleanupFns.push(() => document.removeEventListener('click', handleClick, true));

      // --- ドラッグ選択: mouseup ---
      const handleMouseUp = (e: MouseEvent): void => {
        if (this.isDragActive && this.dragStart) {
          this.justFinishedDrag = true;

          // 最終的な要素検出
          const left = Math.min(this.dragStart.x, e.clientX);
          const top = Math.min(this.dragStart.y, e.clientY);
          const right = Math.max(this.dragStart.x, e.clientX);
          const bottom = Math.max(this.dragStart.y, e.clientY);

          // 最終要素を再検出（mouseup時はより厳密なセレクタ）
          const finalElements = this.findFinalElements(left, top, right, bottom);

          const x = (e.clientX / window.innerWidth) * 100;
          const y = e.clientY + window.scrollY;

          if (finalElements.length > 0) {
            const bounds = finalElements.reduce(
              (acc, { rect }) => ({
                left: Math.min(acc.left, rect.left),
                top: Math.min(acc.top, rect.top),
                right: Math.max(acc.right, rect.right),
                bottom: Math.max(acc.bottom, rect.bottom),
              }),
              { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity },
            );

            const elementNames = finalElements
              .slice(0, 5)
              .map(({ element }) => identifyElement(element).name)
              .join(', ');
            const suffix = finalElements.length > 5
              ? ` +${finalElements.length - 5} more`
              : '';

            // 最初の要素からスタイル情報を収集
            const firstEl = finalElements[0].element;
            const computedStylesObj = getDetailedComputedStyles(firstEl);
            const computedStyles = getForensicComputedStyles(firstEl);

            this.dragComplete$.next({
              x,
              y,
              clientY: e.clientY,
              element: `${finalElements.length} elements: ${elementNames}${suffix}`,
              elementPath: 'multi-select',
              isMultiSelect: true,
              boundingBox: {
                x: bounds.left,
                y: bounds.top + window.scrollY,
                width: bounds.right - bounds.left,
                height: bounds.bottom - bounds.top,
              },
              fullPath: getFullElementPath(firstEl),
              accessibility: getAccessibilityInfo(firstEl),
              computedStyles: computedStyles || undefined,
              computedStylesObj: Object.keys(computedStylesObj).length > 0 ? computedStylesObj : undefined,
              nearbyElements: getNearbyElements(firstEl),
              cssClasses: getElementClasses(firstEl),
              nearbyText: getNearbyText(firstEl),
              targetElement: firstEl,
            });
          } else {
            // 要素がない場合でもドラッグ範囲が意味のあるサイズなら発行
            const width = Math.abs(right - left);
            const height = Math.abs(bottom - top);
            if (width > 20 && height > 20) {
              this.dragComplete$.next({
                x,
                y,
                clientY: e.clientY,
                element: 'Area selection',
                elementPath: `region at (${Math.round(left)}, ${Math.round(top)})`,
                isMultiSelect: true,
                boundingBox: {
                  x: left,
                  y: top + window.scrollY,
                  width,
                  height,
                },
              });
            }
          }
        }

        // 状態リセット
        this.mouseDownPos = null;
        this.dragStart = null;
        if (this.isDragActive) {
          this.isDragActive = false;
          this.dragStateChange$.next(false);
          this.dragRect$.next(null);
          this.dragHighlights$.next([]);
        }
      };

      document.addEventListener('mouseup', handleMouseUp);
      this.cleanupFns.push(() => document.removeEventListener('mouseup', handleMouseUp));

      // キーボードリスナー
      const handleKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') {
          this.escapePress$.next();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      this.cleanupFns.push(() => document.removeEventListener('keydown', handleKeyDown));

      // スクロールリスナー
      let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
      const handleScroll = (): void => {
        this.scrollChange$.next(window.scrollY);

        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        scrollTimeout = originalSetTimeout(() => {
          // スクロール終了を通知（-1で終了シグナル）
          this.scrollChange$.next(-1);
        }, 100);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      this.cleanupFns.push(() => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      });
    });
  }

  /** DOMイベントリスナーを解除（ツールバー非活性化時に呼び出し） */
  detach(): void {
    this.cleanupFns.forEach(fn => fn());
    this.cleanupFns = [];
    this.isAttached = false;

    // ドラッグ状態リセット
    this.mouseDownPos = null;
    this.dragStart = null;
    this.isDragActive = false;
    this.justFinishedDrag = false;
  }

  /** 全リソース解放（コンポーネントDestroy時） */
  destroy(): void {
    this.detach();
    this.mouseMove$.complete();
    this.elementClick$.complete();
    this.escapePress$.complete();
    this.scrollChange$.complete();
    this.dragStateChange$.complete();
    this.dragRect$.complete();
    this.dragHighlights$.complete();
    this.dragComplete$.complete();
  }

  /** フィードバックツールバーの要素かどうか判定 */
  private isToolbarElement(element: HTMLElement): boolean {
    return !!element.closest('[data-feedback-toolbar]') ||
           !!element.closest('[data-annotation-popup]') ||
           !!element.closest('.agentation-settings') ||
           !!element.closest('.agentation-marker');
  }

  /** ドラッグ矩形内の要素ハイライト用DOMRectを検出 */
  private findElementsInRect(left: number, top: number, right: number, bottom: number): DOMRect[] {
    const midX = (left + right) / 2;
    const midY = (top + bottom) / 2;

    // 9つのサンプルポイントで要素を検出
    const candidateElements = new Set<HTMLElement>();
    const points = [
      [left, top], [right, top],
      [left, bottom], [right, bottom],
      [midX, midY],
      [midX, top], [midX, bottom],
      [left, midY], [right, midY],
    ];

    for (const [x, y] of points) {
      const elements = document.elementsFromPoint(x, y);
      for (const el of elements) {
        if (el instanceof HTMLElement) candidateElements.add(el);
      }
    }

    // 近傍要素も検索
    const nearbyElements = Array.from(document.querySelectorAll(this.NEARBY_SELECTOR));
    for (const el of nearbyElements) {
      if (!(el instanceof HTMLElement)) continue;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const centerInside = centerX >= left && centerX <= right && centerY >= top && centerY <= bottom;

      const overlapX = Math.min(rect.right, right) - Math.max(rect.left, left);
      const overlapY = Math.min(rect.bottom, bottom) - Math.max(rect.top, top);
      const overlapArea = overlapX > 0 && overlapY > 0 ? overlapX * overlapY : 0;
      const elementArea = rect.width * rect.height;
      const overlapRatio = elementArea > 0 ? overlapArea / elementArea : 0;

      if (centerInside || overlapRatio > 0.5) {
        candidateElements.add(el);
      }
    }

    // フィルタリングして有意な要素のみ返す
    const allMatching: DOMRect[] = [];
    for (const el of candidateElements) {
      if (this.isToolbarElement(el)) continue;

      const rect = el.getBoundingClientRect();
      // 大きすぎる・小さすぎる要素を除外
      if (rect.width > window.innerWidth * 0.8 && rect.height > window.innerHeight * 0.5) continue;
      if (rect.width < 10 || rect.height < 10) continue;

      // ドラッグ矩形と交差判定
      if (rect.left < right && rect.right > left && rect.top < bottom && rect.bottom > top) {
        const tagName = el.tagName;
        let shouldInclude = this.MEANINGFUL_TAGS.has(tagName);

        // div/spanは有意な内容がある場合のみ
        if (!shouldInclude && (tagName === 'DIV' || tagName === 'SPAN')) {
          const hasText = el.textContent && el.textContent.trim().length > 0;
          const isInteractive = el.onclick !== null
            || el.getAttribute('role') === 'button'
            || el.getAttribute('role') === 'link'
            || el.classList.contains('clickable')
            || el.hasAttribute('data-clickable');

          if ((hasText || isInteractive) && !el.querySelector('p, h1, h2, h3, h4, h5, h6, button, a')) {
            shouldInclude = true;
          }
        }

        if (shouldInclude) {
          // 親要素の除外（既存のマッチが完全に包含する場合）
          let dominated = false;
          for (const existingRect of allMatching) {
            if (existingRect.left <= rect.left && existingRect.right >= rect.right
              && existingRect.top <= rect.top && existingRect.bottom >= rect.bottom) {
              dominated = true;
              break;
            }
          }
          if (!dominated) allMatching.push(rect);
        }
      }
    }

    return allMatching;
  }

  /** mouseup時の最終要素検出（より厳密なセレクタ） */
  private findFinalElements(left: number, top: number, right: number, bottom: number): Array<{ element: HTMLElement; rect: DOMRect }> {
    const allMatching: Array<{ element: HTMLElement; rect: DOMRect }> = [];

    document.querySelectorAll(this.FINAL_SELECTOR).forEach(el => {
      if (!(el instanceof HTMLElement)) return;
      if (this.isToolbarElement(el)) return;

      const rect = el.getBoundingClientRect();
      if (rect.width > window.innerWidth * 0.8 && rect.height > window.innerHeight * 0.5) return;
      if (rect.width < 10 || rect.height < 10) return;

      if (rect.left < right && rect.right > left && rect.top < bottom && rect.bottom > top) {
        allMatching.push({ element: el, rect });
      }
    });

    // 子要素が選択されている場合は親を除外
    return allMatching.filter(({ element: el }) =>
      !allMatching.some(({ element: other }) => other !== el && el.contains(other)),
    );
  }
}
