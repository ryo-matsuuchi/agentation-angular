// =============================================================================
// 要素識別ユーティリティ
// =============================================================================

// =============================================================================
// Shadow DOMヘルパー
// =============================================================================

/**
 * 親要素を取得（Shadow DOM境界を越える）
 * Shadow Root内でparentElementがない場合、shadowホストを返す
 */
function getParentElement(element: Element): Element | null {
  if (element.parentElement) {
    return element.parentElement;
  }
  const root = element.getRootNode();
  if (root instanceof ShadowRoot) {
    return root.host;
  }
  return null;
}

/**
 * Shadow DOM境界を越えて最も近い祖先要素を検索
 */
export function closestCrossingShadow(element: Element, selector: string): Element | null {
  let current: Element | null = element;
  while (current) {
    if (current.matches(selector)) return current;
    current = getParentElement(current);
  }
  return null;
}

/**
 * 要素がShadow DOM内にあるか判定
 */
export function isInShadowDOM(element: Element): boolean {
  return element.getRootNode() instanceof ShadowRoot;
}

/**
 * 要素のshadowホストを取得（Shadow DOM内でない場合はnull）
 */
export function getShadowHost(element: Element): Element | null {
  const root = element.getRootNode();
  if (root instanceof ShadowRoot) {
    return root.host;
  }
  return null;
}

// =============================================================================
// 要素パスユーティリティ
// =============================================================================

/**
 * 要素の読みやすいパスを取得（例: "article > section > p"）
 * Shadow DOM内の要素もShadow境界を越えてサポート
 */
export function getElementPath(target: HTMLElement, maxDepth = 4): string {
  const parts: string[] = [];
  let current: HTMLElement | null = target;
  let depth = 0;

  while (current && depth < maxDepth) {
    const tag = current.tagName.toLowerCase();

    // 汎用ラッパーはスキップ
    if (tag === "html" || tag === "body") break;

    // 識別子を取得
    let identifier = tag;
    if (current.id) {
      identifier = `#${current.id}`;
    } else if (current.className && typeof current.className === "string") {
      const meaningfulClass = current.className
        .split(/\s+/)
        .find(c => c.length > 2 && !c.match(/^[a-z]{1,2}$/) && !c.match(/[A-Z0-9]{5,}/));
      if (meaningfulClass) {
        identifier = `.${meaningfulClass.split("_")[0]}`;
      }
    }

    // Shadow境界の越境をマーク
    const nextParent = getParentElement(current);
    if (!current.parentElement && nextParent) {
      identifier = `⟨shadow⟩ ${identifier}`;
    }

    parts.unshift(identifier);
    current = nextParent as HTMLElement | null;
    depth++;
  }

  return parts.join(" > ");
}

/**
 * 要素を識別して人間が読みやすい名前とパスを返す
 */
