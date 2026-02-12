import type { Annotation } from "../types";
export declare function getStorageKey(pathname: string): string;
export declare function loadAnnotations<T = Annotation>(pathname: string): T[];
export declare function saveAnnotations<T = Annotation>(pathname: string, annotations: T[]): void;
export declare function clearAnnotations(pathname: string): void;
/**
 * 全ページのlocalStorageからアノテーションを読み込み
 * pathname -> アノテーション配列のMapを返す
 */
export declare function loadAllAnnotations<T = Annotation>(): Map<string, T[]>;
/**
 * 同期マーカー付きでアノテーションを保存
 * 保存前に各アノテーションに`_syncedTo: sessionId`を追加
 */
export declare function saveAnnotationsWithSyncMarker(pathname: string, annotations: Annotation[], sessionId: string): void;
/**
 * 指定セッションに未同期のアノテーションを取得
 * `_syncedTo`マーカーがないか、異なるセッションIDのアノテーションを返す
 * sessionIdが未指定の場合、同期マーカーがないアノテーションを返す
 */
export declare function getUnsyncedAnnotations(pathname: string, sessionId?: string): Annotation[];
/**
 * パス名に対する全アノテーションの`_syncedTo`マーカーを除去
 * 同期状態のリセットや同期先の変更時に有用
 */
export declare function clearSyncMarkers(pathname: string): void;
export declare function getSessionStorageKey(pathname: string): string;
export declare function loadSessionId(pathname: string): string | null;
export declare function saveSessionId(pathname: string, sessionId: string): void;
export declare function clearSessionId(pathname: string): void;
