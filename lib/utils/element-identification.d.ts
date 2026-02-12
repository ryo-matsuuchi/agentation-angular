/**
 * Shadow DOM境界を越えて最も近い祖先要素を検索
 */
export declare function closestCrossingShadow(element: Element, selector: string): Element | null;
/**
 * 要素がShadow DOM内にあるか判定
 */
export declare function isInShadowDOM(element: Element): boolean;
/**
 * 要素のshadowホストを取得（Shadow DOM内でない場合はnull）
 */
export declare function getShadowHost(element: Element): Element | null;
/**
 * 要素の読みやすいパスを取得（例: "article > section > p"）
 * Shadow DOM内の要素もShadow境界を越えてサポート
 */
export declare function getElementPath(target: HTMLElement, maxDepth?: number): string;
/**
 * 要素を識別して人間が読みやすい名前とパスを返す
 */
export declare function identifyElement(target: HTMLElement): {
    name: string;
    path: string;
};
/**
 * 要素とその兄弟からテキストコンテンツを取得（コンテキスト用）
 */
export declare function getNearbyText(element: HTMLElement): string;
/**
 * アニメーションフィードバック用の簡略化された要素識別子
 */
export declare function identifyAnimationElement(target: HTMLElement): string;
/**
 * 構造的コンテキスト用に近くの兄弟要素を取得
 * Shadow DOM内の要素もサポート
 */
export declare function getNearbyElements(element: HTMLElement): string;
/**
 * 要素のCSSクラス名を取得（モジュールハッシュを除去）
 */
export declare function getElementClasses(target: HTMLElement): string;
/**
 * 要素の主要な計算済みスタイルを取得（スタイリングの問題に有用）
 */
export declare function getComputedStylesSnapshot(target: HTMLElement): string;
/**
 * アノテーションポップアップ表示用の主要な計算済みスタイルを取得
 * 要素タイプに基づいて異なるプロパティを返し、デバッグに最も関連性の高い
 * CSSプロパティを表示する
 */
export declare function getDetailedComputedStyles(target: HTMLElement): Record<string, string>;
/**
 * フォレンジック出力用の完全な計算済みスタイルを取得
 * フォレンジック出力形式で最大限のデバッグ詳細のため、
 * 関連する全CSSプロパティのセミコロン区切り文字列を返す
 */
export declare function getForensicComputedStyles(target: HTMLElement): string;
/**
 * フォレンジック計算済みスタイル文字列をRecordに変換
 * getForensicComputedStylesの逆操作 - アノテーション編集時に使用
 */
export declare function parseComputedStylesString(stylesStr: string | undefined): Record<string, string> | undefined;
/**
 * 要素のアクセシビリティ情報を取得
 */
export declare function getAccessibilityInfo(target: HTMLElement): string;
/**
 * 完全なDOM祖先パスを取得（フォレンジックモード用）
 * Shadow DOM内の要素もShadow境界の越境をマーキングしてサポート
 */
export declare function getFullElementPath(target: HTMLElement): string;
