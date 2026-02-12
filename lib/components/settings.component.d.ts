import { OnInit, OnDestroy } from '@angular/core';
import { AgentationService } from '../services/agentation.service';
import type { MarkerClickBehavior } from '../constants';
import type { OutputDetailLevel } from '../utils/output-generator';
import * as i0 from "@angular/core";
type AnimState = 'initial' | 'enter' | 'entered' | 'exit';
export declare class SettingsComponent implements OnInit, OnDestroy {
    /** サービス参照 */
    service: AgentationService;
    /** MCPエンドポイントURL */
    endpoint: string;
    readonly showMcpPanel: import("@angular/core").WritableSignal<boolean>;
    readonly animState: import("@angular/core").WritableSignal<AnimState>;
    readonly colorOptions: {
        value: string;
        label: string;
    }[];
    readonly outputDetailOptions: {
        value: OutputDetailLevel;
        label: string;
    }[];
    readonly markerClickOptions: {
        value: MarkerClickBehavior;
        label: string;
    }[];
    private enterTimer;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** 設定パネルのCSSクラス算出 */
    get panelClass(): string;
    /** 出力詳細レベル変更 */
    onOutputDetailChange(value: string): void;
    /** アノテーションカラー変更 */
    onColorChange(value: string): void;
    /** マーカークリック動作変更 */
    onMarkerClickChange(value: string): void;
    /** 自動クリア トグル */
    onAutoClearToggle(): void;
    /** インタラクションブロック トグル */
    onBlockInteractionsToggle(): void;
    /** Angular検出 トグル */
    onAngularToggle(): void;
    /** Webhook トグル */
    onWebhooksToggle(): void;
    /** Webhook URL変更 */
    onWebhookUrlChange(value: string): void;
    /** MCPパネルを開く */
    onOpenMcpPanel(): void;
    /** MCPパネルを閉じる */
    onCloseMcpPanel(): void;
    /** 設定パネルを閉じる */
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SettingsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SettingsComponent, "agentation-settings", never, { "service": { "alias": "service"; "required": true; }; "endpoint": { "alias": "endpoint"; "required": false; }; }, {}, never, never, true, never>;
}
export {};
