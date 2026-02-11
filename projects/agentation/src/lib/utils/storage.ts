// =============================================================================
// ストレージユーティリティ
// =============================================================================
//
// TODO: カスタムストレージ用のStorageAdapterインターフェースに抽象化
// (IndexedDB, APIバックエンド等)
//

import type { Annotation } from "../types";

const STORAGE_PREFIX = "feedback-annotations-";
const DEFAULT_RETENTION_DAYS = 7;

export function getStorageKey(pathname: string): string {
  return `${STORAGE_PREFIX}${pathname}`;
}

export function loadAnnotations<T = Annotation>(pathname: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(getStorageKey(pathname));
    if (!stored) return [];
    const data = JSON.parse(stored);
    const cutoff = Date.now() - DEFAULT_RETENTION_DAYS * 24 * 60 * 60 * 1000;
    return data.filter((a: { timestamp?: number }) => !a.timestamp || a.timestamp > cutoff);
  } catch {
    return [];
  }
}

export function saveAnnotations<T = Annotation>(pathname: string, annotations: T[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getStorageKey(pathname), JSON.stringify(annotations));
  } catch {
    // localStorageが満杯か無効
  }
}

export function clearAnnotations(pathname: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(getStorageKey(pathname));
  } catch {
    // 無視
  }
}

/**
 * 全ページのlocalStorageからアノテーションを読み込み
 * pathname -> アノテーション配列のMapを返す
 */
export function loadAllAnnotations<T = Annotation>(): Map<string, T[]> {
  const result = new Map<string, T[]>();
  if (typeof window === "undefined") return result;

  try {
    const cutoff = Date.now() - DEFAULT_RETENTION_DAYS * 24 * 60 * 60 * 1000;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_PREFIX)) {
        const pathname = key.slice(STORAGE_PREFIX.length);
        const stored = localStorage.getItem(key);
        if (stored) {
          const data = JSON.parse(stored);
          const filtered = data.filter(
            (a: { timestamp?: number }) => !a.timestamp || a.timestamp > cutoff
          );
          if (filtered.length > 0) {
            result.set(pathname, filtered);
          }
        }
      }
    }
  } catch {
    // エラーを無視
  }

  return result;
}

// =============================================================================
// 同期マーカーユーティリティ
// =============================================================================
//
// アノテーションの`_syncedTo`フィールドを管理するヘルパー。
// 特定のセッション/宛先にアノテーションが同期済みかどうかを追跡する。
// アンダースコアプレフィックスは内部フィールドであることを示す。
//

type AnnotationWithSyncMarker = Annotation & { _syncedTo?: string };

/**
 * 同期マーカー付きでアノテーションを保存
 * 保存前に各アノテーションに`_syncedTo: sessionId`を追加
 */
export function saveAnnotationsWithSyncMarker(
  pathname: string,
  annotations: Annotation[],
  sessionId: string
): void {
  const marked = annotations.map((annotation) => ({
    ...annotation,
    _syncedTo: sessionId,
  }));
  saveAnnotations(pathname, marked);
}

/**
 * 指定セッションに未同期のアノテーションを取得
 * `_syncedTo`マーカーがないか、異なるセッションIDのアノテーションを返す
 * sessionIdが未指定の場合、同期マーカーがないアノテーションを返す
 */
export function getUnsyncedAnnotations(
  pathname: string,
  sessionId?: string
): Annotation[] {
  const annotations = loadAnnotations<AnnotationWithSyncMarker>(pathname);
  return annotations.filter((annotation) => {
    if (!annotation._syncedTo) return true;
    if (sessionId && annotation._syncedTo !== sessionId) return true;
    return false;
  });
}

/**
 * パス名に対する全アノテーションの`_syncedTo`マーカーを除去
 * 同期状態のリセットや同期先の変更時に有用
 */
export function clearSyncMarkers(pathname: string): void {
  const annotations = loadAnnotations<AnnotationWithSyncMarker>(pathname);
  const cleaned = annotations.map((annotation) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _syncedTo, ...rest } = annotation;
    return rest as Annotation;
  });
  saveAnnotations(pathname, cleaned);
}

// =============================================================================
// セッションストレージ
// =============================================================================

const SESSION_PREFIX = "agentation-session-";

export function getSessionStorageKey(pathname: string): string {
  return `${SESSION_PREFIX}${pathname}`;
}

export function loadSessionId(pathname: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(getSessionStorageKey(pathname));
  } catch {
    return null;
  }
}

export function saveSessionId(pathname: string, sessionId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getSessionStorageKey(pathname), sessionId);
  } catch {
    // localStorageが満杯か無効
  }
}

export function clearSessionId(pathname: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(getSessionStorageKey(pathname));
  } catch {
    // 無視
  }
}
