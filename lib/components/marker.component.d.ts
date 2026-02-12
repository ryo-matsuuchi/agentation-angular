import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class MarkerComponent {
    /** アノテーションID */
    annotationId: string;
    /** マーカー番号（1から開始） */
    number: number;
    /** X座標（ビューポート幅の%） */
    x: number;
    /** Y座標（px - ドキュメント上部からの絶対位置） */
    y: number;
    /** スクロールY値 */
    scrollY: number;
    /** fixed配置かどうか */
    isFixed: boolean;
    /** アクセントカラー */
    accentColor: string;
    /** 退場アニメーション中か */
    isExiting: boolean;
    /** ホバー中か */
    isHovered: boolean;
    /** 番号変更アニメーション */
    isRenumbering: boolean;
    /** クリック動作モード */
    clickBehavior: 'edit' | 'delete';
    /** マーカークリック */
    markerClick: EventEmitter<string>;
    /** マーカーホバー開始 */
    markerHoverStart: EventEmitter<string>;
    /** マーカーホバー終了 */
    markerHoverEnd: EventEmitter<string>;
    readonly closeIcon: import("../icons/icon-data").IconData;
    readonly editIcon: import("../icons/icon-data").IconData;
    /** マーカーの表示位置（top） */
    get topPosition(): number;
    /** マーカーのスタイル */
    get markerStyle(): Record<string, string>;
    /** マーカーのCSSクラス */
    get markerClass(): string;
    onClick(event: MouseEvent): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MarkerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MarkerComponent, "agentation-marker", never, { "annotationId": { "alias": "annotationId"; "required": true; }; "number": { "alias": "number"; "required": true; }; "x": { "alias": "x"; "required": true; }; "y": { "alias": "y"; "required": true; }; "scrollY": { "alias": "scrollY"; "required": false; }; "isFixed": { "alias": "isFixed"; "required": false; }; "accentColor": { "alias": "accentColor"; "required": false; }; "isExiting": { "alias": "isExiting"; "required": false; }; "isHovered": { "alias": "isHovered"; "required": false; }; "isRenumbering": { "alias": "isRenumbering"; "required": false; }; "clickBehavior": { "alias": "clickBehavior"; "required": false; }; }, { "markerClick": "markerClick"; "markerHoverStart": "markerHoverStart"; "markerHoverEnd": "markerHoverEnd"; }, never, never, true, never>;
}
