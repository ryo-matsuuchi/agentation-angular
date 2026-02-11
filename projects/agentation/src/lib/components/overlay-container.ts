// =============================================================================
// Agentation用カスタムOverlayContainer
// =============================================================================

import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

/**
 * CDK Overlayがdocument.body直下に挿入する要素に
 * data-agentation属性を付与してスタイルスコープを確保する
 */
@Injectable()
export class AgentationOverlayContainer extends OverlayContainer {
  protected override _createContainer(): void {
    super._createContainer();
    // スタイルスコープ用属性を付与
    this._containerElement.setAttribute('data-agentation', '');
  }
}