export function identifyElement(target: HTMLElement): { name: string; path: string } {
  const path = getElementPath(target);

  if (target.dataset['element']) {
    return { name: target.dataset['element'], path };
  }

  const tag = target.tagName.toLowerCase();

  // SVG要素
  if (["path", "circle", "rect", "line", "g"].includes(tag)) {
    // 親SVGのコンテキストを取得（Shadow境界を越える）
    const svg = closestCrossingShadow(target, "svg");
    if (svg) {
      const parent = getParentElement(svg);
      if (parent instanceof HTMLElement) {
        const parentName = identifyElement(parent).name;
        return { name: `graphic in ${parentName}`, path };
      }
    }
    return { name: "graphic element", path };
  }
  if (tag === "svg") {
    const parent = getParentElement(target);
    if (parent?.tagName.toLowerCase() === "button") {
      const btnText = parent.textContent?.trim();
      return { name: btnText ? `icon in "${btnText}" button` : "button icon", path };
    }
    return { name: "icon", path };
  }

  // インタラクティブ要素
  if (tag === "button") {
    const text = target.textContent?.trim();
    const ariaLabel = target.getAttribute("aria-label");
    if (ariaLabel) return { name: `button [${ariaLabel}]`, path };
    return { name: text ? `button "${text.slice(0, 25)}"` : "button", path };
  }
  if (tag === "a") {
    const text = target.textContent?.trim();
    const href = target.getAttribute("href");
    if (text) return { name: `link "${text.slice(0, 25)}"`, path };
    if (href) return { name: `link to ${href.slice(0, 30)}`, path };
    return { name: "link", path };
  }
  if (tag === "input") {
    const type = target.getAttribute("type") || "text";
    const placeholder = target.getAttribute("placeholder");
    const name = target.getAttribute("name");
    if (placeholder) return { name: `input "${placeholder}"`, path };
    if (name) return { name: `input [${name}]`, path };
    return { name: `${type} input`, path };
  }

  // 見出し
  if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)) {
    const text = target.textContent?.trim();
    return { name: text ? `${tag} "${text.slice(0, 35)}"` : tag, path };
  }

  // テキスト要素
  if (tag === "p") {
    const text = target.textContent?.trim();
    if (text) return { name: `paragraph: "${text.slice(0, 40)}${text.length > 40 ? '...' : ''}"`, path };
    return { name: "paragraph", path };
  }
  if (tag === "span" || tag === "label") {
    const text = target.textContent?.trim();
    if (text && text.length < 40) return { name: `"${text}"`, path };
    return { name: tag, path };
  }
  if (tag === "li") {
    const text = target.textContent?.trim();
    if (text && text.length < 40) return { name: `list item: "${text.slice(0, 35)}"`, path };
    return { name: "list item", path };
  }
  if (tag === "blockquote") return { name: "blockquote", path };
  if (tag === "code") {
    const text = target.textContent?.trim();
    if (text && text.length < 30) return { name: `code: \`${text}\``, path };
    return { name: "code", path };
  }
  if (tag === "pre") return { name: "code block", path };

  // メディア
  if (tag === "img") {
    const alt = target.getAttribute("alt");
    return { name: alt ? `image "${alt.slice(0, 30)}"` : "image", path };
  }
  if (tag === "video") return { name: "video", path };

  // コンテナ - 意味のある名前を推測
  if (["div", "section", "article", "nav", "header", "footer", "aside", "main"].includes(tag)) {
    const className = target.className;
    const role = target.getAttribute("role");
    const ariaLabel = target.getAttribute("aria-label");

    if (ariaLabel) return { name: `${tag} [${ariaLabel}]`, path };
    if (role) return { name: `${role}`, path };

    if (typeof className === "string" && className) {
      const words = className
        .split(/[\s_-]+/)
        .map((c) => c.replace(/[A-Z0-9]{5,}.*$/, "")) // CSSモジュールのハッシュを除去
        .filter((c) => c.length > 2 && !/^[a-z]{1,2}$/.test(c))
        .slice(0, 2);
      if (words.length > 0) return { name: words.join(" "), path };
    }

    return { name: tag === "div" ? "container" : tag, path };
  }

  return { name: tag, path };
}

/**
 * 要素とその兄弟からテキストコンテンツを取得（コンテキスト用）
 */
export function getNearbyText(element: HTMLElement): string {
  const texts: string[] = [];

  // 自身のテキスト
  const ownText = element.textContent?.trim();
  if (ownText && ownText.length < 100) {
    texts.push(ownText);
  }

  // 前の兄弟のテキスト
  const prev = element.previousElementSibling;
  if (prev) {
    const prevText = prev.textContent?.trim();
    if (prevText && prevText.length < 50) {
      texts.unshift(`[before: "${prevText.slice(0, 40)}"]`);
    }
  }

  // 次の兄弟のテキスト
  const next = element.nextElementSibling;
  if (next) {
    const nextText = next.textContent?.trim();
    if (nextText && nextText.length < 50) {
      texts.push(`[after: "${nextText.slice(0, 40)}"]`);
    }
  }

  return texts.join(" ");
}

/**
 * アニメーションフィードバック用の簡略化された要素識別子
 */
