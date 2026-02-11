// =============================================================================
// サーバー同期ユーティリティ
// =============================================================================
//
// Agentationプロトコルのオプションサーバー同期機能
// エンドポイントが提供された場合、アノテーションをサーバーに同期
// ネットワークエラー時はローカルのみモードにグレースフルにフォールバック
//

import type { Annotation, Session, SessionWithAnnotations } from "../types";

/**
 * サーバーから全セッションを取得
 */
export async function listSessions(endpoint: string): Promise<Session[]> {
  const response = await fetch(`${endpoint}/sessions`);
  if (!response.ok) {
    throw new Error(`Failed to list sessions: ${response.status}`);
  }
  return response.json();
}

/**
 * サーバーに新しいセッションを作成
 */
export async function createSession(
  endpoint: string,
  url: string
): Promise<Session> {
  const response = await fetch(`${endpoint}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create session: ${response.status}`);
  }

  return response.json();
}

/**
 * 既存のセッションをアノテーション付きで取得
 */
export async function getSession(
  endpoint: string,
  sessionId: string
): Promise<SessionWithAnnotations> {
  const response = await fetch(`${endpoint}/sessions/${sessionId}`);

  if (!response.ok) {
    throw new Error(`Failed to get session: ${response.status}`);
  }

  return response.json();
}

/**
 * 新しいアノテーションをサーバーに同期
 * サーバーが割り当てたフィールドを含むアノテーションを返す
 */
export async function syncAnnotation(
  endpoint: string,
  sessionId: string,
  annotation: Annotation
): Promise<Annotation> {
  const response = await fetch(`${endpoint}/sessions/${sessionId}/annotations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(annotation),
  });

  if (!response.ok) {
    throw new Error(`Failed to sync annotation: ${response.status}`);
  }

  return response.json();
}

/**
 * サーバー上のアノテーションを更新
 */
export async function updateAnnotation(
  endpoint: string,
  annotationId: string,
  data: Partial<Annotation>
): Promise<Annotation> {
  const response = await fetch(`${endpoint}/annotations/${annotationId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update annotation: ${response.status}`);
  }

  return response.json();
}

/**
 * サーバーからアノテーションを削除
 */
export async function deleteAnnotation(
  endpoint: string,
  annotationId: string
): Promise<void> {
  const response = await fetch(`${endpoint}/annotations/${annotationId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete annotation: ${response.status}`);
  }
}

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
export async function requestAction(
  endpoint: string,
  sessionId: string,
  output: string
): Promise<ActionResponse> {
  const response = await fetch(`${endpoint}/sessions/${sessionId}/action`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ output }),
  });

  if (!response.ok) {
    throw new Error(`Failed to request action: ${response.status}`);
  }

  return response.json();
}
