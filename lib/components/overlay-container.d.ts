import { OverlayContainer } from '@angular/cdk/overlay';
import * as i0 from "@angular/core";
/**
 * CDK Overlayがdocument.body直下に挿入する要素に
 * data-agentation属性を付与してスタイルスコープを確保する
 */
export declare class AgentationOverlayContainer extends OverlayContainer {
    protected _createContainer(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AgentationOverlayContainer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AgentationOverlayContainer>;
}
