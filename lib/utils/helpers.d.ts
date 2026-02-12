/**
 * Shadow DOMを貫通して最深の要素を取得
 * document.elementFromPoint()はshadowホストで止まるため、
 * 再帰的にオープンshadow rootの内部をチェックして実際のターゲットを見つける
 */
export declare function deepElementFromPoint(x: number, y: number): HTMLElement | null;
/**
 * 要素がfixed/sticky配置かどうか判定
 */
export declare function isElementFixed(element: HTMLElement): boolean;
/**
 * HEX色コードをRGBA文字列に変換
 */
export declare function hexToRgba(hex: string, alpha: number): string;
/**
 * 日付文字列を相対時間表記に変換
 */
export declare function formatRelativeTime(dateString: string): string;
/**
 * URLを短縮表示用に切り詰め
 */
export declare function truncateUrl(url: string): string;
/**
 * 有効なHTTP(S) URLかどうかを検証
 */
export declare function isValidUrl(url: string): boolean;
