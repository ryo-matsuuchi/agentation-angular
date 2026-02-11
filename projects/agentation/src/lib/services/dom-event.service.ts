// =============================================================================
// DOMイベント管理サービス
// =============================================================================
//
// NgZone外で高頻度DOMイベント（mousemove, click, scroll等）を処理し、
// 変更検出のパフォーマンスオーバーヘッドを最小化する。
//

import { Injectable, NgZone, DestroyRef, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { deepElementFromPoint, isElementFixed } from '../utils/helpers';
import {
  identifyElement,
  getNearbyText,
  getElementClasses,
  getDetailedComputedStyles,
  getForensicComputedStyles,
  getFullElementPath,
  getAccessibilityInfo,
  getNearbyElements,
} from '../utils/element-identification';
import { getAngularComponentName } from '../detection/angular-detector';
import { originalSetTimeout } from '../utils/freeze-animations';

// マウスムーブコールバックの型
export interface MouseMoveResult {
  element: string;
  elementName: string;
  elementPath: string;
  rect: DOMRect | null;
  angularComponents?: string | null;
  position: { x: number; y: number };
}

// クリックコールバックの型
export interface ClickResult {
  x: number;
  y: number;
  clientY: number;
  element: string;
  elementPath: string;
  selectedText?: string;
  boundingBox?: { x: number; y: number; width: number; height: number };
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
  elementBoundingBoxes?: Array<{ x: number; y: number; width: number; height: number }>;
  targetElement?: HTMLElement;
}

@Injectable()
export class DOMEventService {
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  // イベントストリーム
  readonly mouseMove$ = new Subject<MouseMoveResult>();
  readonly elementClick$ = new Subject<ClickResult>();
  readonly escapePress$ = new Subject<void>();
  readonly scrollChange$ = new Subject<number>();

  // イベントリスナーのクリーンアップ関数
  private cleanupFns: Array<() => void> = [];
  private isAttached = false;

  /** DOMイベントリスナーを設置（ツールバー活性化時に呼び出し） */
  attach(options: {
    angularMode: 'smart' | 'filtered' | 'all' | 'off';
    outputDetail: string;
    blockInteractions: boolean;
  }): void {
    if (this.isAttached) return;
    this.isAttached = true;

    this.ngZone.runOutsideAngular(() => {
      // mousemoveリスナー
      const handleMouseMove = (e: MouseEvent): void => {
        const target = deepElementFromPoint(e.clientX, e.clientY);
        if (!target) return;

        // フィードバックツールバー自体の要素は無視
        if (this.isToolbarElement(target)) {
          this.mouseMove$.next({
            element: '',
            elementName: '',
            elementPath: '',
            rect: null,
            position: { x: e.clientX, y: e.clientY },
          });
          return;
        }

        const { name: elementName, path } = identifyElement(target);

        // Angularコンポーネント検出
        let angularComponents: string | null = null;
        if (options.angularMode !== 'off') {
          const info = getAngularComponentName(target, { mode: 'auto' });
          angularComponents = info.path;
        }

        const displayName = angularComponents
          ? `${angularComponents} ${elementName}`
          : elementName;

        this.mouseMove$.next({
          element: displayName,
          elementName,
          elementPath: path,
          rect: target.getBoundingClientRect(),
          angularComponents,
          position: { x: e.clientX, y: e.clientY },
        });
      };

      document.addEventListener('mousemove', handleMouseMove);
      this.cleanupFns.push(() => document.removeEventListener('mousemove', handleMouseMove));

      // クリックリスナー（capture phaseで先に処理）
      const handleClick = (e: MouseEvent): void => {
        const target = deepElementFromPoint(e.clientX, e.clientY);
        if (!target) return;
        if (this.isToolbarElement(target)) return;

        // ページのデフォルトクリック動作を阻止
        if (options.blockInteractions) {
          e.preventDefault();
          e.stopPropagation();
        }

        const { name: elementName, path: elementPath } = identifyElement(target);
        const rect = target.getBoundingClientRect();
        const isFixed = isElementFixed(target);

        // 要素の詳細情報を収集
        const nearbyText = getNearbyText(target);
        const cssClasses = getElementClasses(target);
        const fullPath = getFullElementPath(target);
        const accessibility = getAccessibilityInfo(target);
        const nearbyElements = getNearbyElements(target);

        // 出力詳細レベルに応じたスタイル情報
        let computedStyles = '';
        let computedStylesObj: Record<string, string> = {};
        if (options.outputDetail === 'detailed') {
          computedStylesObj = getDetailedComputedStyles(target);
        }
        if (options.outputDetail === 'forensic') {
          // フォレンジックモードではセミコロン区切り文字列を取得
          computedStyles = getForensicComputedStyles(target);
        } else {
          computedStyles = Object.entries(computedStylesObj)
            .map(([k, v]) => `${k}: ${v}`)
            .join('; ');
        }

        // Angularコンポーネント検出
        let angularComponents: string | undefined;
        if (options.angularMode !== 'off') {
          const info = getAngularComponentName(target, { mode: 'auto' });
          angularComponents = info.path || undefined;
        }

        const displayName = angularComponents
          ? `${angularComponents} ${elementName}`
          : elementName;

        const x = (e.clientX / window.innerWidth) * 100;
        const y = isFixed ? e.clientY : e.clientY + window.scrollY;

        this.elementClick$.next({
          x,
          y,
          clientY: e.clientY,
          element: displayName,
          elementPath,
          selectedText: window.getSelection()?.toString()?.trim() || undefined,
          boundingBox: {
            x: rect.x,
            y: isFixed ? rect.y : rect.y + window.scrollY,
            width: rect.width,
            height: rect.height,
          },
          nearbyText: nearbyText || undefined,
          cssClasses: cssClasses || undefined,
          isFixed,
          fullPath: fullPath || undefined,
          accessibility: accessibility || undefined,
          computedStyles: computedStyles || undefined,
          computedStylesObj: Object.keys(computedStylesObj).length > 0 ? computedStylesObj : undefined,
          nearbyElements: nearbyElements || undefined,
          angularComponents,
          targetElement: target,
        });
      };

      document.addEventListener('click', handleClick, true);
      this.cleanupFns.push(() => document.removeEventListener('click', handleClick, true));

      // キーボードリスナー
      const handleKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') {
          this.escapePress$.next();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      this.cleanupFns.push(() => document.removeEventListener('keydown', handleKeyDown));

      // スクロールリスナー
      let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
      const handleScroll = (): void => {
        this.scrollChange$.next(window.scrollY);

        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        scrollTimeout = originalSetTimeout(() => {
          // スクロール終了を通知（-1で終了シグナル）
          this.scrollChange$.next(-1);
        }, 100);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      this.cleanupFns.push(() => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      });
    });
  }

  /** DOMイベントリスナーを解除（ツールバー非活性化時に呼び出し） */
  detach(): void {
    this.cleanupFns.forEach(fn => fn());
    this.cleanupFns = [];
    this.isAttached = false;
  }

  /** 全リソース解放（コンポーネントDestroy時） */
  destroy(): void {
    this.detach();
    this.mouseMove$.complete();
    this.elementClick$.complete();
    this.escapePress$.complete();
    this.scrollChange$.complete();
  }

  /** フィードバックツールバーの要素かどうか判定 */
  private isToolbarElement(element: HTMLElement): boolean {
    return !!element.closest('[data-agentation]') ||
           !!element.closest('[data-feedback-toolbar]') ||
           !!element.closest('[data-annotation-popup]');
  }
}
