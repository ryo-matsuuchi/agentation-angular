import { Subject } from 'rxjs';
import type { Annotation } from '../types';
import * as i0 from "@angular/core";
export interface ServerAnnotationEvent {
    type: 'annotation.updated' | 'annotation.created' | 'annotation.deleted';
    payload: Partial<Annotation> & {
        id: string;
        status?: string;
    };
}
export declare class ServerSyncService {
    private readonly destroyRef;
    private eventSource;
    private reconnectTimer;
    private reconnectAttempts;
    private readonly MAX_RECONNECT_ATTEMPTS;
    private readonly BASE_BACKOFF_MS;
    private endpoint;
    private sessionId;
    readonly connectionStatus: import("@angular/core").WritableSignal<"error" | "disconnected" | "connecting" | "connected">;
    readonly serverEvent$: Subject<ServerAnnotationEvent>;
    private healthCheckInterval;
    constructor();
    /** SSE接続を開始 */
    connect(endpoint: string, options?: {
        sessionId?: string;
        pathname?: string;
    }): Promise<string | null>;
    /** SSE接続を切断 */
    disconnect(): void;
    /** 全リソース解放 */
    destroy(): void;
    /** 現在のセッションIDを取得 */
    getSessionId(): string | null;
    /** SSEイベントソースを開始 */
    private startSSE;
    /** SSEイベントソースを停止 */
    private stopSSE;
    /** SSEエラー時の処理 */
    private handleSSEError;
    /** 指数バックオフで再接続をスケジュール */
    private scheduleReconnect;
    /** 再接続タイマーをクリア */
    private clearReconnectTimer;
    /** ヘルスチェックを開始（10秒間隔） */
    private startHealthCheck;
    /** ヘルスチェックを停止 */
    private stopHealthCheck;
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerSyncService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ServerSyncService>;
}