export function identifyAnimationElement(target: HTMLElement): string {
  // data属性による明示的なラベリングを許可
  if (target.dataset['element']) return target.dataset['element'];

  const tag = target.tagName.toLowerCase();

  // SVG要素
  if (tag === "path") return "path";
  if (tag === "circle") return "circle";
  if (tag === "rect") return "rectangle";
  if (tag === "line") return "line";
  if (tag === "ellipse") return "ellipse";
  if (tag === "polygon") return "polygon";
  if (tag === "g") return "group";
  if (tag === "svg") return "svg";

  // インタラクティブ要素
  if (tag === "button") {
    const text = target.textContent?.trim();
    return text ? `button "${text}"` : "button";
  }
  if (tag === "input") {
    const type = target.getAttribute("type") || "text";
    return `input (${type})`;
  }

  // テキスト要素
  if (tag === "span" || tag === "p" || tag === "label") {
    const text = target.textContent?.trim();
    if (text && text.length < 30) return `"${text}"`;
    return "text";
  }

  // コンテナ - クラス名から用途を推測
  if (tag === "div") {
    const className = target.className;
    if (typeof className === "string" && className) {
      const words = className
        .split(/[\s_-]+/)
        .map(c => c.replace(/[A-Z0-9]{5,}.*$/, ""))
        .filter(c => c.length > 2 && !/^[a-z]{1,2}$/.test(c))
        .slice(0, 2);
      if (words.length > 0) {
        return words.join(" ");
      }
    }
    return "container";
  }

  return tag;
}

/**
 * 構造的コンテキスト用に近くの兄弟要素を取得
 * Shadow DOM内の要素もサポート
 */
export function getNearbyElements(element: HTMLElement): string {
  const parent = getParentElement(element);
  if (!parent) return "";

  // 正しいソースから兄弟を取得
  const elementRoot = element.getRootNode();
  const children = (elementRoot instanceof ShadowRoot && element.parentElement)
    ? Array.from(element.parentElement.children)
    : Array.from(parent.children);

  const siblings = children.filter(
    (child) => child !== element && child instanceof HTMLElement
  ) as HTMLElement[];

  if (siblings.length === 0) return "";

  // 最大4つの近くの兄弟の簡潔な識別子を取得
  const siblingIds = siblings.slice(0, 4).map((sib) => {
    const tag = sib.tagName.toLowerCase();
    const className = sib.className;

    // 最初の意味のあるクラスを取得
    let cls = "";
    if (typeof className === "string" && className) {
      const meaningful = className
        .split(/\s+/)
        .map((c) => c.replace(/[_][a-zA-Z0-9]{5,}.*$/, "")) // モジュールハッシュを除去
        .find((c) => c.length > 2 && !/^[a-z]{1,2}$/.test(c));
      if (meaningful) cls = `.${meaningful}`;
    }

    // ボタン/リンクには短いテキストを含める
    if (tag === "button" || tag === "a") {
      const text = sib.textContent?.trim().slice(0, 15);
      if (text) return `${tag}${cls} "${text}"`;
    }

    return `${tag}${cls}`;
  });

  // 親のコンテキストを追加
  const parentTag = parent.tagName.toLowerCase();
  let parentId = parentTag;
  if (typeof parent.className === "string" && parent.className) {
    const parentCls = parent.className
      .split(/\s+/)
      .map((c) => c.replace(/[_][a-zA-Z0-9]{5,}.*$/, ""))
      .find((c) => c.length > 2 && !/^[a-z]{1,2}$/.test(c));
    if (parentCls) parentId = `.${parentCls}`;
  }

  const total = parent.children.length;
  const suffix = total > siblingIds.length + 1 ? ` (${total} total in ${parentId})` : "";

  return siblingIds.join(", ") + suffix;
}

/**
 * 要素のCSSクラス名を取得（モジュールハッシュを除去）
 */
export function getElementClasses(target: HTMLElement): string {
  const className = target.className;
  if (typeof className !== "string" || !className) return "";

  // クラス名を分割してクリーンアップ（モジュールハッシュ _abc123 を除去）
  const classes = className
    .split(/\s+/)
    .filter(c => c.length > 0)
    .map(c => {
      // ハッシュ前の意味のある部分を保持
      const match = c.match(/^([a-zA-Z][a-zA-Z0-9_-]*?)(?:_[a-zA-Z0-9]{5,})?$/);
      return match ? match[1] : c;
    })
    .filter((c, i, arr) => arr.indexOf(c) === i); // 重複排除

  return classes.join(", ");
}

/**
 * 要素の主要な計算済みスタイルを取得（スタイリングの問題に有用）
 */
