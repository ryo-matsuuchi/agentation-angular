export interface DetectionConfig {
    /** 検出モード: auto（自動判定）, debug-api（ng.getComponent使用）, tag-name（タグ名ベース） */
    mode?: 'auto' | 'debug-api' | 'tag-name';
    /** 親要素の探索上限 */
    maxDepth?: number;
    /** 検出するコンポーネント数の上限 */
    maxComponents?: number;
}
export interface ComponentInfo {
    /** コンポーネントパス（例: "<AppComponent> <DashboardComponent> <ButtonComponent>"） */
    path: string | null;
    /** コンポーネント名の配列 */
    components: string[];
}
/**
 * HTMLElementに対応するAngularコンポーネント名を検出する
 */
export declare function getAngularComponentName(element: HTMLElement, config?: DetectionConfig): ComponentInfo;
