import type { Annotation, Session, SessionWithAnnotations } from "../types";
/**
 * サーバーから全セッションを取得
 */
export declare function listSessions(endpoint: string): Promise<Session[]>;
/**
 * サーバーに新しいセッションを作成
 */
export declare function createSession(endpoint: string, url: string): Promise<Session>;
/**
 * 既存のセッションをアノテーション付きで取得
 */
export declare function getSession(endpoint: string, sessionId: string): Promise<SessionWithAnnotations>;
/**
 * 新しいアノテーションをサーバーに同期
 * サーバーが割り当てたフィールドを含むアノテーションを返す
 */
export declare function syncAnnotation(endpoint: string, sessionId: string, annotation: Annotation): Promise<Annotation>;
/**
 * サーバー上のアノテーションを更新
 */
export declare function updateAnnotation(endpoint: string, annotationId: string, data: Partial<Annotation>): Promise<Annotation>;
/**
 * サーバーからアノテーションを削除
 */
export declare function deleteAnnotation(endpoint: string, annotationId: string): Promise<void>;
export type ActionResponse = {
    success: boolean;
    annotationCount: number;
    delivered: {
        sseListeners: number;
        webhooks: number;
        total: number;
    };
};
/**
 * エージェントにアノテーションへのアクション実行を要求
 * SSE経由でaction.requestedイベントを発行し、接続済みエージェントに通知
 * UIが正確なフィードバックを表示できるよう配信情報を返す
 */
export declare function requestAction(endpoint: string, sessionId: string, output: string): Promise<ActionResponse>;
