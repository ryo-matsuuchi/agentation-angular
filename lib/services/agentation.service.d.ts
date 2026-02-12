import type { Annotation } from '../types';
import type { ToolbarSettings } from '../constants';
import type { AngularComponentMode } from '../utils/output-generator';
import * as i0 from "@angular/core";
export interface ToolbarUIState {
    isActive: boolean;
    showMarkers: boolean;
    markersVisible: boolean;
    markersExiting: boolean;
    isDarkMode: boolean;
    showSettings: boolean;
    showSettingsVisible: boolean;
    settingsPage: 'main' | 'automations';
    toolbarPosition: {
        x: number;
        y: number;
    } | null;
    isTransitioning: boolean;
    tooltipsHidden: boolean;
    mounted: boolean;
}
export interface AnnotationState {
    annotations: Annotation[];
    pendingAnnotation: PendingAnnotation | null;
    editingAnnotation: Annotation | null;
    hoveredMarkerId: string | null;
    deletingMarkerId: string | null;
    exitingMarkers: Set<string>;
    renumberFrom: number | null;
}
export interface PendingAnnotation {
    x: number;
    y: number;
    clientY: number;
    element: string;
    elementPath: string;
    selectedText?: string;
    boundingBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    nearbyText?: string;
    cssClasses?: string;
    isMultiSelect?: boolean;
    isFixed?: boolean;
    fullPath?: string;
    accessibility?: string;
    computedStyles?: string;
    computedStylesObj?: Record<string, string>;
    nearbyElements?: string;
    angularComponents?: string;
    elementBoundingBoxes?: Array<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
    multiSelectElements?: HTMLElement[];
    targetElement?: HTMLElement;
}
export interface HoverInfo {
    element: string;
    elementName: string;
    elementPath: string;
    rect: DOMRect | null;
    angularComponents?: string | null;
}
export interface SyncState {
    connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
    currentSessionId: string | null;
}
export interface ActionUIState {
    copied: boolean;
    sendState: 'idle' | 'sending' | 'sent' | 'failed';
    cleared: boolean;
    isClearing: boolean;
}
export declare class AgentationService {
    readonly toolbarState: import("@angular/core").WritableSignal<ToolbarUIState>;
    readonly annotationState: import("@angular/core").WritableSignal<AnnotationState>;
    readonly hoverInfo: import("@angular/core").WritableSignal<HoverInfo>;
    readonly hoverPosition: import("@angular/core").WritableSignal<{
        x: number;
        y: number;
    }>;
    readonly syncState: import("@angular/core").WritableSignal<SyncState>;
    readonly actionState: import("@angular/core").WritableSignal<ActionUIState>;
    readonly isFrozen: import("@angular/core").WritableSignal<boolean>;
    readonly scrollY: import("@angular/core").WritableSignal<number>;
    readonly isScrolling: import("@angular/core").WritableSignal<boolean>;
    readonly settings: import("@angular/core").WritableSignal<ToolbarSettings>;
    readonly annotations: import("@angular/core").Signal<Annotation[]>;
    readonly hasAnnotations: import("@angular/core").Signal<boolean>;
    readonly isActive: import("@angular/core").Signal<boolean>;
    readonly pendingAnnotation: import("@angular/core").Signal<PendingAnnotation>;
    readonly editingAnnotation: import("@angular/core").Signal<Annotation>;
    readonly showMarkers: import("@angular/core").Signal<boolean>;
    readonly markersVisible: import("@angular/core").Signal<boolean>;
    readonly connectionStatus: import("@angular/core").Signal<"error" | "disconnected" | "connecting" | "connected">;
    readonly currentSessionId: import("@angular/core").Signal<string>;
    readonly angularMode: import("@angular/core").Signal<AngularComponentMode>;
    private endpoint;
    private pathname;
    private webhookUrl;
    /** クリップボード書き込みフラグ（コンポーネントから設定） */
    copyToClipboardEnabled: boolean;
    /** コンポーネントからの設定注入 */
    configure(config: {
        endpoint?: string;
        sessionId?: string;
        webhookUrl?: string;
    }): void;
    activate(): void;
    deactivate(): void;
    toggleMarkers(): void;
    toggleSettings(): void;
    toggleDarkMode(): void;
    updateSettings(partial: Partial<ToolbarSettings>): void;
    setToolbarPosition(pos: {
        x: number;
        y: number;
    } | null): void;
    /** 新しいアノテーション要素の選択を開始 */
    startAnnotation(pending: PendingAnnotation): void;
    /** アノテーション追加（テキスト入力完了後） */
    addAnnotation(comment: string): Annotation | null;
    /** アノテーション削除 */
    deleteAnnotation(id: string): Annotation | undefined;
    /** アノテーション更新（コメント編集） */
    updateAnnotation(id: string, comment: string): Annotation | undefined;
    /** 全アノテーション削除 */
    clearAll(): Annotation[];
    /** アノテーション編集モード開始 */
    startEditing(annotation: Annotation): void;
    /** アノテーション編集モードキャンセル */
    cancelEditing(): void;
    /** 保留中アノテーションのキャンセル */
    cancelPending(): void;
    updateHover(info: HoverInfo | null, position?: {
        x: number;
        y: number;
    }): void;
    setHoveredMarker(id: string | null): void;
    copyOutput(): Promise<string>;
    /** サーバーにアクションを送信 */
    sendToAgent(): Promise<void>;
    toggleFreeze(): void;
    updateScrollY(y: number): void;
    setScrolling(isScrolling: boolean): void;
    /** localStorageへの永続化 */
    private persistAnnotations;
    /** サーバーへの同期 */
    private syncToServer;
    static ɵfac: i0.ɵɵFactoryDeclaration<AgentationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AgentationService>;
}
