// =============================================================================
// DOM・UIユーティリティ関数
// =============================================================================

/**
 * Shadow DOMを貫通して最深の要素を取得
 * document.elementFromPoint()はshadowホストで止まるため、
 * 再帰的にオープンshadow rootの内部をチェックして実際のターゲットを見つける
 */
export function deepElementFromPoint(x: number, y: number): HTMLElement | null {
  let element = document.elementFromPoint(x, y) as HTMLElement | null;
  if (!element) return null;

  // Shadow rootを通して掘り下げ続ける
  while (element?.shadowRoot) {
    const deeper = element.shadowRoot.elementFromPoint(x, y) as HTMLElement | null;
    if (!deeper || deeper === element) break;
    element = deeper;
  }

  return element;
}

/**
 * 要素がfixed/sticky配置かどうか判定
 */
export function isElementFixed(element: HTMLElement): boolean {
  let current: HTMLElement | null = element;
  while (current && current !== document.body) {
    const style = window.getComputedStyle(current);
    const position = style.position;
    if (position === "fixed" || position === "sticky") {
      return true;
    }
    current = current.parentElement;
  }
  return false;
}

/**
 * HEX色コードをRGBA文字列に変換
 */
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * 日付文字列を相対時間表記に変換
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString();
}

/**
 * URLを短縮表示用に切り詰め
 */
export function truncateUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname;
    // パスを表示、長すぎる場合は切り詰め
    if (path.length > 25) {
      return "..." + path.slice(-22);
    }
    return path || "/";
  } catch {
    // URLパースに失敗した場合は文字列を単純に切り詰め
    if (url.length > 25) {
      return "..." + url.slice(-22);
    }
    return url;
  }
}

/**
 * 有効なHTTP(S) URLかどうかを検証
 */
export function isValidUrl(url: string): boolean {
  if (!url || !url.trim()) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