export function getComputedStylesSnapshot(target: HTMLElement): string {
  if (typeof window === "undefined") return "";

  const styles = window.getComputedStyle(target);
  const parts: string[] = [];

  // 色とテキスト
  const color = styles.color;
  const bg = styles.backgroundColor;
  if (color && color !== "rgb(0, 0, 0)") parts.push(`color: ${color}`);
  if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") parts.push(`bg: ${bg}`);

  // タイポグラフィ
  const fontSize = styles.fontSize;
  const fontWeight = styles.fontWeight;
  if (fontSize) parts.push(`font: ${fontSize}`);
  if (fontWeight && fontWeight !== "400" && fontWeight !== "normal") parts.push(`weight: ${fontWeight}`);

  // スペーシング
  const padding = styles.padding;
  const margin = styles.margin;
  if (padding && padding !== "0px") parts.push(`padding: ${padding}`);
  if (margin && margin !== "0px") parts.push(`margin: ${margin}`);

  // レイアウト
  const display = styles.display;
  const position = styles.position;
  if (display && display !== "block" && display !== "inline") parts.push(`display: ${display}`);
  if (position && position !== "static") parts.push(`position: ${position}`);

  // ボーダー
  const borderRadius = styles.borderRadius;
  if (borderRadius && borderRadius !== "0px") parts.push(`radius: ${borderRadius}`);

  return parts.join(", ");
}

// 計算済みスタイル収集時にフィルタリングする値（ブラウザデフォルト / 無関係な値）
const DEFAULT_STYLE_VALUES = new Set([
  "none", "normal", "auto", "0px", "rgba(0, 0, 0, 0)", "transparent", "static", "visible"
]);

// スタイルプロパティ選択用の要素タイプカテゴリ
const TEXT_ELEMENTS = new Set([
  "p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "label", "li", "td", "th",
  "blockquote", "figcaption", "caption", "legend", "dt", "dd", "pre", "code",
  "em", "strong", "b", "i", "a", "time", "cite", "q"
]);
const FORM_INPUT_ELEMENTS = new Set(["input", "textarea", "select"]);
const MEDIA_ELEMENTS = new Set(["img", "video", "canvas", "svg"]);
const CONTAINER_ELEMENTS = new Set([
  "div", "section", "article", "nav", "header", "footer", "aside", "main",
  "ul", "ol", "form", "fieldset"
]);

/**
 * アノテーションポップアップ表示用の主要な計算済みスタイルを取得
 * 要素タイプに基づいて異なるプロパティを返し、デバッグに最も関連性の高い
 * CSSプロパティを表示する
 */
export function getDetailedComputedStyles(target: HTMLElement): Record<string, string> {
  if (typeof window === "undefined") return {};

  const styles = window.getComputedStyle(target);
  const result: Record<string, string> = {};
  const tag = target.tagName.toLowerCase();

  // 要素タイプに基づいて関連プロパティを選択
  let properties: string[];

  if (TEXT_ELEMENTS.has(tag)) {
    // テキスト要素にはタイポグラフィ重視
    properties = ["color", "fontSize", "fontWeight", "fontFamily", "lineHeight"];
  } else if (tag === "button" || (tag === "a" && target.getAttribute("role") === "button")) {
    // インタラクティブ要素には外観とスペーシング
    properties = ["backgroundColor", "color", "padding", "borderRadius", "fontSize"];
  } else if (FORM_INPUT_ELEMENTS.has(tag)) {
    // フォームスタイリング
    properties = ["backgroundColor", "color", "padding", "borderRadius", "fontSize"];
  } else if (MEDIA_ELEMENTS.has(tag)) {
    // メディアにはサイズ
    properties = ["width", "height", "objectFit", "borderRadius"];
  } else if (CONTAINER_ELEMENTS.has(tag)) {
    // コンテナにはレイアウト重視
    properties = ["display", "padding", "margin", "gap", "backgroundColor"];
  } else {
    // デフォルトフォールバック
    properties = ["color", "fontSize", "margin", "padding", "backgroundColor"];
  }

  for (const prop of properties) {
    const cssPropertyName = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
    const value = styles.getPropertyValue(cssPropertyName);
    if (value && !DEFAULT_STYLE_VALUES.has(value)) {
      result[prop] = value;
    }
  }

  return result;
}

