import { EventEmitter, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
type AnimState = 'initial' | 'enter' | 'entered' | 'exit';
export declare class PopupComponent implements OnInit, OnDestroy {
    /** shakeアニメーションのトリガー（signal input） */
    readonly shakeTrigger: import("@angular/core").InputSignal<number>;
    /** 要素名（ヘッダー表示用） */
    element: string;
    /** タイムスタンプ表示 */
    timestamp?: string;
    /** 選択テキスト */
    selectedText?: string;
    /** プレースホルダー */
    placeholder: string;
    /** 初期値（編集モード用） */
    initialValue: string;
    /** 送信ボタンラベル */
    submitLabel: string;
    /** アクセントカラー（hex） */
    accentColor: string;
    /** 退場状態（親制御） */
    isExiting: boolean;
    /** ライトモード */
    lightMode: boolean;
    /** 要素のComputedStyles */
    computedStyles?: Record<string, string>;
    /** ポジションスタイル */
    positionStyle?: Record<string, string>;
    /** 削除ボタン表示 */
    showDelete: boolean;
    /** テキスト送信イベント */
    submitText: EventEmitter<string>;
    /** キャンセルイベント */
    cancel: EventEmitter<void>;
    /** 削除イベント */
    delete: EventEmitter<void>;
    textareaRef: ElementRef<HTMLTextAreaElement>;
    readonly text: import("@angular/core").WritableSignal<string>;
    readonly animState: import("@angular/core").WritableSignal<AnimState>;
    readonly isShaking: import("@angular/core").WritableSignal<boolean>;
    readonly isFocused: import("@angular/core").WritableSignal<boolean>;
    readonly isStylesExpanded: import("@angular/core").WritableSignal<boolean>;
    readonly trashIcon: import("../icons/icon-data").IconData;
    constructor();
    private cancelTimer;
    private shakeTimer;
    private enterTimer;
    private focusTimer;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** シェイクアニメーション（外部から呼び出し可能） */
    shake(): void;
    /** キャンセル処理（退場アニメーション付き） */
    handleCancel(): void;
    /** 送信処理 */
    handleSubmit(): void;
    /** キーボード処理 */
    handleKeyDown(event: KeyboardEvent): void;
    /** テキスト変更 */
    onTextChange(value: string): void;
    /** スタイル表示トグル */
    toggleStyles(): void;
    /** ComputedStylesのエントリ取得 */
    get styleEntries(): Array<[string, string]>;
    /** CSSプロパティ名をケバブケースに変換 */
    toKebabCase(str: string): string;
    /** ポップアップのCSSクラス算出 */
    get popupClass(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopupComponent, "agentation-popup", never, { "shakeTrigger": { "alias": "shakeTrigger"; "required": false; "isSignal": true; }; "element": { "alias": "element"; "required": true; }; "timestamp": { "alias": "timestamp"; "required": false; }; "selectedText": { "alias": "selectedText"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "initialValue": { "alias": "initialValue"; "required": false; }; "submitLabel": { "alias": "submitLabel"; "required": false; }; "accentColor": { "alias": "accentColor"; "required": false; }; "isExiting": { "alias": "isExiting"; "required": false; }; "lightMode": { "alias": "lightMode"; "required": false; }; "computedStyles": { "alias": "computedStyles"; "required": false; }; "positionStyle": { "alias": "positionStyle"; "required": false; }; "showDelete": { "alias": "showDelete"; "required": false; }; }, { "submitText": "submitText"; "cancel": "cancel"; "delete": "delete"; }, never, never, true, never>;
}
export {};
