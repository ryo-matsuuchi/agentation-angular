import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export interface MouseMoveResult {
    element: string;
    elementName: string;
    elementPath: string;
    rect: DOMRect | null;
    angularComponents?: string | null;
    position: {
        x: number;
        y: number;
    };
}
export interface ClickResult {
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
    targetElement?: HTMLElement;
}
export declare class DOMEventService {
    private readonly ngZone;
    private readonly destroyRef;
    readonly mouseMove$: Subject<MouseMoveResult>;
    readonly elementClick$: Subject<ClickResult>;
    readonly escapePress$: Subject<void>;
    readonly scrollChange$: Subject<number>;
    private cleanupFns;
    private isAttached;
    private mouseDownPos;
    private dragStart;
    private isDragActive;
    private lastElementUpdate;
    private justFinishedDrag;
    private readonly DRAG_THRESHOLD;
    private readonly ELEMENT_UPDATE_THROTTLE;
    readonly dragStateChange$: Subject<boolean>;
    readonly dragRect$: Subject<{
        left: number;
        top: number;
        width: number;
        height: number;
    }>;
    readonly dragHighlights$: Subject<DOMRect[]>;
    readonly dragComplete$: Subject<ClickResult>;
    private readonly TEXT_TAGS;
    private readonly MEANINGFUL_TAGS;
    private readonly NEARBY_SELECTOR;
    private readonly FINAL_SELECTOR;
    /** DOMイベントリスナーを設置（ツールバー活性化時に呼び出し） */
    attach(options: {
        angularMode: 'smart' | 'filtered' | 'all' | 'off';
        outputDetail: string;
        blockInteractions: boolean;
    }): void;
    /** DOMイベントリスナーを解除（ツールバー非活性化時に呼び出し） */
    detach(): void;
    /** 全リソース解放（コンポーネントDestroy時） */
    destroy(): void;
    /** フィードバックツールバーの要素かどうか判定 */
    private isToolbarElement;
    /** ドラッグ矩形内の要素ハイライト用DOMRectを検出 */
    private findElementsInRect;
    /** mouseup時の最終要素検出（より厳密なセレクタ） */
    private findFinalElements;
    static ɵfac: i0.ɵɵFactoryDeclaration<DOMEventService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DOMEventService>;
}
