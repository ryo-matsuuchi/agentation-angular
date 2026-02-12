// =============================================================================
// SVGアイコンコンポーネント
// =============================================================================

import { Component, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import type { IconData, AnimatedIconData } from './icon-data';

/**
 * SVGアイコンコンポーネント
 * icon-data.tsのデータを受け取りSVGを描画する
 *
 * 注意: defs/cssAnimationsはライブラリ内部のicon-data.tsからのみ供給される。
 * 外部からの未信頼データを渡さないこと。
 */
@Component({
  selector: 'agentation-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      [attr.viewBox]="data.viewBox"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      @if (data.defs) {
        <defs [innerHTML]="sanitizedDefs"></defs>
      }
      @if (data.cssAnimations) {
        <style [innerHTML]="sanitizedStyles"></style>
      }
      @for (path of activePaths; track $index) {
        <path
          [attr.d]="path.d"
          [attr.stroke]="path.stroke || null"
          [attr.stroke-width]="path.strokeWidth || null"
          [attr.stroke-linecap]="path.strokeLinecap || null"
          [attr.stroke-linejoin]="path.strokeLinejoin || null"
          [attr.fill]="path.fill || null"
          [attr.class]="path.className || null"
          [ngStyle]="path.style || null"
        />
      }
      @if (activeCircles) {
        @for (circle of activeCircles; track $index) {
          <circle
            [attr.cx]="circle.cx"
            [attr.cy]="circle.cy"
            [attr.r]="circle.r"
            [attr.stroke]="circle.stroke || null"
            [attr.stroke-width]="circle.strokeWidth || null"
            [attr.fill]="circle.fill || null"
            [attr.class]="circle.className || null"
          />
        }
      }
    </svg>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  /** アイコンデータ */
  @Input({ required: true }) data!: IconData;
  /** アイコンサイズ（px） */
  @Input() size = 16;
  /** バリアント名（AnimatedIconDataのvariants切り替え用） */
  @Input() variant?: string;

  private readonly sanitizer = inject(DomSanitizer);

  /** 現在のバリアントに応じたpaths */
  get activePaths(): IconData['paths'] {
    if (this.variant) {
      const animated = this.data as AnimatedIconData;
      const v = animated.variants?.[this.variant];
      if (v) return v.paths;
    }
    return this.data.paths;
  }

  /** 現在のバリアントに応じたcircles */
  get activeCircles(): IconData['circles'] {
    if (this.variant) {
      const animated = this.data as AnimatedIconData;
      const v = animated.variants?.[this.variant];
      if (v) return v.circles;
    }
    return this.data.circles;
  }

  /** サニタイズ済みdefsコンテンツ */
  get sanitizedDefs(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.data.defs || '');
  }

  /** サニタイズ済みCSSアニメーション */
  get sanitizedStyles(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.data.cssAnimations || '');
  }
}