// フォレンジック出力用の包括的CSSプロパティリスト
const FORENSIC_PROPERTIES = [
  // 色
  "color", "backgroundColor", "borderColor",
  // タイポグラフィ
  "fontSize", "fontWeight", "fontFamily", "lineHeight", "letterSpacing", "textAlign",
  // ボックスモデル
  "width", "height", "padding", "margin", "border", "borderRadius",
  // レイアウトと配置
  "display", "position", "top", "right", "bottom", "left", "zIndex",
  "flexDirection", "justifyContent", "alignItems", "gap",
  // ビジュアルエフェクト
  "opacity", "visibility", "overflow", "boxShadow",
  // トランスフォーム
  "transform",
];

/**
 * フォレンジック出力用の完全な計算済みスタイルを取得
 * フォレンジック出力形式で最大限のデバッグ詳細のため、
 * 関連する全CSSプロパティのセミコロン区切り文字列を返す
 */
export function getForensicComputedStyles(target: HTMLElement): string {
  if (typeof window === "undefined") return "";

  const styles = window.getComputedStyle(target);
  const parts: string[] = [];

  for (const prop of FORENSIC_PROPERTIES) {
    const cssPropertyName = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
    const value = styles.getPropertyValue(cssPropertyName);
    if (value && !DEFAULT_STYLE_VALUES.has(value)) {
      parts.push(`${cssPropertyName}: ${value}`);
    }
  }

  return parts.join("; ");
}

/**
 * フォレンジック計算済みスタイル文字列をRecordに変換
 * getForensicComputedStylesの逆操作 - アノテーション編集時に使用
 */
export function parseComputedStylesString(
  stylesStr: string | undefined,
): Record<string, string> | undefined {
  if (!stylesStr) return undefined;

  const result: Record<string, string> = {};
  const parts = stylesStr.split(";").map((p) => p.trim()).filter(Boolean);

  for (const part of parts) {
    const colonIndex = part.indexOf(":");
    if (colonIndex > 0) {
      const key = part.slice(0, colonIndex).trim();
      const value = part.slice(colonIndex + 1).trim();
      if (key && value) {
        result[key] = value;
      }
    }
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

/**
 * 要素のアクセシビリティ情報を取得
 */
export function getAccessibilityInfo(target: HTMLElement): string {
  const parts: string[] = [];

  const role = target.getAttribute("role");
  const ariaLabel = target.getAttribute("aria-label");
  const ariaDescribedBy = target.getAttribute("aria-describedby");
  const tabIndex = target.getAttribute("tabindex");
  const ariaHidden = target.getAttribute("aria-hidden");

  if (role) parts.push(`role="${role}"`);
  if (ariaLabel) parts.push(`aria-label="${ariaLabel}"`);
  if (ariaDescribedBy) parts.push(`aria-describedby="${ariaDescribedBy}"`);
  if (tabIndex) parts.push(`tabindex=${tabIndex}`);
  if (ariaHidden === "true") parts.push("aria-hidden");

  // フォーカス可能性チェック
  const focusable = target.matches("a, button, input, select, textarea, [tabindex]");
  if (focusable) parts.push("focusable");

  return parts.join(", ");
}

/**
 * 完全なDOM祖先パスを取得（フォレンジックモード用）
 * Shadow DOM内の要素もShadow境界の越境をマーキングしてサポート
 */
export function getFullElementPath(target: HTMLElement): string {
  const parts: string[] = [];
  let current: HTMLElement | null = target;

  while (current && current.tagName.toLowerCase() !== "html") {
    const tag = current.tagName.toLowerCase();
    let identifier = tag;

    if (current.id) {
      identifier = `${tag}#${current.id}`;
    } else if (current.className && typeof current.className === "string") {
      const cls = current.className
        .split(/\s+/)
        .map(c => c.replace(/[_][a-zA-Z0-9]{5,}.*$/, ""))
        .find(c => c.length > 2);
      if (cls) identifier = `${tag}.${cls}`;
    }

    // Shadow境界の越境をマーク
    const nextParent = getParentElement(current);
    if (!current.parentElement && nextParent) {
      identifier = `⟨shadow⟩ ${identifier}`;
    }

    parts.unshift(identifier);
    current = nextParent as HTMLElement | null;
  }

  return parts.join(" > ");
}
