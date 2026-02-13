import { SafeHtml } from '@angular/platform-browser';
import type { IconData } from './icon-data';
import * as i0 from "@angular/core";
/**
 * SVGアイコンコンポーネント
 * icon-data.tsのデータを受け取りSVGを描画する
 *
 * 注意: defs/cssAnimationsはライブラリ内部のicon-data.tsからのみ供給される。
 * 外部からの未信頼データを渡さないこと。
 */
export declare class IconComponent {
    /** アイコンデータ */
    data: IconData;
    /** アイコンサイズ（px） */
    size: number;
    /** バリアント名（AnimatedIconDataのvariants切り替え用） */
    variant?: string;
    private readonly sanitizer;
    /** 現在のバリアントに応じたpaths */
    get activePaths(): IconData['paths'];
    /** 現在のバリアントに応じたcircles */
    get activeCircles(): IconData['circles'];
    /** サニタイズ済みdefsコンテンツ */
    get sanitizedDefs(): SafeHtml;
    /** サニタイズ済みCSSアニメーション */
    get sanitizedStyles(): SafeHtml;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconComponent, "agentation-icon", never, { "data": { "alias": "data"; "required": true; }; "size": { "alias": "size"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; }, {}, never, never, true, never>;
}
