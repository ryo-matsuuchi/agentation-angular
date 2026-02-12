import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { PopupComponent } from './popup.component';
import { AgentationService } from '../services/agentation.service';
import { hexToRgba } from '../utils/helpers';
import type { Annotation } from '../types';
import * as i0 from "@angular/core";
export declare class AgentationComponent implements OnInit, OnDestroy {
    /** サーバーエンドポイントURL */
    endpoint?: string;
    /** 既存セッションID */
    sessionId?: string;
    /** コピー時にクリップボードに書き込むか */
    copyToClipboard: boolean;
    /** WebhookURL */
    webhookUrl?: string;
    annotationAdd: EventEmitter<Annotation>;
    annotationDelete: EventEmitter<Annotation>;
    annotationUpdate: EventEmitter<Annotation>;
    annotationsClear: EventEmitter<Annotation[]>;
    copyOutput: EventEmitter<string>;
    sessionCreated: EventEmitter<string>;
    readonly service: AgentationService;
    private readonly domEvents;
    private readonly serverSync;
    readonly icons: {
        plus: import("../icons/icon-data").IconData;
        eyeAnimated: import("../icons/icon-data").AnimatedIconData;
        pausePlay: import("../icons/icon-data").AnimatedIconData;
        copy: import("../icons/icon-data").AnimatedIconData;
        send: import("../icons/icon-data").AnimatedIconData;
        gear: import("../icons/icon-data").IconData;
        trash: import("../icons/icon-data").IconData;
        sun: import("../icons/icon-data").IconData;
        moon: import("../icons/icon-data").IconData;
        chevronLeft: import("../icons/icon-data").IconData;
        listSparkle: import("../icons/icon-data").IconData;
        bunny: import("../icons/icon-data").AnimatedIconData;
    };
    readonly hexToRgba: typeof hexToRgba;
    pendingPopup?: PopupComponent;
    editPopup?: PopupComponent;
    readonly isDragging: import("@angular/core").WritableSignal<boolean>;
    readonly dragRectStyle: import("@angular/core").WritableSignal<Record<string, string>>;
    readonly dragHighlightRects: import("@angular/core").WritableSignal<DOMRect[]>;
    /** DOMRectをngStyleオブジェクトに変換 */
    rectToStyle(rect: DOMRect): Record<string, string>;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** ツールバー活性化トグル */
    toggleActive(): void;
    /** アノテーション送信 */
    onAnnotationSubmit(text: string): void;
    /** アノテーション編集送信 */
    onAnnotationEditSubmit(text: string): void;
    /** マーカークリック */
    onMarkerClick(id: string): void;
    /** 編集ポップアップからの削除（常に削除動作） */
    onDeleteFromPopup(id: string): void;
    /** コピー */
    onCopy(): Promise<void>;
    /** 全クリア */
    onClearAll(): void;
    /** エージェントに送信 */
    onSendToAgent(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AgentationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AgentationComponent, "agentation", never, { "endpoint": { "alias": "endpoint"; "required": false; }; "sessionId": { "alias": "sessionId"; "required": false; }; "copyToClipboard": { "alias": "copyToClipboard"; "required": false; }; "webhookUrl": { "alias": "webhookUrl"; "required": false; }; }, { "annotationAdd": "annotationAdd"; "annotationDelete": "annotationDelete"; "annotationUpdate": "annotationUpdate"; "annotationsClear": "annotationsClear"; "copyOutput": "copyOutput"; "sessionCreated": "sessionCreated"; }, never, never, true, never>;
}
