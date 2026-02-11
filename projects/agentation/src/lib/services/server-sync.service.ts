// =============================================================================
// サーバー同期サービス
// =============================================================================
//
// SSEベースのサーバー同期サービス。
// セッション管理、リアルタイムイベント受信、指数バックオフ再接続を提供する。
//

import { Injectable, signal, DestroyRef, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { createSession, getSession } from '../utils/sync';
import { saveSessionId, loadSessionId } from '../utils/storage';
import { originalSetTimeout } from '../utils/freeze-animations';
import type { Annotation } from '../types';

// サーバーイベントの型
export interface ServerAnnotationEvent {
  type: 'annotation.updated' | 'annotation.created' | 'annotation.deleted';
  payload: Partial<Annotation> & { id: string; status?: string };
}

@Injectable()
export class ServerSyncService {
  private readonly destroyRef = inject(DestroyRef);

  // SSE接続
  private eventSource: EventSource | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  private readonly BASE_BACKOFF_MS = 1000;

  // 接続パラメータ
  private endpoint: string | null = null;
  private sessionId: string | null = null;

  // 接続状態
  readonly connectionStatus = signal<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');

  // サーバーからのイベントストリーム
  readonly serverEvent$ = new Subject<ServerAnnotationEvent>();

  // ヘルスチェック間隔
  private healthCheckInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    // DestroyRefでクリーンアップ
    this.destroyRef.onDestroy(() => {
      this.destroy();
    });
  }

  /** SSE接続を開始 */
  async connect(endpoint: string, options?: {
    sessionId?: string;
    pathname?: string;
  }): Promise<string | null> {
    this.endpoint = endpoint;
    this.connectionStatus.set('connecting');

    const pathname = options?.pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

    try {
      // セッションID取得（優先順位: 引数 → localStorage → 新規作成）
      let sid = options?.sessionId || loadSessionId(pathname);

      if (sid) {
        // 既存セッションの取得を試行
        try {
          const session = await getSession(endpoint, sid);
          this.sessionId = session.id;
        } catch {
          // セッションが見つからない場合は新規作成
          sid = null;
        }
      }

      if (!sid) {
        // 新規セッション作成
        const session = await createSession(endpoint, pageUrl);
        this.sessionId = session.id;
        saveSessionId(pathname, session.id);
      }

      // SSE接続開始
      this.startSSE();

      // ヘルスチェック開始
      this.startHealthCheck();

      this.connectionStatus.set('connected');
      this.reconnectAttempts = 0;

      return this.sessionId;
    } catch {
      this.connectionStatus.set('error');
      this.scheduleReconnect();
      return null;
    }
  }

  /** SSE接続を切断 */
  disconnect(): void {
    this.stopSSE();
    this.stopHealthCheck();
    this.clearReconnectTimer();
    this.connectionStatus.set('disconnected');
    this.reconnectAttempts = 0;
  }

  /** 全リソース解放 */
  destroy(): void {
    this.disconnect();
    this.serverEvent$.complete();
    this.endpoint = null;
    this.sessionId = null;
  }

  /** 現在のセッションIDを取得 */
  getSessionId(): string | null {
    return this.sessionId;
  }

  // ===== プライベートメソッド =====

  /** SSEイベントソースを開始 */
  private startSSE(): void {
    if (!this.endpoint || !this.sessionId) return;
    this.stopSSE();

    this.eventSource = new EventSource(
      `${this.endpoint}/sessions/${this.sessionId}/events`
    );

    // アノテーション更新イベント
    const handleUpdate = (e: MessageEvent): void => {
      try {
        const event = JSON.parse(e.data) as { payload: ServerAnnotationEvent['payload'] };
        this.serverEvent$.next({
          type: 'annotation.updated',
          payload: event.payload,
        });
      } catch {
        // パースエラーは無視
      }
    };

    this.eventSource.addEventListener('annotation.updated', handleUpdate);

    // エラーハンドリング
    this.eventSource.onerror = (): void => {
      this.handleSSEError();
    };

    this.eventSource.onopen = (): void => {
      this.connectionStatus.set('connected');
      this.reconnectAttempts = 0;
    };
  }

  /** SSEイベントソースを停止 */
  private stopSSE(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  /** SSEエラー時の処理 */
  private handleSSEError(): void {
    this.stopSSE();
    if (this.connectionStatus() !== 'disconnected') {
      this.connectionStatus.set('error');
      this.scheduleReconnect();
    }
  }

  /** 指数バックオフで再接続をスケジュール */
  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
      this.connectionStatus.set('error');
      return;
    }

    this.clearReconnectTimer();
    const delay = this.BASE_BACKOFF_MS * Math.pow(2, this.reconnectAttempts);

    this.reconnectTimer = originalSetTimeout(() => {
      this.reconnectAttempts++;
      this.connectionStatus.set('connecting');
      this.startSSE();
    }, delay);
  }

  /** 再接続タイマーをクリア */
  private clearReconnectTimer(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  /** ヘルスチェックを開始（10秒間隔） */
  private startHealthCheck(): void {
    this.stopHealthCheck();

    const check = async (): Promise<void> => {
      if (!this.endpoint) return;
      try {
        const response = await fetch(`${this.endpoint}/health`);
        if (response.ok) {
          if (this.connectionStatus() === 'error') {
            this.connectionStatus.set('connected');
            this.reconnectAttempts = 0;
          }
        }
      } catch {
        if (this.connectionStatus() === 'connected') {
          this.connectionStatus.set('error');
        }
      }
    };

    check();
    this.healthCheckInterval = setInterval(check, 10000);
  }

  /** ヘルスチェックを停止 */
  private stopHealthCheck(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
  }
}
