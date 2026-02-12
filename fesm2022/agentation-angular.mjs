import * as i0 from '@angular/core';
import { inject, Input, ChangeDetectionStrategy, Component, EventEmitter, Output, signal, ViewChild, ViewEncapsulation, Injectable, computed, NgZone, DestroyRef, effect } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { DomSanitizer } from '@angular/platform-browser';
import * as i1$1 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

// =============================================================================
// SVGアイコンコンポーネント
// =============================================================================
/**
 * SVGアイコンコンポーネント
 * icon-data.tsのデータを受け取りSVGを描画する
 *
 * 注意: defs/cssAnimationsはライブラリ内部のicon-data.tsからのみ供給される。
 * 外部からの未信頼データを渡さないこと。
 */
class IconComponent {
    /** アイコンデータ */
    data;
    /** アイコンサイズ（px） */
    size = 16;
    sanitizer = inject(DomSanitizer);
    /** サニタイズ済みdefsコンテンツ */
    get sanitizedDefs() {
        return this.sanitizer.bypassSecurityTrustHtml(this.data.defs || '');
    }
    /** サニタイズ済みCSSアニメーション */
    get sanitizedStyles() {
        return this.sanitizer.bypassSecurityTrustHtml(this.data.cssAnimations || '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: IconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.18", type: IconComponent, isStandalone: true, selector: "agentation-icon", inputs: { data: "data", size: "size" }, ngImport: i0, template: `
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
      @for (path of data.paths; track $index) {
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
      @if (data.circles) {
        @for (circle of data.circles; track $index) {
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
  `, isInline: true, styles: [":host{display:inline-flex;align-items:center;justify-content:center}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'agentation-icon', standalone: true, imports: [CommonModule], template: `
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
      @for (path of data.paths; track $index) {
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
      @if (data.circles) {
        @for (circle of data.circles; track $index) {
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:inline-flex;align-items:center;justify-content:center}\n"] }]
        }], propDecorators: { data: [{
                type: Input,
                args: [{ required: true }]
            }], size: [{
                type: Input
            }] } });

// =============================================================================
// SVGアイコンデータ定義
// =============================================================================
//
// ReactコンポーネントからフレームワークフリーなSVGデータ形式に変換
// Angularコンポーネントでの描画に使用
//
// =============================================================================
// 基本アイコン
// =============================================================================
// 閉じるアイコン（小さいX）
const ICON_CLOSE = {
    viewBox: '0 0 16 16',
    paths: [
        {
            d: 'M4 4l8 8M12 4l-8 8',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
        },
    ],
};
// プラスアイコン
const ICON_PLUS = {
    viewBox: '0 0 16 16',
    paths: [
        {
            d: 'M8 3v10M3 8h10',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
        },
    ],
};
// チェックマークアイコン
const ICON_CHECK = {
    viewBox: '0 0 16 16',
    paths: [
        {
            d: 'M3 8l3.5 3.5L13 5',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
    ],
};
// チェックボックス用チェックマーク（小型、チェックボックスに最適化）
const ICON_CHECK_SMALL = {
    viewBox: '0 0 14 14',
    paths: [
        {
            d: 'M3.9375 7L6.125 9.1875L10.5 4.8125',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
    ],
};
// リスト+スパークルアイコン
const ICON_LIST_SPARKLE = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M11.5 12L5.5 12',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
        {
            d: 'M18.5 6.75L5.5 6.75',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
        {
            d: 'M9.25 17.25L5.5 17.25',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
        {
            d: 'M16 12.75L16.5179 13.9677C16.8078 14.6494 17.3506 15.1922 18.0323 15.4821L19.25 16L18.0323 16.5179C17.3506 16.8078 16.8078 17.3506 16.5179 18.0323L16 19.25L15.4821 18.0323C15.1922 17.3506 14.6494 16.8078 13.9677 16.5179L12.75 16L13.9677 15.4821C14.6494 15.1922 15.1922 14.6494 15.4821 13.9677L16 12.75Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinejoin: 'round',
        },
    ],
    defs: '<clipPath id="clip0_list_sparkle"><rect width="24" height="24" fill="white" /></clipPath>',
};
// ヘルプ/クエスチョンマークアイコン
const ICON_HELP = {
    viewBox: '0 0 20 20',
    paths: [
        {
            d: 'M8.5 8.75C8.5 7.92 9.17 7.25 10 7.25C10.83 7.25 11.5 7.92 11.5 8.75C11.5 9.58 10.83 10.25 10 10.25V11',
            stroke: 'currentColor',
            strokeWidth: '1.25',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
    ],
    circles: [
        {
            cx: '10',
            cy: '10.5',
            r: '5.25',
            stroke: 'currentColor',
            strokeWidth: '1.25',
        },
        {
            cx: '10',
            cy: '13',
            r: '0.75',
            fill: 'currentColor',
        },
    ],
};
// コピーアイコン（重なった四角形）
const ICON_COPY_ALT = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M4.75 11.25C4.75 10.4216 5.42157 9.75 6.25 9.75H12.75C13.5784 9.75 14.25 10.4216 14.25 11.25V17.75C14.25 18.5784 13.5784 19.25 12.75 19.25H6.25C5.42157 19.25 4.75 18.5784 4.75 17.75V11.25Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
        },
        {
            d: 'M17.25 14.25H17.75C18.5784 14.25 19.25 13.5784 19.25 12.75V6.25C19.25 5.42157 18.5784 4.75 17.75 4.75H11.25C10.4216 4.75 9.75 5.42157 9.75 6.25V6.75',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
        },
    ],
};
// 目アイコン（オリジナル）
const ICON_EYE = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M4.91516 12.7108C4.63794 12.2883 4.63705 11.7565 4.91242 11.3328C5.84146 9.9033 8.30909 6.74994 12 6.74994C15.6909 6.74994 18.1585 9.9033 19.0876 11.3328C19.3629 11.7565 19.3621 12.2883 19.0848 12.7108C18.1537 14.13 15.6873 17.2499 12 17.2499C8.31272 17.2499 5.8463 14.13 4.91516 12.7108Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
        {
            d: 'M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
    ],
};
// 目アイコン（大きい瞳孔バージョン）
const ICON_EYE_ALT = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M3.91752 12.7539C3.65127 12.2996 3.65037 11.7515 3.9149 11.2962C4.9042 9.59346 7.72688 5.49994 12 5.49994C16.2731 5.49994 19.0958 9.59346 20.0851 11.2962C20.3496 11.7515 20.3487 12.2996 20.0825 12.7539C19.0908 14.4459 16.2694 18.4999 12 18.4999C7.73064 18.4999 4.90918 14.4459 3.91752 12.7539Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
        {
            d: 'M12 14.8261C13.5608 14.8261 14.8261 13.5608 14.8261 12C14.8261 10.4392 13.5608 9.17392 12 9.17392C10.4392 9.17392 9.17391 10.4392 9.17391 12C9.17391 13.5608 10.4392 14.8261 12 14.8261Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
    ],
};
// 目閉じアイコン（スラッシュ付き）
const ICON_EYE_CLOSED = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M18.6025 9.28503C18.9174 8.9701 19.4364 8.99481 19.7015 9.35271C20.1484 9.95606 20.4943 10.507 20.7342 10.9199C21.134 11.6086 21.1329 12.4454 20.7303 13.1328C20.2144 14.013 19.2151 15.5225 17.7723 16.8193C16.3293 18.1162 14.3852 19.2497 12.0008 19.25C11.4192 19.25 10.8638 19.1823 10.3355 19.0613C9.77966 18.934 9.63498 18.2525 10.0382 17.8493C10.2412 17.6463 10.5374 17.573 10.8188 17.6302C11.1993 17.7076 11.5935 17.75 12.0008 17.75C13.8848 17.7497 15.4867 16.8568 16.7693 15.7041C18.0522 14.5511 18.9606 13.1867 19.4363 12.375C19.5656 12.1543 19.5659 11.8943 19.4373 11.6729C19.2235 11.3049 18.921 10.8242 18.5364 10.3003C18.3085 9.98991 18.3302 9.5573 18.6025 9.28503ZM12.0008 4.75C12.5814 4.75006 13.1358 4.81803 13.6632 4.93953C14.2182 5.06741 14.362 5.74812 13.9593 6.15091C13.7558 6.35435 13.4589 6.42748 13.1771 6.36984C12.7983 6.29239 12.4061 6.25006 12.0008 6.25C10.1167 6.25 8.51415 7.15145 7.23028 8.31543C5.94678 9.47919 5.03918 10.8555 4.56426 11.6729C4.43551 11.8945 4.43582 12.1542 4.56524 12.375C4.77587 12.7343 5.07189 13.2012 5.44718 13.7105C5.67623 14.0213 5.65493 14.4552 5.38193 14.7282C5.0671 15.0431 4.54833 15.0189 4.28292 14.6614C3.84652 14.0736 3.50813 13.5369 3.27129 13.1328C2.86831 12.4451 2.86717 11.6088 3.26739 10.9199C3.78185 10.0345 4.77959 8.51239 6.22247 7.2041C7.66547 5.89584 9.61202 4.75 12.0008 4.75Z',
            fill: 'currentColor',
        },
        {
            d: 'M5 19L19 5',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
        },
    ],
};
// 目+マイナスアイコン（非表示/折りたたみ状態）
const ICON_EYE_MINUS = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M4.91516 12.7108C4.63794 12.2883 4.63705 11.7565 4.91242 11.3328C5.84146 9.9033 8.30909 6.74994 12 6.74994C15.6909 6.74994 18.1585 9.9033 19.0876 11.3328C19.3629 11.7565 19.3621 12.2883 19.0848 12.7108C18.1537 14.13 15.6873 17.2499 12 17.2499C8.31272 17.2499 5.8463 14.13 4.91516 12.7108Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
        {
            d: 'M9 12H15',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
        },
    ],
};
// 歯車アイコン
const ICON_GEAR = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M10.6504 5.81117C10.9939 4.39628 13.0061 4.39628 13.3496 5.81117C13.5715 6.72517 14.6187 7.15891 15.4219 6.66952C16.6652 5.91193 18.0881 7.33479 17.3305 8.57815C16.8411 9.38134 17.2748 10.4285 18.1888 10.6504C19.6037 10.9939 19.6037 13.0061 18.1888 13.3496C17.2748 13.5715 16.8411 14.6187 17.3305 15.4219C18.0881 16.6652 16.6652 18.0881 15.4219 17.3305C14.6187 16.8411 13.5715 17.2748 13.3496 18.1888C13.0061 19.6037 10.9939 19.6037 10.6504 18.1888C10.4285 17.2748 9.38135 16.8411 8.57815 17.3305C7.33479 18.0881 5.91193 16.6652 6.66952 15.4219C7.15891 14.6187 6.72517 13.5715 5.81117 13.3496C4.39628 13.0061 4.39628 10.9939 5.81117 10.6504C6.72517 10.4285 7.15891 9.38134 6.66952 8.57815C5.91193 7.33479 7.33479 5.91192 8.57815 6.66952C9.38135 7.15891 10.4285 6.72517 10.6504 5.81117Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
    ],
    circles: [
        {
            cx: '12',
            cy: '12',
            r: '2.5',
            stroke: 'currentColor',
            strokeWidth: '1.5',
        },
    ],
};
// 一時停止アイコン（角丸長方形バージョン）
const ICON_PAUSE_ALT = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M9.25 5.75C9.80228 5.75 10.25 6.19772 10.25 6.75L10.25 17.25C10.25 17.8023 9.80228 18.25 9.25 18.25L6.75 18.25C6.19772 18.25 5.75 17.8023 5.75 17.25L5.75 6.75C5.75 6.19772 6.19772 5.75 6.75 5.75L9.25 5.75Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
        },
        {
            d: 'M17.25 5.75C17.8023 5.75 18.25 6.19772 18.25 6.75L18.25 17.25C18.25 17.8023 17.8023 18.25 17.25 18.25L14.75 18.25C14.1977 18.25 13.75 17.8023 13.75 17.25L13.75 6.75C13.75 6.19772 14.1977 5.75 14.75 5.75L17.25 5.75Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
        },
    ],
};
// 一時停止アイコン（シンプルライン）
const ICON_PAUSE = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M8 6L8 18',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
        },
        {
            d: 'M16 18L16 6',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
        },
    ],
};
// 再生アイコン（右向き三角形）
const ICON_PLAY_ALT = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M17.75 10.701C18.75 11.2783 18.75 12.7217 17.75 13.299L8.75 18.4952C7.75 19.0725 6.5 18.3509 6.5 17.1962L6.5 6.80384C6.5 5.64914 7.75 4.92746 8.75 5.50481L17.75 10.701Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
        },
    ],
};
// ゴミ箱アイコン（塗り潰し）
const ICON_TRASH_ALT = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M13.5 4C14.7426 4 15.75 5.00736 15.75 6.25V7H18.5C18.9142 7 19.25 7.33579 19.25 7.75C19.25 8.16421 18.9142 8.5 18.5 8.5H17.9678L17.6328 16.2217C17.61 16.7475 17.5912 17.1861 17.5469 17.543C17.5015 17.9087 17.4225 18.2506 17.2461 18.5723C16.9747 19.0671 16.5579 19.4671 16.0518 19.7168C15.7227 19.8791 15.3772 19.9422 15.0098 19.9717C14.6514 20.0004 14.2126 20 13.6865 20H10.3135C9.78735 20 9.34856 20.0004 8.99023 19.9717C8.62278 19.9422 8.27729 19.8791 7.94824 19.7168C7.44205 19.4671 7.02532 19.0671 6.75391 18.5723C6.57751 18.2506 6.49853 17.9087 6.45312 17.543C6.40883 17.1861 6.39005 16.7475 6.36719 16.2217L6.03223 8.5H5.5C5.08579 8.5 4.75 8.16421 4.75 7.75C4.75 7.33579 5.08579 7 5.5 7H8.25V6.25C8.25 5.00736 9.25736 4 10.5 4H13.5ZM7.86621 16.1562C7.89013 16.7063 7.90624 17.0751 7.94141 17.3584C7.97545 17.6326 8.02151 17.7644 8.06934 17.8516C8.19271 18.0763 8.38239 18.2577 8.6123 18.3711C8.70153 18.4151 8.83504 18.4545 9.11035 18.4766C9.39482 18.4994 9.76335 18.5 10.3135 18.5H13.6865C14.2367 18.5 14.6052 18.4994 14.8896 18.4766C15.165 18.4545 15.2985 18.4151 15.3877 18.3711C15.6176 18.2577 15.8073 18.0763 15.9307 17.8516C15.9785 17.7644 16.0245 17.6326 16.0586 17.3584C16.0938 17.0751 16.1099 16.7063 16.1338 16.1562L16.4668 8.5H7.5332L7.86621 16.1562ZM9.97656 10.75C10.3906 10.7371 10.7371 11.0626 10.75 11.4766L10.875 15.4766C10.8879 15.8906 10.5624 16.2371 10.1484 16.25C9.73443 16.2629 9.38794 15.9374 9.375 15.5234L9.25 11.5234C9.23706 11.1094 9.56255 10.7629 9.97656 10.75ZM14.0244 10.75C14.4384 10.7635 14.7635 11.1105 14.75 11.5244L14.6201 15.5244C14.6066 15.9384 14.2596 16.2634 13.8457 16.25C13.4317 16.2365 13.1067 15.8896 13.1201 15.4756L13.251 11.4756C13.2645 11.0617 13.6105 10.7366 14.0244 10.75ZM10.5 5.5C10.0858 5.5 9.75 5.83579 9.75 6.25V7H14.25V6.25C14.25 5.83579 13.9142 5.5 13.5 5.5H10.5Z',
            fill: 'currentColor',
        },
    ],
};
// チャットバブル+省略記号
const ICON_CHAT_ELLIPSIS = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M18.8875 19.25L19.6112 19.0533C19.6823 19.3148 19.6068 19.5943 19.4137 19.7844C19.2206 19.9746 18.9399 20.0457 18.6795 19.9706L18.8875 19.25ZM14.9631 18.244L15.263 18.9314L14.9631 18.244ZM18.0914 15.6309L17.4669 15.2156L18.0914 15.6309ZM4.75 11.8041H5.5C5.5 15.2664 8.39065 18.1081 12 18.1081V18.8581V19.6081C7.60123 19.6081 4 16.1334 4 11.8041H4.75ZM19.25 11.8041H18.5C18.5 8.34166 15.6094 5.5 12 5.5V4.75V4C16.3988 4 20 7.47476 20 11.8041H19.25ZM12 4.75V5.5C8.39065 5.5 5.5 8.34166 5.5 11.8041H4.75H4C4 7.47476 7.60123 4 12 4V4.75ZM18.0914 15.6309L17.4669 15.2156C18.1213 14.2315 18.5 13.0612 18.5 11.8041H19.25H20C20 13.3681 19.5276 14.8257 18.716 16.0462L18.0914 15.6309ZM18.8875 19.25L18.1638 19.4467L17.2953 16.2517L18.019 16.055L18.7428 15.8583L19.6112 19.0533L18.8875 19.25ZM12 18.8581V18.1081C12.9509 18.1081 13.8518 17.9105 14.6632 17.5565L14.9631 18.244L15.263 18.9314C14.2652 19.3667 13.1603 19.6081 12 19.6081V18.8581ZM15.3144 18.2188L15.5224 17.4982L19.0955 18.5294L18.8875 19.25L18.6795 19.9706L15.1064 18.9394L15.3144 18.2188ZM14.9631 18.244L14.6632 17.5565C14.925 17.4423 15.2286 17.4134 15.5224 17.4982L15.3144 18.2188L15.1064 18.9394C15.1677 18.957 15.223 18.9489 15.263 18.9314L14.9631 18.244ZM18.0914 15.6309L18.716 16.0462C18.7451 16.0024 18.7636 15.9351 18.7428 15.8583L18.019 16.055L17.2953 16.2517C17.1957 15.8853 17.2716 15.5093 17.4669 15.2156L18.0914 15.6309Z',
            fill: 'currentColor',
        },
    ],
    circles: [
        { cx: '15', cy: '11.75', r: '1', fill: 'currentColor' },
        { cx: '12', cy: '11.75', r: '1', fill: 'currentColor' },
        { cx: '9', cy: '11.75', r: '1', fill: 'currentColor' },
    ],
};
// チェックマーク（24x24）
const ICON_CHECKMARK = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M16.25 8.75L10 15.25L7.25 12.25',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
    ],
    defs: '<clipPath id="clip0_2_45"><rect width="24" height="24" fill="white" /></clipPath>',
};
// 大きいチェックマーク
const ICON_CHECKMARK_LARGE = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M17.5962 7.75L9.42308 16.25L6.15385 12.6538',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
    ],
    defs: '<clipPath id="clip0_2_37"><rect width="24" height="24" fill="white" /></clipPath>',
};
// 丸付きチェックマーク
const ICON_CHECKMARK_CIRCLE = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
        {
            d: 'M15 10L11 14.25L9.25 12.25',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
    ],
    defs: '<clipPath id="clip0_checkmark_circle"><rect width="24" height="24" fill="white" /></clipPath>',
};
// Xマーク/閉じるアイコン
const ICON_XMARK = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M16.25 16.25L7.75 7.75',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
        {
            d: 'M7.75 16.25L16.25 7.75',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
    ],
    defs: '<clipPath id="clip0_2_53"><rect width="24" height="24" fill="white" /></clipPath>',
};
// Xマーク大（大きいバリアント）
const ICON_XMARK_LARGE = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M16.7198 6.21973C17.0127 5.92683 17.4874 5.92683 17.7803 6.21973C18.0732 6.51262 18.0732 6.9874 17.7803 7.28027L13.0606 12L17.7803 16.7197C18.0732 17.0126 18.0732 17.4874 17.7803 17.7803C17.4875 18.0731 17.0127 18.0731 16.7198 17.7803L12.0001 13.0605L7.28033 17.7803C6.98746 18.0731 6.51268 18.0731 6.21979 17.7803C5.92689 17.4874 5.92689 17.0126 6.21979 16.7197L10.9395 12L6.21979 7.28027C5.92689 6.98738 5.92689 6.51262 6.21979 6.21973C6.51268 5.92683 6.98744 5.92683 7.28033 6.21973L12.0001 10.9395L16.7198 6.21973Z',
            fill: 'currentColor',
        },
    ],
};
// 太陽アイコン（ライトモード）
const ICON_SUN = {
    viewBox: '0 0 20 20',
    paths: [
        { d: 'M9.99999 12.7082C11.4958 12.7082 12.7083 11.4956 12.7083 9.99984C12.7083 8.50407 11.4958 7.2915 9.99999 7.2915C8.50422 7.2915 7.29166 8.50407 7.29166 9.99984C7.29166 11.4956 8.50422 12.7082 9.99999 12.7082Z', stroke: 'currentColor', strokeWidth: '1.25', strokeLinecap: 'round', strokeLinejoin: 'round' },
        { d: 'M10 3.9585V5.05698', stroke: 'currentColor', strokeWidth: '1.25', strokeLinecap: 'round', strokeLinejoin: 'round' },
        { d: 'M10 14.9429V16.0414', stroke: 'currentColor', strokeWidth: '1.25', strokeLinecap: 'round', strokeLinejoin: 'round' },
        { d: 'M5.7269 5.72656L6.50682 6.50649', stroke: 'currentColor', strokeWidth: '1.25', strokeLinecap: 'round', strokeLinejoin: 'round' },
        { d: 'M13.4932 13.4932L14.2731 14.2731', stroke: 'currentColor', strokeWidth: '1.25', strokeLinecap: 'round', strokeLinejoin: 'round' },
        { d: 'M3.95834 10H5.05683', stroke: 'currentColor', strokeWidth: '1.25', strokeLinecap: 'round', strokeLinejoin: 'round' },
        { d: 'M14.9432 10H16.0417', stroke: 'currentColor', strokeWidth: '1.25', strokeLinecap: 'round', strokeLinejoin: 'round' },
        { d: 'M5.7269 14.2731L6.50682 13.4932', stroke: 'currentColor', strokeWidth: '1.25', strokeLinecap: 'round', strokeLinejoin: 'round' },
        { d: 'M13.4932 6.50649L14.2731 5.72656', stroke: 'currentColor', strokeWidth: '1.25', strokeLinecap: 'round', strokeLinejoin: 'round' },
    ],
};
// 月アイコン（ダークモード）
const ICON_MOON = {
    viewBox: '0 0 20 20',
    paths: [
        {
            d: 'M15.5 10.4955C15.4037 11.5379 15.0124 12.5314 14.3721 13.3596C13.7317 14.1878 12.8688 14.8165 11.8841 15.1722C10.8995 15.5278 9.83397 15.5957 8.81217 15.3679C7.79038 15.1401 6.8546 14.6259 6.11434 13.8857C5.37408 13.1454 4.85995 12.2096 4.63211 11.1878C4.40427 10.166 4.47215 9.10048 4.82781 8.11585C5.18346 7.13123 5.81218 6.26825 6.64039 5.62791C7.4686 4.98756 8.46206 4.59634 9.5045 4.5C8.89418 5.32569 8.60049 6.34302 8.67685 7.36695C8.75321 8.39087 9.19454 9.35339 9.92058 10.0794C10.6466 10.8055 11.6091 11.2468 12.6331 11.3231C13.657 11.3995 14.6743 11.1058 15.5 10.4955Z',
            stroke: 'currentColor',
            strokeWidth: '1.13793',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
    ],
};
// 編集/ペンシルアイコン（マーカーホバー用）
const ICON_EDIT = {
    viewBox: '0 0 16 16',
    paths: [
        {
            d: 'M11.3799 6.9572L9.05645 4.63375M11.3799 6.9572L6.74949 11.5699C6.61925 11.6996 6.45577 11.791 6.277 11.8339L4.29549 12.3092C3.93194 12.3964 3.60478 12.0683 3.69297 11.705L4.16585 9.75693C4.20893 9.57947 4.29978 9.4172 4.42854 9.28771L9.05645 4.63375M11.3799 6.9572L12.3455 5.98759C12.9839 5.34655 12.9839 4.31002 12.3455 3.66897C11.7033 3.02415 10.6594 3.02415 10.0172 3.66897L9.06126 4.62892L9.05645 4.63375',
            stroke: 'currentColor',
            strokeWidth: '0.9',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
    ],
};
// ゴミ箱アイコン（削除ボタン用）
const ICON_TRASH = {
    viewBox: '0 0 24 24',
    paths: [
        {
            d: 'M13.5 4C14.7426 4 15.75 5.00736 15.75 6.25V7H18.5C18.9142 7 19.25 7.33579 19.25 7.75C19.25 8.16421 18.9142 8.5 18.5 8.5H17.9678L17.6328 16.2217C17.61 16.7475 17.5912 17.1861 17.5469 17.543C17.5015 17.9087 17.4225 18.2506 17.2461 18.5723C16.9747 19.0671 16.5579 19.4671 16.0518 19.7168C15.7227 19.8791 15.3772 19.9422 15.0098 19.9717C14.6514 20.0004 14.2126 20 13.6865 20H10.3135C9.78735 20 9.34856 20.0004 8.99023 19.9717C8.62278 19.9422 8.27729 19.8791 7.94824 19.7168C7.44205 19.4671 7.02532 19.0671 6.75391 18.5723C6.57751 18.2506 6.49853 17.9087 6.45312 17.543C6.40883 17.1861 6.39005 16.7475 6.36719 16.2217L6.03223 8.5H5.5C5.08579 8.5 4.75 8.16421 4.75 7.75C4.75 7.33579 5.08579 7 5.5 7H8.25V6.25C8.25 5.00736 9.25736 4 10.5 4H13.5ZM7.86621 16.1562C7.89013 16.7063 7.90624 17.0751 7.94141 17.3584C7.97545 17.6326 8.02151 17.7644 8.06934 17.8516C8.19271 18.0763 8.38239 18.2577 8.6123 18.3711C8.70153 18.4151 8.83504 18.4545 9.11035 18.4766C9.39482 18.4994 9.76335 18.5 10.3135 18.5H13.6865C14.2367 18.5 14.6052 18.4994 14.8896 18.4766C15.165 18.4545 15.2985 18.4151 15.3877 18.3711C15.6176 18.2577 15.8073 18.0763 15.9307 17.8516C15.9785 17.7644 16.0245 17.6326 16.0586 17.3584C16.0938 17.0751 16.1099 16.7063 16.1338 16.1562L16.4668 8.5H7.5332L7.86621 16.1562ZM9.97656 10.75C10.3906 10.7371 10.7371 11.0626 10.75 11.4766L10.875 15.4766C10.8879 15.8906 10.5624 16.2371 10.1484 16.25C9.73443 16.2629 9.38794 15.9374 9.375 15.5234L9.25 11.5234C9.23706 11.1094 9.56255 10.7629 9.97656 10.75ZM14.0244 10.75C14.4383 10.7635 14.7635 11.1105 14.75 11.5244L14.6201 15.5244C14.6066 15.9384 14.2596 16.2634 13.8457 16.25C13.4317 16.2365 13.1067 15.8896 13.1201 15.4756L13.251 11.4756C13.2645 11.0617 13.6105 10.7366 14.0244 10.75ZM10.5 5.5C10.0858 5.5 9.75 5.83579 9.75 6.25V7H14.25V6.25C14.25 5.83579 13.9142 5.5 13.5 5.5H10.5Z',
            fill: 'currentColor',
        },
    ],
};
// シェブロン左
const ICON_CHEVRON_LEFT = {
    viewBox: '0 0 16 16',
    paths: [
        {
            d: 'M8.5 3.5L4 8L8.5 12.5',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
    ],
};
// シェブロン右
const ICON_CHEVRON_RIGHT = {
    viewBox: '0 0 16 16',
    paths: [
        {
            d: 'M8.5 11.5L12 8L8.5 4.5',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        },
    ],
};
// =============================================================================
// アニメーション付きアイコン
// =============================================================================
// アニメーション付きチェックマーク（描画+バウンスエフェクト）
const ICON_CHECK_SMALL_ANIMATED = {
    viewBox: '0 0 14 14',
    cssAnimations: `
    @keyframes checkDraw {
      0% { stroke-dashoffset: 12; }
      100% { stroke-dashoffset: 0; }
    }
    @keyframes checkBounce {
      0% { transform: scale(0.5); opacity: 0; }
      50% { transform: scale(1.12); opacity: 1; }
      75% { transform: scale(0.95); }
      100% { transform: scale(1); }
    }
    .check-path-animated {
      stroke-dasharray: 12;
      stroke-dashoffset: 0;
      transform-origin: center;
      animation: checkDraw 0.18s ease-out, checkBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
  `,
    paths: [
        {
            d: 'M3.9375 7L6.125 9.1875L10.5 4.8125',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            className: 'check-path-animated',
        },
    ],
};
// アニメーション付きコピー/チェックマークアイコン
const ICON_COPY_ANIMATED = {
    viewBox: '0 0 24 24',
    cssAnimations: `
    .copy-icon, .check-icon {
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
  `,
    // デフォルト表示: コピーアイコン
    paths: [
        {
            d: 'M4.75 11.25C4.75 10.4216 5.42157 9.75 6.25 9.75H12.75C13.5784 9.75 14.25 10.4216 14.25 11.25V17.75C14.25 18.5784 13.5784 19.25 12.75 19.25H6.25C5.42157 19.25 4.75 18.5784 4.75 17.75V11.25Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            className: 'copy-icon',
        },
        {
            d: 'M17.25 14.25H17.75C18.5784 14.25 19.25 13.5784 19.25 12.75V6.25C19.25 5.42157 18.5784 4.75 17.75 4.75H11.25C10.4216 4.75 9.75 5.42157 9.75 6.25V6.75',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            className: 'copy-icon',
        },
    ],
    variants: {
        copy: {
            paths: [
                {
                    d: 'M4.75 11.25C4.75 10.4216 5.42157 9.75 6.25 9.75H12.75C13.5784 9.75 14.25 10.4216 14.25 11.25V17.75C14.25 18.5784 13.5784 19.25 12.75 19.25H6.25C5.42157 19.25 4.75 18.5784 4.75 17.75V11.25Z',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    className: 'copy-icon',
                },
                {
                    d: 'M17.25 14.25H17.75C18.5784 14.25 19.25 13.5784 19.25 12.75V6.25C19.25 5.42157 18.5784 4.75 17.75 4.75H11.25C10.4216 4.75 9.75 5.42157 9.75 6.25V6.75',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    className: 'copy-icon',
                },
            ],
        },
        check: {
            paths: [
                {
                    d: 'M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z',
                    stroke: '#22c55e',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    className: 'check-icon',
                },
                {
                    d: 'M15 10L11 14.25L9.25 12.25',
                    stroke: '#22c55e',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    className: 'check-icon',
                },
            ],
        },
    },
};
// アニメーション付き送信矢印アイコン（紙飛行機スタイル、チェック/エラー切り替え）
const ICON_SEND_ARROW = {
    viewBox: '0 0 24 24',
    cssAnimations: `
    .send-arrow-icon, .send-check-icon, .send-error-icon {
      transition: opacity 0.15s ease, transform 0.15s ease;
    }
  `,
    // デフォルト表示: 送信矢印
    paths: [
        {
            d: 'M9.875 14.125L12.3506 19.6951C12.7184 20.5227 13.9091 20.4741 14.2083 19.6193L18.8139 6.46032C19.0907 5.6695 18.3305 4.90933 17.5397 5.18611L4.38072 9.79174C3.52589 10.0909 3.47731 11.2816 4.30494 11.6494L9.875 14.125ZM9.875 14.125L13.375 10.625',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            className: 'send-arrow-icon',
        },
    ],
    variants: {
        idle: {
            paths: [
                {
                    d: 'M9.875 14.125L12.3506 19.6951C12.7184 20.5227 13.9091 20.4741 14.2083 19.6193L18.8139 6.46032C19.0907 5.6695 18.3305 4.90933 17.5397 5.18611L4.38072 9.79174C3.52589 10.0909 3.47731 11.2816 4.30494 11.6494L9.875 14.125ZM9.875 14.125L13.375 10.625',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    className: 'send-arrow-icon',
                },
            ],
        },
        sent: {
            paths: [
                {
                    d: 'M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z',
                    stroke: '#22c55e',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    className: 'send-check-icon',
                },
                {
                    d: 'M15 10L11 14.25L9.25 12.25',
                    stroke: '#22c55e',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    className: 'send-check-icon',
                },
            ],
        },
        failed: {
            paths: [
                {
                    d: 'M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z',
                    stroke: '#ef4444',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    className: 'send-error-icon',
                },
                {
                    d: 'M12 8V12',
                    stroke: '#ef4444',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    className: 'send-error-icon',
                },
            ],
            circles: [
                { cx: '12', cy: '15', r: '0.5', fill: '#ef4444', stroke: '#ef4444', strokeWidth: '1' },
            ],
        },
    },
};
// アニメーション付き送信アイコン（「エージェントに送信」ボタン用）
const ICON_SEND_ANIMATED = {
    viewBox: '0 0 22 21',
    cssAnimations: `
    .send-icon, .sent-icon {
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
  `,
    // デフォルト表示: 送信アイコン
    paths: [
        {
            d: 'M9.5 5H6.5C4.84315 5 3.5 6.34315 3.5 8V15C3.5 16.6569 4.84315 18 6.5 18H13.5C15.1569 18 16.5 16.6569 16.5 15V12',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            className: 'send-icon',
        },
        {
            d: 'M13.5 8.5L18.5 3.5M18.5 3.5L14.4524 3.5M18.5 3.5L18.5 7.54762',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            className: 'send-icon',
        },
        {
            d: 'M7.5 13.75H12.5',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            className: 'send-icon',
        },
        {
            d: 'M7.5 10.75H10.5',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            className: 'send-icon',
        },
    ],
    variants: {
        send: {
            paths: [
                {
                    d: 'M9.5 5H6.5C4.84315 5 3.5 6.34315 3.5 8V15C3.5 16.6569 4.84315 18 6.5 18H13.5C15.1569 18 16.5 16.6569 16.5 15V12',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    className: 'send-icon',
                },
                {
                    d: 'M13.5 8.5L18.5 3.5M18.5 3.5L14.4524 3.5M18.5 3.5L18.5 7.54762',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    className: 'send-icon',
                },
                {
                    d: 'M7.5 13.75H12.5',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    className: 'send-icon',
                },
                {
                    d: 'M7.5 10.75H10.5',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    className: 'send-icon',
                },
            ],
        },
        sent: {
            paths: [
                {
                    d: 'M11 19C6.58172 19 3 15.4182 3 11C3 6.58172 6.58172 3 11 3C15.4182 3 19 6.58172 19 11C19 15.4182 15.4182 19 11 19Z',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    className: 'sent-icon',
                },
                {
                    d: 'M14 9L10 13.25L8.25 11.25',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    className: 'sent-icon',
                },
            ],
        },
    },
};
// アニメーション付き目アイコン（開閉状態の切り替え）
const ICON_EYE_ANIMATED = {
    viewBox: '0 0 24 24',
    cssAnimations: `
    .eye-open, .eye-closed {
      transition: opacity 0.2s ease;
    }
  `,
    // デフォルト表示: 目を開いた状態
    paths: [
        {
            d: 'M3.91752 12.7539C3.65127 12.2996 3.65037 11.7515 3.9149 11.2962C4.9042 9.59346 7.72688 5.49994 12 5.49994C16.2731 5.49994 19.0958 9.59346 20.0851 11.2962C20.3496 11.7515 20.3487 12.2996 20.0825 12.7539C19.0908 14.4459 16.2694 18.4999 12 18.4999C7.73064 18.4999 4.90918 14.4459 3.91752 12.7539Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            className: 'eye-open',
        },
        {
            d: 'M12 14.8261C13.5608 14.8261 14.8261 13.5608 14.8261 12C14.8261 10.4392 13.5608 9.17392 12 9.17392C10.4392 9.17392 9.17391 10.4392 9.17391 12C9.17391 13.5608 10.4392 14.8261 12 14.8261Z',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            className: 'eye-open',
        },
    ],
    variants: {
        open: {
            paths: [
                {
                    d: 'M3.91752 12.7539C3.65127 12.2996 3.65037 11.7515 3.9149 11.2962C4.9042 9.59346 7.72688 5.49994 12 5.49994C16.2731 5.49994 19.0958 9.59346 20.0851 11.2962C20.3496 11.7515 20.3487 12.2996 20.0825 12.7539C19.0908 14.4459 16.2694 18.4999 12 18.4999C7.73064 18.4999 4.90918 14.4459 3.91752 12.7539Z',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    className: 'eye-open',
                },
                {
                    d: 'M12 14.8261C13.5608 14.8261 14.8261 13.5608 14.8261 12C14.8261 10.4392 13.5608 9.17392 12 9.17392C10.4392 9.17392 9.17391 10.4392 9.17391 12C9.17391 13.5608 10.4392 14.8261 12 14.8261Z',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    className: 'eye-open',
                },
            ],
        },
        closed: {
            paths: [
                {
                    d: 'M18.6025 9.28503C18.9174 8.9701 19.4364 8.99481 19.7015 9.35271C20.1484 9.95606 20.4943 10.507 20.7342 10.9199C21.134 11.6086 21.1329 12.4454 20.7303 13.1328C20.2144 14.013 19.2151 15.5225 17.7723 16.8193C16.3293 18.1162 14.3852 19.2497 12.0008 19.25C11.4192 19.25 10.8638 19.1823 10.3355 19.0613C9.77966 18.934 9.63498 18.2525 10.0382 17.8493C10.2412 17.6463 10.5374 17.573 10.8188 17.6302C11.1993 17.7076 11.5935 17.75 12.0008 17.75C13.8848 17.7497 15.4867 16.8568 16.7693 15.7041C18.0522 14.5511 18.9606 13.1867 19.4363 12.375C19.5656 12.1543 19.5659 11.8943 19.4373 11.6729C19.2235 11.3049 18.921 10.8242 18.5364 10.3003C18.3085 9.98991 18.3302 9.5573 18.6025 9.28503ZM12.0008 4.75C12.5814 4.75006 13.1358 4.81803 13.6632 4.93953C14.2182 5.06741 14.362 5.74812 13.9593 6.15091C13.7558 6.35435 13.4589 6.42748 13.1771 6.36984C12.7983 6.29239 12.4061 6.25006 12.0008 6.25C10.1167 6.25 8.51415 7.15145 7.23028 8.31543C5.94678 9.47919 5.03918 10.8555 4.56426 11.6729C4.43551 11.8945 4.43582 12.1542 4.56524 12.375C4.77587 12.7343 5.07189 13.2012 5.44718 13.7105C5.67623 14.0213 5.65493 14.4552 5.38193 14.7282C5.0671 15.0431 4.54833 15.0189 4.28292 14.6614C3.84652 14.0736 3.50813 13.5369 3.27129 13.1328C2.86831 12.4451 2.86717 11.6088 3.26739 10.9199C3.78185 10.0345 4.77959 8.51239 6.22247 7.2041C7.66547 5.89584 9.61202 4.75 12.0008 4.75Z',
                    fill: 'currentColor',
                    className: 'eye-closed',
                },
                {
                    d: 'M5 19L19 5',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    className: 'eye-closed',
                },
            ],
        },
    },
};
// アニメーション付き一時停止/再生アイコン
const ICON_PAUSE_PLAY_ANIMATED = {
    viewBox: '0 0 24 24',
    cssAnimations: `
    .pause-bar, .play-triangle {
      transition: opacity 0.15s ease;
    }
  `,
    // デフォルト表示: 一時停止（2本のバー）
    paths: [
        {
            d: 'M8 6L8 18',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            className: 'pause-bar',
        },
        {
            d: 'M16 18L16 6',
            stroke: 'currentColor',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            className: 'pause-bar',
        },
    ],
    variants: {
        pause: {
            paths: [
                {
                    d: 'M8 6L8 18',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    className: 'pause-bar',
                },
                {
                    d: 'M16 18L16 6',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    className: 'pause-bar',
                },
            ],
        },
        play: {
            paths: [
                {
                    d: 'M17.75 10.701C18.75 11.2783 18.75 12.7217 17.75 13.299L8.75 18.4952C7.75 19.0725 6.5 18.3509 6.5 17.1962L6.5 6.80384C6.5 5.64914 7.75 4.92746 8.75 5.50481L17.75 10.701Z',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    className: 'play-triangle',
                },
            ],
        },
    },
};
// アニメーション付きバニーマスコット
const ICON_ANIMATED_BUNNY = {
    viewBox: '0 0 28 28',
    cssAnimations: `
    @keyframes bunnyEnterEar {
      0% { opacity: 0; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes bunnyEnterFace {
      0% { opacity: 0; transform: scale(0.9); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes bunnyEnterEye {
      0% { opacity: 0; transform: scale(0.5); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes leftEyeLook {
      0%, 8% { transform: translate(0, 0); }
      10%, 18% { transform: translate(1.5px, 0); }
      20%, 22% { transform: translate(1.5px, 0) scaleY(0.1); }
      24%, 32% { transform: translate(1.5px, 0); }
      35%, 48% { transform: translate(-0.8px, -0.6px); }
      52%, 54% { transform: translate(0, 0) scaleY(0.1); }
      56%, 68% { transform: translate(0, 0); }
      72%, 82% { transform: translate(-0.5px, 0.5px); }
      85%, 100% { transform: translate(0, 0); }
    }
    @keyframes rightEyeLook {
      0%, 8% { transform: translate(0, 0); }
      10%, 18% { transform: translate(0.8px, 0); }
      20%, 22% { transform: translate(0.8px, 0) scaleY(0.1); }
      24%, 32% { transform: translate(0.8px, 0); }
      35%, 48% { transform: translate(-1.5px, -0.6px); }
      52%, 54% { transform: translate(0, 0) scaleY(0.1); }
      56%, 68% { transform: translate(0, 0); }
      72%, 82% { transform: translate(-1.2px, 0.5px); }
      85%, 100% { transform: translate(0, 0); }
    }
    @keyframes leftEarTwitch {
      0%, 9% { transform: rotate(0deg); }
      12% { transform: rotate(-8deg); }
      16%, 34% { transform: rotate(0deg); }
      38% { transform: rotate(-12deg); }
      42% { transform: rotate(-6deg); }
      48%, 100% { transform: rotate(0deg); }
    }
    @keyframes rightEarTwitch {
      0%, 9% { transform: rotate(0deg); }
      12% { transform: rotate(6deg); }
      16%, 34% { transform: rotate(0deg); }
      38% { transform: rotate(10deg); }
      42% { transform: rotate(4deg); }
      48%, 71% { transform: rotate(0deg); }
      74% { transform: rotate(8deg); }
      78%, 100% { transform: rotate(0deg); }
    }
    .bunny-eye-left {
      opacity: 0;
      animation: bunnyEnterEye 0.3s ease-out 0.35s forwards, leftEyeLook 5s ease-in-out 0.65s infinite;
      transform-origin: center;
      transform-box: fill-box;
    }
    .bunny-eye-right {
      opacity: 0;
      animation: bunnyEnterEye 0.3s ease-out 0.4s forwards, rightEyeLook 5s ease-in-out 0.7s infinite;
      transform-origin: center;
      transform-box: fill-box;
    }
    .bunny-ear-left {
      opacity: 0;
      animation: bunnyEnterEar 0.3s ease-out 0.1s forwards, leftEarTwitch 5s ease-in-out 0.4s infinite;
      transform-origin: bottom center;
      transform-box: fill-box;
    }
    .bunny-ear-right {
      opacity: 0;
      animation: bunnyEnterEar 0.3s ease-out 0.15s forwards, rightEarTwitch 5s ease-in-out 0.45s infinite;
      transform-origin: bottom center;
      transform-box: fill-box;
    }
    .bunny-face {
      opacity: 0;
      animation: bunnyEnterFace 0.3s ease-out 0.25s forwards;
      transform-origin: center;
      transform-box: fill-box;
    }
    svg:hover .bunny-eye-left,
    svg:hover .bunny-eye-right {
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .bunny-happy-face {
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    svg:hover .bunny-happy-face {
      opacity: 1;
    }
  `,
    paths: [
        // 左耳
        {
            d: 'M3.738 10.2164L7.224 2.007H9.167L5.676 10.2164H3.738ZM10.791 6.42705C10.791 5.90346 10.726 5.42764 10.596 4.99959C10.47 4.57155 10.292 4.16643 10.063 3.78425C9.833 3.39825 9.56 3.01797 9.243 2.64343C8.926 2.26507 8.767 2.07589 8.767 2.07589L10.24 0.957996C10.24 0.957996 10.433 1.17203 10.819 1.60007C11.209 2.0243 11.559 2.49056 11.869 2.99886C12.178 3.50717 12.413 4.04222 12.574 4.60403C12.734 5.16584 12.814 5.77352 12.814 6.42705C12.814 7.10734 12.73 7.7303 12.562 8.29593C12.394 8.85774 12.153 9.3966 11.84 9.9126C11.526 10.4247 11.181 10.8833 10.802 11.2884C10.428 11.6974 10.24 11.9018 10.24 11.9018L8.767 10.7839C8.767 10.7839 8.924 10.5948 9.237 10.2164C9.554 9.8419 9.83 9.4597 10.063 9.06985C10.3 8.6762 10.479 8.26726 10.602 7.84304C10.728 7.41499 10.791 6.943 10.791 6.42705Z',
            fill: 'currentColor',
            className: 'bunny-ear-left',
        },
        // 右耳
        {
            d: 'M15.003 10.2164L18.489 2.007H20.432L16.941 10.2164H15.003ZM22.056 6.42705C22.056 5.90346 21.991 5.42764 21.861 4.99959C21.735 4.57155 21.557 4.16643 21.328 3.78425C21.098 3.39825 20.825 3.01797 20.508 2.64343C20.191 2.26507 20.032 2.07589 20.032 2.07589L21.505 0.957996C21.505 0.957996 21.698 1.17203 22.084 1.60007C22.474 2.0243 22.824 2.49056 23.133 2.99886C23.443 3.50717 23.678 4.04222 23.839 4.60403C23.999 5.16584 24.079 5.77352 24.079 6.42705C24.079 7.10734 23.995 7.7303 23.827 8.29593C23.659 8.85774 23.418 9.3966 23.105 9.9126C22.791 10.4247 22.445 10.8833 22.067 11.2884C21.693 11.6974 21.505 11.9018 21.505 11.9018L20.032 10.7839C20.032 10.7839 20.189 10.5948 20.502 10.2164C20.819 9.8419 21.094 9.4597 21.328 9.06985C21.565 8.6762 21.744 8.26726 21.866 7.84304C21.993 7.41499 22.056 6.943 22.056 6.42705Z',
            fill: 'currentColor',
            className: 'bunny-ear-right',
        },
        // 顔の輪郭
        {
            d: 'M2.03 20.4328C2.03 20.9564 2.093 21.4322 2.219 21.8602C2.345 22.2883 2.523 22.6953 2.752 23.0813C2.981 23.4635 3.254 23.8419 3.572 24.2164C3.889 24.5948 4.047 24.7839 4.047 24.7839L2.574 25.9018C2.574 25.9018 2.379 25.6878 1.989 25.2598C1.603 24.8355 1.256 24.3693 0.946 23.861C0.636 23.3527 0.401 22.8176 0.241 22.2558C0.08 21.694 0 21.0863 0 20.4328C0 19.7525 0.084 19.1314 0.252 18.5696C0.421 18.004 0.661 17.4651 0.975 16.953C1.288 16.4371 1.632 15.9765 2.007 15.5714C2.385 15.1625 2.574 14.958 2.574 14.958L4.047 16.0759C4.047 16.0759 3.889 16.2651 3.572 16.6434C3.258 17.018 2.983 17.4021 2.746 17.7957C2.513 18.1855 2.335 18.5945 2.213 19.0225C2.091 19.4467 2.03 19.9168 2.03 20.4328ZM23.687 20.4271C23.687 19.9035 23.622 19.4276 23.492 18.9996C23.366 18.5715 23.188 18.1664 22.959 17.7843C22.729 17.3982 22.456 17.018 22.139 16.6434C21.822 16.2651 21.663 16.0759 21.663 16.0759L23.136 14.958C23.136 14.958 23.329 15.172 23.715 15.6001C24.105 16.0243 24.455 16.4906 24.765 16.9989C25.074 17.5072 25.309 18.0422 25.47 18.604C25.63 19.1658 25.71 19.7735 25.71 20.4271C25.71 21.1073 25.626 21.7303 25.458 22.2959C25.29 22.8577 25.049 23.3966 24.736 23.9126C24.422 24.4247 24.077 24.8833 23.698 25.2884C23.324 25.6974 23.136 25.9018 23.136 25.9018L21.663 24.7839C21.663 24.7839 21.82 24.5948 22.133 24.2164C22.45 23.8419 22.726 23.4597 22.959 23.0698C23.196 22.6762 23.375 22.2673 23.498 21.843C23.624 21.415 23.687 20.943 23.687 20.4271Z',
            fill: 'currentColor',
            className: 'bunny-face',
        },
    ],
    circles: [
        // 左目
        { cx: '8.277', cy: '20.466', r: '1.8', fill: 'currentColor', className: 'bunny-eye-left' },
        // 右目
        { cx: '19.878', cy: '20.466', r: '1.8', fill: 'currentColor', className: 'bunny-eye-right' },
    ],
    rects: [
        // ホバー領域（透明）
        { width: '28', height: '28', fill: 'transparent' },
    ],
    texts: [
        // ホバー時のハッピーフェイス
        {
            x: '14',
            y: '26',
            textAnchor: 'middle',
            fontSize: '12',
            fontWeight: 'bold',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            className: 'bunny-happy-face',
            content: '\u02C3 \u1D55 \u02C2', // ˃ ᵕ ˂
        },
    ],
};

// =============================================================================
// マーカーコンポーネント
// =============================================================================
//
// アノテーション位置に表示される番号バッジ。
// クリック動作（編集/削除）とホバーエフェクトをサポート。
//
class MarkerComponent {
    /** アノテーションID */
    annotationId;
    /** マーカー番号（1から開始） */
    number;
    /** X座標（ビューポート幅の%） */
    x;
    /** Y座標（px - ドキュメント上部からの絶対位置） */
    y;
    /** スクロールY値 */
    scrollY = 0;
    /** fixed配置かどうか */
    isFixed = false;
    /** アクセントカラー */
    accentColor = '#3c82f7';
    /** 退場アニメーション中か */
    isExiting = false;
    /** ホバー中か */
    isHovered = false;
    /** 番号変更アニメーション */
    isRenumbering = false;
    /** クリック動作モード */
    clickBehavior = 'edit';
    /** マーカークリック */
    markerClick = new EventEmitter();
    /** マーカーホバー開始 */
    markerHoverStart = new EventEmitter();
    /** マーカーホバー終了 */
    markerHoverEnd = new EventEmitter();
    // アイコンデータ
    closeIcon = ICON_CLOSE;
    editIcon = ICON_EDIT;
    /** マーカーの表示位置（top） */
    get topPosition() {
        return this.isFixed ? this.y : this.y - this.scrollY;
    }
    /** マーカーのスタイル */
    get markerStyle() {
        return {
            position: 'fixed',
            left: `${this.x}%`,
            top: `${this.topPosition}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: '100002',
        };
    }
    /** マーカーのCSSクラス */
    get markerClass() {
        const classes = ['agentation-marker'];
        if (this.isExiting)
            classes.push('agentation-marker--exiting');
        if (this.isHovered)
            classes.push('agentation-marker--hovered');
        if (this.isRenumbering)
            classes.push('agentation-marker--renumbering');
        return classes.join(' ');
    }
    onClick(event) {
        event.stopPropagation();
        event.preventDefault();
        this.markerClick.emit(this.annotationId);
    }
    onMouseEnter() {
        this.markerHoverStart.emit(this.annotationId);
    }
    onMouseLeave() {
        this.markerHoverEnd.emit(this.annotationId);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: MarkerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.18", type: MarkerComponent, isStandalone: true, selector: "agentation-marker", inputs: { annotationId: "annotationId", number: "number", x: "x", y: "y", scrollY: "scrollY", isFixed: "isFixed", accentColor: "accentColor", isExiting: "isExiting", isHovered: "isHovered", isRenumbering: "isRenumbering", clickBehavior: "clickBehavior" }, outputs: { markerClick: "markerClick", markerHoverStart: "markerHoverStart", markerHoverEnd: "markerHoverEnd" }, ngImport: i0, template: "<div\n  [class]=\"markerClass\"\n  [ngStyle]=\"markerStyle\"\n  [style.--accent-color]=\"accentColor\"\n  data-feedback-toolbar\n  (click)=\"onClick($event)\"\n  (mouseenter)=\"onMouseEnter()\"\n  (mouseleave)=\"onMouseLeave()\"\n>\n  <div class=\"agentation-marker__badge\">\n    {{ number }}\n  </div>\n  @if (isHovered) {\n    <div class=\"agentation-marker__action\">\n      @if (clickBehavior === 'delete') {\n        <agentation-icon [data]=\"closeIcon\" [size]=\"10\" />\n      } @else {\n        <agentation-icon [data]=\"editIcon\" [size]=\"10\" />\n      }\n    </div>\n  }\n</div>\n", styles: ["@keyframes markerIn{0%{opacity:0;transform:translate(-50%,-50%) scale(.3)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}@keyframes markerOut{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(-50%,-50%) scale(.3)}}@keyframes renumberRoll{0%{transform:translate(-40%);opacity:0}to{transform:translate(0);opacity:1}}.agentation-marker{position:fixed;width:22px;height:22px;background:var(--accent-color, #3c82f7);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;transform:translate(-50%,-50%) scale(1);opacity:1;cursor:pointer;box-shadow:0 2px 6px #0003,inset 0 0 0 1px #0000000a;-webkit-user-select:none;user-select:none;will-change:transform,opacity;contain:layout style;z-index:1;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.agentation-marker:hover{z-index:2}.agentation-marker:not(.agentation-marker--enter):not(.agentation-marker--exiting):not(.agentation-marker--clearing){transition:background-color .15s ease,transform .1s ease}.agentation-marker--enter{animation:markerIn .25s cubic-bezier(.22,1,.36,1) both}.agentation-marker--exiting{animation:markerOut .2s ease-out both;pointer-events:none}.agentation-marker--clearing{animation:markerOut .15s ease-out both;pointer-events:none}.agentation-marker:not(.agentation-marker--enter):not(.agentation-marker--exiting):not(.agentation-marker--clearing):hover{transform:translate(-50%,-50%) scale(1.1)}.agentation-marker--hovered{background:#ff3b30}.agentation-marker--renumbering .agentation-marker__badge{display:block;animation:renumberRoll .2s ease-out}.agentation-marker__badge{display:flex;align-items:center;justify-content:center;line-height:1}.agentation-marker__action{position:absolute;inset:0;border-radius:50%;background:#00000073;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: IconComponent, selector: "agentation-icon", inputs: ["data", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: MarkerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'agentation-marker', standalone: true, imports: [CommonModule, IconComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  [class]=\"markerClass\"\n  [ngStyle]=\"markerStyle\"\n  [style.--accent-color]=\"accentColor\"\n  data-feedback-toolbar\n  (click)=\"onClick($event)\"\n  (mouseenter)=\"onMouseEnter()\"\n  (mouseleave)=\"onMouseLeave()\"\n>\n  <div class=\"agentation-marker__badge\">\n    {{ number }}\n  </div>\n  @if (isHovered) {\n    <div class=\"agentation-marker__action\">\n      @if (clickBehavior === 'delete') {\n        <agentation-icon [data]=\"closeIcon\" [size]=\"10\" />\n      } @else {\n        <agentation-icon [data]=\"editIcon\" [size]=\"10\" />\n      }\n    </div>\n  }\n</div>\n", styles: ["@keyframes markerIn{0%{opacity:0;transform:translate(-50%,-50%) scale(.3)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}@keyframes markerOut{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(-50%,-50%) scale(.3)}}@keyframes renumberRoll{0%{transform:translate(-40%);opacity:0}to{transform:translate(0);opacity:1}}.agentation-marker{position:fixed;width:22px;height:22px;background:var(--accent-color, #3c82f7);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;transform:translate(-50%,-50%) scale(1);opacity:1;cursor:pointer;box-shadow:0 2px 6px #0003,inset 0 0 0 1px #0000000a;-webkit-user-select:none;user-select:none;will-change:transform,opacity;contain:layout style;z-index:1;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.agentation-marker:hover{z-index:2}.agentation-marker:not(.agentation-marker--enter):not(.agentation-marker--exiting):not(.agentation-marker--clearing){transition:background-color .15s ease,transform .1s ease}.agentation-marker--enter{animation:markerIn .25s cubic-bezier(.22,1,.36,1) both}.agentation-marker--exiting{animation:markerOut .2s ease-out both;pointer-events:none}.agentation-marker--clearing{animation:markerOut .15s ease-out both;pointer-events:none}.agentation-marker:not(.agentation-marker--enter):not(.agentation-marker--exiting):not(.agentation-marker--clearing):hover{transform:translate(-50%,-50%) scale(1.1)}.agentation-marker--hovered{background:#ff3b30}.agentation-marker--renumbering .agentation-marker__badge{display:block;animation:renumberRoll .2s ease-out}.agentation-marker__badge{display:flex;align-items:center;justify-content:center;line-height:1}.agentation-marker__action{position:absolute;inset:0;border-radius:50%;background:#00000073;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff}\n"] }]
        }], propDecorators: { annotationId: [{
                type: Input,
                args: [{ required: true }]
            }], number: [{
                type: Input,
                args: [{ required: true }]
            }], x: [{
                type: Input,
                args: [{ required: true }]
            }], y: [{
                type: Input,
                args: [{ required: true }]
            }], scrollY: [{
                type: Input
            }], isFixed: [{
                type: Input
            }], accentColor: [{
                type: Input
            }], isExiting: [{
                type: Input
            }], isHovered: [{
                type: Input
            }], isRenumbering: [{
                type: Input
            }], clickBehavior: [{
                type: Input
            }], markerClick: [{
                type: Output
            }], markerHoverStart: [{
                type: Output
            }], markerHoverEnd: [{
                type: Output
            }] } });

// =============================================================================
// アニメーション凍結
// =============================================================================
//
// setTimeout、setInterval、requestAnimationFrameをモンキーパッチして、
// 凍結中はコールバックをサイレントにスキップする。
// またCSS animations/transitionsを一時停止するCSSを注入し、
// WAAPIアニメーションと動画も一時停止する。
//
// ツールバー/ポップアップコードはパッチをバイパスするために
// `originalSetTimeout`等をインポートする必要がある。
//
// パッチはこのモジュールのインポート時に副作用として適用される。
// =============================================================================
// 除外セレクタ — agentation UI要素は凍結対象外
const EXCLUDE_ATTRS = [
    "data-feedback-toolbar",
    "data-annotation-popup",
    "data-annotation-marker",
];
const NOT_SELECTORS = EXCLUDE_ATTRS
    .flatMap((a) => [`:not([${a}])`, `:not([${a}] *)`])
    .join("");
const STYLE_ID = "feedback-freeze-styles";
const STATE_KEY = "__agentation_freeze";
function getState() {
    if (typeof window === "undefined") {
        // SSRスタブ
        return {
            frozen: false,
            installed: true, // サーバー上でのパッチを防止
            origSetTimeout: setTimeout,
            origSetInterval: setInterval,
            origRAF: (cb) => 0,
            pausedAnimations: [],
            frozenTimeoutQueue: [],
            frozenRAFQueue: [],
        };
    }
    const w = window;
    if (!w[STATE_KEY]) {
        w[STATE_KEY] = {
            frozen: false,
            installed: false,
            origSetTimeout: null,
            origSetInterval: null,
            origRAF: null,
            pausedAnimations: [],
            frozenTimeoutQueue: [],
            frozenRAFQueue: [],
        };
    }
    return w[STATE_KEY];
}
const _s = getState();
// ---------------------------------------------------------------------------
// パッチのインストール（一度のみ — `installed`がウィンドウ上にあるためHMRを生き残る）
// ---------------------------------------------------------------------------
if (typeof window !== "undefined" && !_s.installed) {
    // 実際の関数を保存
    _s.origSetTimeout = window.setTimeout.bind(window);
    _s.origSetInterval = window.setInterval.bind(window);
    _s.origRAF = window.requestAnimationFrame.bind(window);
    // setTimeoutのパッチ — 凍結時はコールバックをキューに入れる（解凍時にリプレイ）
    window['setTimeout'] = (handler, timeout, ...args) => {
        if (typeof handler === "string") {
            return _s.origSetTimeout(handler, timeout);
        }
        return _s.origSetTimeout((...a) => {
            if (_s.frozen) {
                _s.frozenTimeoutQueue.push(() => handler(...a));
            }
            else {
                handler(...a);
            }
        }, timeout, ...args);
    };
    // setIntervalのパッチ — 凍結時はコールバックをスキップ
    window['setInterval'] = (handler, timeout, ...args) => {
        if (typeof handler === "string") {
            return _s.origSetInterval(handler, timeout);
        }
        return _s.origSetInterval((...a) => {
            if (!_s.frozen)
                handler(...a);
        }, timeout, ...args);
    };
    // requestAnimationFrameのパッチ — 凍結時はコールバックをキューに入れる（CPUスピンなし）
    // ラッパーは次のフレームで一度だけ発火し、まだ凍結中ならコールバックは
    // _s.frozenRAFQueueに保存され、解凍時にリプレイされる
    window['requestAnimationFrame'] = (callback) => {
        return _s.origRAF((timestamp) => {
            if (_s.frozen) {
                _s.frozenRAFQueue.push(callback);
            }
            else {
                callback(timestamp);
            }
        });
    };
    _s.installed = true;
}
// ---------------------------------------------------------------------------
// エクスポート — ツールバー/ポップアップ用のオリジナル（パッチなし）タイミング関数
// ---------------------------------------------------------------------------
const originalSetTimeout = _s.origSetTimeout;
const originalSetInterval = _s.origSetInterval;
// ---------------------------------------------------------------------------
// 凍結 / 解凍
// ---------------------------------------------------------------------------
function isAgentationElement(el) {
    if (!el)
        return false;
    return EXCLUDE_ATTRS.some((attr) => !!el.closest?.(`[${attr}]`));
}
function freeze() {
    if (typeof document === "undefined")
        return;
    if (_s.frozen)
        return;
    _s.frozen = true;
    _s.frozenTimeoutQueue = [];
    _s.frozenRAFQueue = [];
    // CSS注入 — CSSアニメーションを一時停止しトランジションを無効化
    let style = document.getElementById(STYLE_ID);
    if (!style) {
        style = document.createElement("style");
        style.id = STYLE_ID;
    }
    style.textContent = `
    *${NOT_SELECTORS},
    *${NOT_SELECTORS}::before,
    *${NOT_SELECTORS}::after {
      animation-play-state: paused !important;
      transition: none !important;
    }
  `;
    document.head.appendChild(style);
    // WAAPI — 実行中の非agentationアニメーションのみ一時停止して参照を保存
    // （完了済みアニメーションを一時停止するとplay()時に再開始してしまい、入口アニメーションが壊れる）
    _s.pausedAnimations = [];
    try {
        document.getAnimations().forEach((anim) => {
            if (anim.playState !== "running")
                return;
            const target = anim.effect?.target;
            if (!isAgentationElement(target)) {
                anim.pause();
                _s.pausedAnimations.push(anim);
            }
        });
    }
    catch {
        // getAnimationsが全環境で利用できるとは限らない
    }
    // 動画の一時停止
    document.querySelectorAll("video").forEach((video) => {
        if (!video.paused) {
            video.dataset['wasPaused'] = "false";
            video.pause();
        }
    });
}
function unfreeze() {
    if (typeof document === "undefined")
        return;
    if (!_s.frozen)
        return;
    _s.frozen = false;
    // キューされたsetTimeoutコールバックを非同期でリプレイ
    // （停止したdelay() Promiseの解決、visibilitychangeで中断されたアニメーションループの再開等）
    // origSetTimeout(cb, 0)を使用してメインスレッドを一度にブロックしない
    // 実行前に_s.frozenを再チェック — スケジューリングと実行の間にfreeze()が再度呼ばれた場合、
    // 実行せずにコールバックを再キューする
    const timeoutQueue = _s.frozenTimeoutQueue;
    _s.frozenTimeoutQueue = [];
    for (const cb of timeoutQueue) {
        _s.origSetTimeout(() => {
            if (_s.frozen) {
                _s.frozenTimeoutQueue.push(cb);
                return;
            }
            try {
                cb();
            }
            catch (e) {
                console.warn("[agentation] Error replaying queued timeout:", e);
            }
        }, 0);
    }
    // キューされたrAFコールバックを次のフレームにスケジュール
    // _s.frozenを再チェック — フレーム発火前に再凍結された場合、再キューする
    const rafQueue = _s.frozenRAFQueue;
    _s.frozenRAFQueue = [];
    for (const cb of rafQueue) {
        _s.origRAF((ts) => {
            if (_s.frozen) {
                _s.frozenRAFQueue.push(cb);
                return;
            }
            cb(ts);
        });
    }
    // WAAPI — CSS除去前に一時停止したアニメーションを再開
    // （CSSを先に除去するとブラウザがアニメーションオブジェクトを置換する可能性がある）
    for (const anim of _s.pausedAnimations) {
        try {
            anim.play();
        }
        catch (e) {
            console.warn("[agentation] Error resuming animation:", e);
        }
    }
    _s.pausedAnimations = [];
    // CSS注入を除去
    document.getElementById(STYLE_ID)?.remove();
    // 動画を再開
    document.querySelectorAll("video").forEach((video) => {
        if (video.dataset['wasPaused'] === "false") {
            video.play().catch(() => { });
            delete video.dataset['wasPaused'];
        }
    });
}

// =============================================================================
// アノテーションポップアップコンポーネント
// =============================================================================
class PopupComponent {
    /** 要素名（ヘッダー表示用） */
    element;
    /** タイムスタンプ表示 */
    timestamp;
    /** 選択テキスト */
    selectedText;
    /** プレースホルダー */
    placeholder = 'What should change?';
    /** 初期値（編集モード用） */
    initialValue = '';
    /** 送信ボタンラベル */
    submitLabel = 'Add';
    /** アクセントカラー（hex） */
    accentColor = '#3c82f7';
    /** 退場状態（親制御） */
    isExiting = false;
    /** ライトモード */
    lightMode = false;
    /** 要素のComputedStyles */
    computedStyles;
    /** ポジションスタイル */
    positionStyle;
    /** 削除ボタン表示 */
    showDelete = false;
    /** テキスト送信イベント */
    submitText = new EventEmitter();
    /** キャンセルイベント */
    cancel = new EventEmitter();
    /** 削除イベント */
    delete = new EventEmitter();
    textareaRef;
    // 内部状態
    text = signal('');
    animState = signal('initial');
    isShaking = signal(false);
    isFocused = signal(false);
    isStylesExpanded = signal(false);
    // アイコンデータ
    trashIcon = ICON_TRASH;
    // タイマー参照
    cancelTimer = null;
    shakeTimer = null;
    enterTimer = null;
    focusTimer = null;
    ngOnInit() {
        this.text.set(this.initialValue);
        // 入場アニメーション
        originalSetTimeout(() => {
            this.animState.set('enter');
        }, 0);
        this.enterTimer = originalSetTimeout(() => {
            this.animState.set('entered');
        }, 200);
        // テキストエリアにフォーカス
        this.focusTimer = originalSetTimeout(() => {
            const textarea = this.textareaRef?.nativeElement;
            if (textarea) {
                textarea.focus();
                textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
                textarea.scrollTop = textarea.scrollHeight;
            }
        }, 50);
    }
    ngOnDestroy() {
        if (this.cancelTimer)
            clearTimeout(this.cancelTimer);
        if (this.shakeTimer)
            clearTimeout(this.shakeTimer);
        if (this.enterTimer)
            clearTimeout(this.enterTimer);
        if (this.focusTimer)
            clearTimeout(this.focusTimer);
    }
    /** シェイクアニメーション（外部から呼び出し可能） */
    shake() {
        if (this.shakeTimer)
            clearTimeout(this.shakeTimer);
        this.isShaking.set(true);
        this.shakeTimer = originalSetTimeout(() => {
            this.isShaking.set(false);
            this.textareaRef?.nativeElement?.focus();
        }, 250);
    }
    /** キャンセル処理（退場アニメーション付き） */
    handleCancel() {
        this.animState.set('exit');
        this.cancelTimer = originalSetTimeout(() => {
            this.cancel.emit();
        }, 150);
    }
    /** 送信処理 */
    handleSubmit() {
        const trimmed = this.text().trim();
        if (!trimmed)
            return;
        this.submitText.emit(trimmed);
    }
    /** キーボード処理 */
    handleKeyDown(event) {
        // IME入力中は無視
        if (event.isComposing)
            return;
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.handleSubmit();
        }
        if (event.key === 'Escape') {
            this.handleCancel();
        }
    }
    /** テキスト変更 */
    onTextChange(value) {
        this.text.set(value);
    }
    /** スタイル表示トグル */
    toggleStyles() {
        const wasExpanded = this.isStylesExpanded();
        this.isStylesExpanded.set(!wasExpanded);
        if (wasExpanded) {
            originalSetTimeout(() => this.textareaRef?.nativeElement?.focus(), 0);
        }
    }
    /** ComputedStylesのエントリ取得 */
    get styleEntries() {
        if (!this.computedStyles)
            return [];
        return Object.entries(this.computedStyles);
    }
    /** CSSプロパティ名をケバブケースに変換 */
    toKebabCase(str) {
        return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    }
    /** ポップアップのCSSクラス算出 */
    get popupClass() {
        const classes = ['agentation-popup'];
        if (this.lightMode)
            classes.push('agentation-popup--light');
        if (this.animState() === 'enter')
            classes.push('agentation-popup--enter');
        if (this.animState() === 'entered')
            classes.push('agentation-popup--entered');
        if (this.animState() === 'exit')
            classes.push('agentation-popup--exit');
        if (this.isShaking())
            classes.push('agentation-popup--shake');
        return classes.join(' ');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: PopupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.18", type: PopupComponent, isStandalone: true, selector: "agentation-popup", inputs: { element: "element", timestamp: "timestamp", selectedText: "selectedText", placeholder: "placeholder", initialValue: "initialValue", submitLabel: "submitLabel", accentColor: "accentColor", isExiting: "isExiting", lightMode: "lightMode", computedStyles: "computedStyles", positionStyle: "positionStyle", showDelete: "showDelete" }, outputs: { submitText: "submitText", cancel: "cancel", delete: "delete" }, viewQueries: [{ propertyName: "textareaRef", first: true, predicate: ["textareaRef"], descendants: true }], ngImport: i0, template: "<div\n  [class]=\"popupClass\"\n  [ngStyle]=\"positionStyle || {}\"\n  data-annotation-popup\n  (click)=\"$event.stopPropagation()\"\n>\n  <!-- \u30D8\u30C3\u30C0\u30FC -->\n  <div class=\"agentation-popup__header\">\n    @if (computedStyles && styleEntries.length > 0) {\n      <button\n        class=\"agentation-popup__header-toggle\"\n        (click)=\"toggleStyles()\"\n        type=\"button\"\n      >\n        <svg\n          class=\"agentation-popup__chevron\"\n          [class.agentation-popup__chevron--expanded]=\"isStylesExpanded()\"\n          width=\"14\"\n          height=\"14\"\n          viewBox=\"0 0 14 14\"\n          fill=\"none\"\n        >\n          <path\n            d=\"M5.5 10.25L9 7.25L5.75 4\"\n            stroke=\"currentColor\"\n            stroke-width=\"1.5\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n        <span class=\"agentation-popup__element\">{{ element }}</span>\n      </button>\n    } @else {\n      <span class=\"agentation-popup__element\">{{ element }}</span>\n    }\n    @if (timestamp) {\n      <span class=\"agentation-popup__timestamp\">{{ timestamp }}</span>\n    }\n  </div>\n\n  <!-- ComputedStyles\u30A2\u30B3\u30FC\u30C7\u30A3\u30AA\u30F3 -->\n  @if (computedStyles && styleEntries.length > 0) {\n    <div\n      class=\"agentation-popup__styles-wrapper\"\n      [class.agentation-popup__styles-wrapper--expanded]=\"isStylesExpanded()\"\n    >\n      <div class=\"agentation-popup__styles-inner\">\n        <div class=\"agentation-popup__styles-block\">\n          @for (entry of styleEntries; track entry[0]) {\n            <div class=\"agentation-popup__style-line\">\n              <span class=\"agentation-popup__style-property\">{{ toKebabCase(entry[0]) }}</span>\n              : <span class=\"agentation-popup__style-value\">{{ entry[1] }}</span>;\n            </div>\n          }\n        </div>\n      </div>\n    </div>\n  }\n\n  <!-- \u9078\u629E\u30C6\u30AD\u30B9\u30C8\u5F15\u7528 -->\n  @if (selectedText) {\n    <div class=\"agentation-popup__quote\">\n      &ldquo;{{ selectedText.length > 80 ? selectedText.slice(0, 80) + '...' : selectedText }}&rdquo;\n    </div>\n  }\n\n  <!-- \u30C6\u30AD\u30B9\u30C8\u5165\u529B -->\n  <textarea\n    #textareaRef\n    class=\"agentation-popup__textarea\"\n    [style.borderColor]=\"isFocused() ? accentColor : null\"\n    [placeholder]=\"placeholder\"\n    [value]=\"text()\"\n    (input)=\"onTextChange($any($event.target).value)\"\n    (focus)=\"isFocused.set(true)\"\n    (blur)=\"isFocused.set(false)\"\n    rows=\"2\"\n    (keydown)=\"handleKeyDown($event)\"\n  ></textarea>\n\n  <!-- \u30A2\u30AF\u30B7\u30E7\u30F3\u30DC\u30BF\u30F3 -->\n  <div class=\"agentation-popup__actions\">\n    @if (showDelete) {\n      <div class=\"agentation-popup__delete-wrapper\">\n        <button class=\"agentation-popup__delete-button\" (click)=\"delete.emit()\" type=\"button\">\n          <agentation-icon [data]=\"trashIcon\" [size]=\"22\" />\n        </button>\n      </div>\n    }\n    <button class=\"agentation-popup__cancel\" (click)=\"handleCancel()\">\n      Cancel\n    </button>\n    <button\n      class=\"agentation-popup__submit\"\n      [style.backgroundColor]=\"accentColor\"\n      [style.opacity]=\"text().trim() ? '1' : '0.4'\"\n      (click)=\"handleSubmit()\"\n      [disabled]=\"!text().trim()\"\n    >\n      {{ submitLabel }}\n    </button>\n  </div>\n</div>\n", styles: ["@keyframes popupEnter{0%{opacity:0;transform:translate(-50%) scale(.95) translateY(4px)}to{opacity:1;transform:translate(-50%) scale(1) translateY(0)}}@keyframes popupExit{0%{opacity:1;transform:translate(-50%) scale(1) translateY(0)}to{opacity:0;transform:translate(-50%) scale(.95) translateY(4px)}}@keyframes shake{0%,to{transform:translate(-50%) scale(1) translateY(0) translate(0)}20%{transform:translate(-50%) scale(1) translateY(0) translate(-3px)}40%{transform:translate(-50%) scale(1) translateY(0) translate(3px)}60%{transform:translate(-50%) scale(1) translateY(0) translate(-2px)}80%{transform:translate(-50%) scale(1) translateY(0) translate(2px)}}[data-annotation-popup] svg[fill=none]{fill:none!important}[data-annotation-popup].agentation-popup{position:fixed;transform:translate(-50%);width:280px;padding:12px 16px 14px;background:#1a1a1a;border-radius:16px;box-shadow:0 4px 24px #0000004d,0 0 0 1px #ffffff14;cursor:default;z-index:100001;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;will-change:transform,opacity;opacity:0}[data-annotation-popup].agentation-popup--enter{animation:popupEnter .2s cubic-bezier(.34,1.56,.64,1) forwards}[data-annotation-popup].agentation-popup--entered{opacity:1;transform:translate(-50%) scale(1) translateY(0)}[data-annotation-popup].agentation-popup--exit{animation:popupExit .15s ease-in forwards}[data-annotation-popup].agentation-popup--entered.agentation-popup--shake{animation:shake .25s ease-out}[data-annotation-popup].agentation-popup--light{background:#fff;box-shadow:0 4px 24px #0000001f,0 0 0 1px #0000000f}[data-annotation-popup].agentation-popup--light .agentation-popup__element{color:#0009}[data-annotation-popup].agentation-popup--light .agentation-popup__timestamp,[data-annotation-popup].agentation-popup--light .agentation-popup__chevron{color:#0006}[data-annotation-popup].agentation-popup--light .agentation-popup__styles-block{background:#00000008}[data-annotation-popup].agentation-popup--light .agentation-popup__style-line{color:#000000bf}[data-annotation-popup].agentation-popup--light .agentation-popup__style-property{color:#7c3aed}[data-annotation-popup].agentation-popup--light .agentation-popup__style-value{color:#000000bf}[data-annotation-popup].agentation-popup--light .agentation-popup__quote{color:#0000008c;background:#0000000a}[data-annotation-popup].agentation-popup--light .agentation-popup__textarea{background:#00000008;color:#1a1a1a;border-color:#0000001f}[data-annotation-popup].agentation-popup--light .agentation-popup__textarea::placeholder{color:#0006}[data-annotation-popup].agentation-popup--light .agentation-popup__textarea::-webkit-scrollbar-thumb{background:#00000026}[data-annotation-popup].agentation-popup--light .agentation-popup__cancel{color:#00000080}[data-annotation-popup].agentation-popup--light .agentation-popup__cancel:hover{background:#0000000f;color:#000000bf}[data-annotation-popup].agentation-popup--light .agentation-popup__delete-button{color:#0006}[data-annotation-popup].agentation-popup--light .agentation-popup__delete-button:hover{background:#ff3b3026;color:#ff3b30}[data-annotation-popup] .agentation-popup__header{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px}[data-annotation-popup] .agentation-popup__element{font-size:12px;font-weight:400;color:#ffffff80;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}[data-annotation-popup] .agentation-popup__header-toggle{display:flex;align-items:center;gap:4px;background:none;border:none;padding:0;cursor:pointer;flex:1;min-width:0;text-align:left}[data-annotation-popup] .agentation-popup__header-toggle .agentation-popup__element{flex:1}[data-annotation-popup] .agentation-popup__chevron{color:#ffffff80;transition:transform .25s cubic-bezier(.16,1,.3,1);flex-shrink:0}[data-annotation-popup] .agentation-popup__chevron--expanded{transform:rotate(90deg)}[data-annotation-popup] .agentation-popup__styles-wrapper{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s cubic-bezier(.16,1,.3,1)}[data-annotation-popup] .agentation-popup__styles-wrapper--expanded{grid-template-rows:1fr}[data-annotation-popup] .agentation-popup__styles-inner{overflow:hidden}[data-annotation-popup] .agentation-popup__styles-block{background:#ffffff0d;border-radius:6px;padding:8px 10px;margin-bottom:8px;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,monospace;font-size:11px;line-height:1.5}[data-annotation-popup] .agentation-popup__style-line{color:#ffffffd9;word-break:break-word}[data-annotation-popup] .agentation-popup__style-property{color:#c792ea}[data-annotation-popup] .agentation-popup__style-value{color:#ffffffd9}[data-annotation-popup] .agentation-popup__timestamp{font-size:10px;font-weight:500;color:#ffffff59;font-variant-numeric:tabular-nums;margin-left:8px;flex-shrink:0}[data-annotation-popup] .agentation-popup__quote{font-size:12px;font-style:italic;color:#fff9;margin-bottom:8px;padding:6px 8px;background:#ffffff0d;border-radius:4px;line-height:1.45}[data-annotation-popup] .agentation-popup__textarea{width:100%;padding:8px 10px;font-size:13px;font-family:inherit;background:#ffffff0d;color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:8px;resize:none;outline:none;box-sizing:border-box;transition:border-color .15s ease}[data-annotation-popup] .agentation-popup__textarea:focus{border-color:#3c82f7}[data-annotation-popup] .agentation-popup__textarea--green:focus{border-color:#34c759}[data-annotation-popup] .agentation-popup__textarea::placeholder{color:#ffffff59}[data-annotation-popup] .agentation-popup__textarea::-webkit-scrollbar{width:6px}[data-annotation-popup] .agentation-popup__textarea::-webkit-scrollbar-track{background:transparent}[data-annotation-popup] .agentation-popup__textarea::-webkit-scrollbar-thumb{background:#fff3;border-radius:3px}[data-annotation-popup] .agentation-popup__actions{display:flex;justify-content:flex-end;gap:6px;margin-top:8px}[data-annotation-popup] .agentation-popup__cancel,[data-annotation-popup] .agentation-popup__submit{padding:6px 14px;font-size:12px;font-weight:500;border-radius:16px;border:none;cursor:pointer;transition:background-color .15s ease,color .15s ease,opacity .15s ease}[data-annotation-popup] .agentation-popup__cancel{background:transparent;color:#ffffff80}[data-annotation-popup] .agentation-popup__cancel:hover{background:#ffffff1a;color:#fffc}[data-annotation-popup] .agentation-popup__submit{color:#fff}[data-annotation-popup] .agentation-popup__submit:hover:not(:disabled){filter:brightness(.9)}[data-annotation-popup] .agentation-popup__submit:disabled{cursor:not-allowed}[data-annotation-popup] .agentation-popup__delete-wrapper{margin-right:auto}[data-annotation-popup] .agentation-popup__delete-button{cursor:pointer;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;border:none;background:transparent;color:#fff6;transition:background-color .15s ease,color .15s ease,transform .1s ease}[data-annotation-popup] .agentation-popup__delete-button:hover{background:#ff3b3040;color:#ff3b30}[data-annotation-popup] .agentation-popup__delete-button:active{transform:scale(.92)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "component", type: IconComponent, selector: "agentation-icon", inputs: ["data", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: PopupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'agentation-popup', standalone: true, imports: [CommonModule, FormsModule, IconComponent], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div\n  [class]=\"popupClass\"\n  [ngStyle]=\"positionStyle || {}\"\n  data-annotation-popup\n  (click)=\"$event.stopPropagation()\"\n>\n  <!-- \u30D8\u30C3\u30C0\u30FC -->\n  <div class=\"agentation-popup__header\">\n    @if (computedStyles && styleEntries.length > 0) {\n      <button\n        class=\"agentation-popup__header-toggle\"\n        (click)=\"toggleStyles()\"\n        type=\"button\"\n      >\n        <svg\n          class=\"agentation-popup__chevron\"\n          [class.agentation-popup__chevron--expanded]=\"isStylesExpanded()\"\n          width=\"14\"\n          height=\"14\"\n          viewBox=\"0 0 14 14\"\n          fill=\"none\"\n        >\n          <path\n            d=\"M5.5 10.25L9 7.25L5.75 4\"\n            stroke=\"currentColor\"\n            stroke-width=\"1.5\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n        <span class=\"agentation-popup__element\">{{ element }}</span>\n      </button>\n    } @else {\n      <span class=\"agentation-popup__element\">{{ element }}</span>\n    }\n    @if (timestamp) {\n      <span class=\"agentation-popup__timestamp\">{{ timestamp }}</span>\n    }\n  </div>\n\n  <!-- ComputedStyles\u30A2\u30B3\u30FC\u30C7\u30A3\u30AA\u30F3 -->\n  @if (computedStyles && styleEntries.length > 0) {\n    <div\n      class=\"agentation-popup__styles-wrapper\"\n      [class.agentation-popup__styles-wrapper--expanded]=\"isStylesExpanded()\"\n    >\n      <div class=\"agentation-popup__styles-inner\">\n        <div class=\"agentation-popup__styles-block\">\n          @for (entry of styleEntries; track entry[0]) {\n            <div class=\"agentation-popup__style-line\">\n              <span class=\"agentation-popup__style-property\">{{ toKebabCase(entry[0]) }}</span>\n              : <span class=\"agentation-popup__style-value\">{{ entry[1] }}</span>;\n            </div>\n          }\n        </div>\n      </div>\n    </div>\n  }\n\n  <!-- \u9078\u629E\u30C6\u30AD\u30B9\u30C8\u5F15\u7528 -->\n  @if (selectedText) {\n    <div class=\"agentation-popup__quote\">\n      &ldquo;{{ selectedText.length > 80 ? selectedText.slice(0, 80) + '...' : selectedText }}&rdquo;\n    </div>\n  }\n\n  <!-- \u30C6\u30AD\u30B9\u30C8\u5165\u529B -->\n  <textarea\n    #textareaRef\n    class=\"agentation-popup__textarea\"\n    [style.borderColor]=\"isFocused() ? accentColor : null\"\n    [placeholder]=\"placeholder\"\n    [value]=\"text()\"\n    (input)=\"onTextChange($any($event.target).value)\"\n    (focus)=\"isFocused.set(true)\"\n    (blur)=\"isFocused.set(false)\"\n    rows=\"2\"\n    (keydown)=\"handleKeyDown($event)\"\n  ></textarea>\n\n  <!-- \u30A2\u30AF\u30B7\u30E7\u30F3\u30DC\u30BF\u30F3 -->\n  <div class=\"agentation-popup__actions\">\n    @if (showDelete) {\n      <div class=\"agentation-popup__delete-wrapper\">\n        <button class=\"agentation-popup__delete-button\" (click)=\"delete.emit()\" type=\"button\">\n          <agentation-icon [data]=\"trashIcon\" [size]=\"22\" />\n        </button>\n      </div>\n    }\n    <button class=\"agentation-popup__cancel\" (click)=\"handleCancel()\">\n      Cancel\n    </button>\n    <button\n      class=\"agentation-popup__submit\"\n      [style.backgroundColor]=\"accentColor\"\n      [style.opacity]=\"text().trim() ? '1' : '0.4'\"\n      (click)=\"handleSubmit()\"\n      [disabled]=\"!text().trim()\"\n    >\n      {{ submitLabel }}\n    </button>\n  </div>\n</div>\n", styles: ["@keyframes popupEnter{0%{opacity:0;transform:translate(-50%) scale(.95) translateY(4px)}to{opacity:1;transform:translate(-50%) scale(1) translateY(0)}}@keyframes popupExit{0%{opacity:1;transform:translate(-50%) scale(1) translateY(0)}to{opacity:0;transform:translate(-50%) scale(.95) translateY(4px)}}@keyframes shake{0%,to{transform:translate(-50%) scale(1) translateY(0) translate(0)}20%{transform:translate(-50%) scale(1) translateY(0) translate(-3px)}40%{transform:translate(-50%) scale(1) translateY(0) translate(3px)}60%{transform:translate(-50%) scale(1) translateY(0) translate(-2px)}80%{transform:translate(-50%) scale(1) translateY(0) translate(2px)}}[data-annotation-popup] svg[fill=none]{fill:none!important}[data-annotation-popup].agentation-popup{position:fixed;transform:translate(-50%);width:280px;padding:12px 16px 14px;background:#1a1a1a;border-radius:16px;box-shadow:0 4px 24px #0000004d,0 0 0 1px #ffffff14;cursor:default;z-index:100001;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;will-change:transform,opacity;opacity:0}[data-annotation-popup].agentation-popup--enter{animation:popupEnter .2s cubic-bezier(.34,1.56,.64,1) forwards}[data-annotation-popup].agentation-popup--entered{opacity:1;transform:translate(-50%) scale(1) translateY(0)}[data-annotation-popup].agentation-popup--exit{animation:popupExit .15s ease-in forwards}[data-annotation-popup].agentation-popup--entered.agentation-popup--shake{animation:shake .25s ease-out}[data-annotation-popup].agentation-popup--light{background:#fff;box-shadow:0 4px 24px #0000001f,0 0 0 1px #0000000f}[data-annotation-popup].agentation-popup--light .agentation-popup__element{color:#0009}[data-annotation-popup].agentation-popup--light .agentation-popup__timestamp,[data-annotation-popup].agentation-popup--light .agentation-popup__chevron{color:#0006}[data-annotation-popup].agentation-popup--light .agentation-popup__styles-block{background:#00000008}[data-annotation-popup].agentation-popup--light .agentation-popup__style-line{color:#000000bf}[data-annotation-popup].agentation-popup--light .agentation-popup__style-property{color:#7c3aed}[data-annotation-popup].agentation-popup--light .agentation-popup__style-value{color:#000000bf}[data-annotation-popup].agentation-popup--light .agentation-popup__quote{color:#0000008c;background:#0000000a}[data-annotation-popup].agentation-popup--light .agentation-popup__textarea{background:#00000008;color:#1a1a1a;border-color:#0000001f}[data-annotation-popup].agentation-popup--light .agentation-popup__textarea::placeholder{color:#0006}[data-annotation-popup].agentation-popup--light .agentation-popup__textarea::-webkit-scrollbar-thumb{background:#00000026}[data-annotation-popup].agentation-popup--light .agentation-popup__cancel{color:#00000080}[data-annotation-popup].agentation-popup--light .agentation-popup__cancel:hover{background:#0000000f;color:#000000bf}[data-annotation-popup].agentation-popup--light .agentation-popup__delete-button{color:#0006}[data-annotation-popup].agentation-popup--light .agentation-popup__delete-button:hover{background:#ff3b3026;color:#ff3b30}[data-annotation-popup] .agentation-popup__header{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px}[data-annotation-popup] .agentation-popup__element{font-size:12px;font-weight:400;color:#ffffff80;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}[data-annotation-popup] .agentation-popup__header-toggle{display:flex;align-items:center;gap:4px;background:none;border:none;padding:0;cursor:pointer;flex:1;min-width:0;text-align:left}[data-annotation-popup] .agentation-popup__header-toggle .agentation-popup__element{flex:1}[data-annotation-popup] .agentation-popup__chevron{color:#ffffff80;transition:transform .25s cubic-bezier(.16,1,.3,1);flex-shrink:0}[data-annotation-popup] .agentation-popup__chevron--expanded{transform:rotate(90deg)}[data-annotation-popup] .agentation-popup__styles-wrapper{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s cubic-bezier(.16,1,.3,1)}[data-annotation-popup] .agentation-popup__styles-wrapper--expanded{grid-template-rows:1fr}[data-annotation-popup] .agentation-popup__styles-inner{overflow:hidden}[data-annotation-popup] .agentation-popup__styles-block{background:#ffffff0d;border-radius:6px;padding:8px 10px;margin-bottom:8px;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,monospace;font-size:11px;line-height:1.5}[data-annotation-popup] .agentation-popup__style-line{color:#ffffffd9;word-break:break-word}[data-annotation-popup] .agentation-popup__style-property{color:#c792ea}[data-annotation-popup] .agentation-popup__style-value{color:#ffffffd9}[data-annotation-popup] .agentation-popup__timestamp{font-size:10px;font-weight:500;color:#ffffff59;font-variant-numeric:tabular-nums;margin-left:8px;flex-shrink:0}[data-annotation-popup] .agentation-popup__quote{font-size:12px;font-style:italic;color:#fff9;margin-bottom:8px;padding:6px 8px;background:#ffffff0d;border-radius:4px;line-height:1.45}[data-annotation-popup] .agentation-popup__textarea{width:100%;padding:8px 10px;font-size:13px;font-family:inherit;background:#ffffff0d;color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:8px;resize:none;outline:none;box-sizing:border-box;transition:border-color .15s ease}[data-annotation-popup] .agentation-popup__textarea:focus{border-color:#3c82f7}[data-annotation-popup] .agentation-popup__textarea--green:focus{border-color:#34c759}[data-annotation-popup] .agentation-popup__textarea::placeholder{color:#ffffff59}[data-annotation-popup] .agentation-popup__textarea::-webkit-scrollbar{width:6px}[data-annotation-popup] .agentation-popup__textarea::-webkit-scrollbar-track{background:transparent}[data-annotation-popup] .agentation-popup__textarea::-webkit-scrollbar-thumb{background:#fff3;border-radius:3px}[data-annotation-popup] .agentation-popup__actions{display:flex;justify-content:flex-end;gap:6px;margin-top:8px}[data-annotation-popup] .agentation-popup__cancel,[data-annotation-popup] .agentation-popup__submit{padding:6px 14px;font-size:12px;font-weight:500;border-radius:16px;border:none;cursor:pointer;transition:background-color .15s ease,color .15s ease,opacity .15s ease}[data-annotation-popup] .agentation-popup__cancel{background:transparent;color:#ffffff80}[data-annotation-popup] .agentation-popup__cancel:hover{background:#ffffff1a;color:#fffc}[data-annotation-popup] .agentation-popup__submit{color:#fff}[data-annotation-popup] .agentation-popup__submit:hover:not(:disabled){filter:brightness(.9)}[data-annotation-popup] .agentation-popup__submit:disabled{cursor:not-allowed}[data-annotation-popup] .agentation-popup__delete-wrapper{margin-right:auto}[data-annotation-popup] .agentation-popup__delete-button{cursor:pointer;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;border:none;background:transparent;color:#fff6;transition:background-color .15s ease,color .15s ease,transform .1s ease}[data-annotation-popup] .agentation-popup__delete-button:hover{background:#ff3b3040;color:#ff3b30}[data-annotation-popup] .agentation-popup__delete-button:active{transform:scale(.92)}\n"] }]
        }], propDecorators: { element: [{
                type: Input,
                args: [{ required: true }]
            }], timestamp: [{
                type: Input
            }], selectedText: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], initialValue: [{
                type: Input
            }], submitLabel: [{
                type: Input
            }], accentColor: [{
                type: Input
            }], isExiting: [{
                type: Input
            }], lightMode: [{
                type: Input
            }], computedStyles: [{
                type: Input
            }], positionStyle: [{
                type: Input
            }], showDelete: [{
                type: Input
            }], submitText: [{
                type: Output
            }], cancel: [{
                type: Output
            }], delete: [{
                type: Output
            }], textareaRef: [{
                type: ViewChild,
                args: ['textareaRef']
            }] } });

// =============================================================================
// ツールバー設定定数
// =============================================================================
// デフォルト設定値
const DEFAULT_SETTINGS = {
    outputDetail: 'standard',
    autoClearAfterCopy: false,
    annotationColor: '#3c82f7',
    blockInteractions: true,
    angularEnabled: true,
    markerClickBehavior: 'edit',
    webhookUrl: '',
    webhooksEnabled: true,
};
// 出力詳細レベルとAngular検出モードのマッピング
const OUTPUT_TO_ANGULAR_MODE = {
    compact: 'off',
    standard: 'filtered',
    detailed: 'smart',
    forensic: 'all',
};
// マーカークリック動作の選択肢
const MARKER_CLICK_OPTIONS = [
    { value: 'edit', label: 'Edit' },
    { value: 'delete', label: 'Delete' },
];
// 出力詳細レベルの選択肢
const OUTPUT_DETAIL_OPTIONS = [
    { value: 'compact', label: 'Compact' },
    { value: 'standard', label: 'Standard' },
    { value: 'detailed', label: 'Detailed' },
    { value: 'forensic', label: 'Forensic' },
];
// アノテーションカラーの選択肢
const COLOR_OPTIONS = [
    { value: '#AF52DE', label: 'Purple' },
    { value: '#3c82f7', label: 'Blue' },
    { value: '#5AC8FA', label: 'Cyan' },
    { value: '#34C759', label: 'Green' },
    { value: '#FFD60A', label: 'Yellow' },
    { value: '#FF9500', label: 'Orange' },
    { value: '#FF3B30', label: 'Red' },
];

// =============================================================================
// 設定パネルコンポーネント
// =============================================================================
class SettingsComponent {
    /** サービス参照 */
    service;
    /** MCPエンドポイントURL */
    endpoint = '';
    // MCPパネル表示状態
    showMcpPanel = signal(false);
    // アニメーション状態
    animState = signal('initial');
    // 定数公開（テンプレートで使用）
    colorOptions = COLOR_OPTIONS;
    outputDetailOptions = OUTPUT_DETAIL_OPTIONS;
    markerClickOptions = MARKER_CLICK_OPTIONS;
    // タイマー参照
    enterTimer = null;
    ngOnInit() {
        // 入場アニメーション
        originalSetTimeout(() => {
            this.animState.set('enter');
        }, 0);
        this.enterTimer = originalSetTimeout(() => {
            this.animState.set('entered');
        }, 200);
    }
    ngOnDestroy() {
        if (this.enterTimer)
            clearTimeout(this.enterTimer);
    }
    /** 設定パネルのCSSクラス算出 */
    get panelClass() {
        const classes = ['agentation-settings'];
        const isDark = this.service.toolbarState().isDarkMode;
        if (!isDark)
            classes.push('agentation-settings--light');
        if (this.animState() === 'enter')
            classes.push('agentation-settings--enter');
        if (this.animState() === 'entered')
            classes.push('agentation-settings--entered');
        if (this.animState() === 'exit')
            classes.push('agentation-settings--exit');
        return classes.join(' ');
    }
    /** 出力詳細レベル変更 */
    onOutputDetailChange(value) {
        this.service.updateSettings({ outputDetail: value });
    }
    /** アノテーションカラー変更 */
    onColorChange(value) {
        this.service.updateSettings({ annotationColor: value });
    }
    /** マーカークリック動作変更 */
    onMarkerClickChange(value) {
        this.service.updateSettings({ markerClickBehavior: value });
    }
    /** 自動クリア トグル */
    onAutoClearToggle() {
        this.service.updateSettings({
            autoClearAfterCopy: !this.service.settings().autoClearAfterCopy,
        });
    }
    /** インタラクションブロック トグル */
    onBlockInteractionsToggle() {
        this.service.updateSettings({
            blockInteractions: !this.service.settings().blockInteractions,
        });
    }
    /** Angular検出 トグル */
    onAngularToggle() {
        this.service.updateSettings({
            angularEnabled: !this.service.settings().angularEnabled,
        });
    }
    /** Webhook トグル */
    onWebhooksToggle() {
        this.service.updateSettings({
            webhooksEnabled: !this.service.settings().webhooksEnabled,
        });
    }
    /** Webhook URL変更 */
    onWebhookUrlChange(value) {
        this.service.updateSettings({ webhookUrl: value });
    }
    /** MCPパネルを開く */
    onOpenMcpPanel() {
        this.showMcpPanel.set(true);
    }
    /** MCPパネルを閉じる */
    onCloseMcpPanel() {
        this.showMcpPanel.set(false);
    }
    /** 設定パネルを閉じる */
    close() {
        this.animState.set('exit');
        originalSetTimeout(() => {
            this.service.toggleSettings();
        }, 150);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: SettingsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.18", type: SettingsComponent, isStandalone: true, selector: "agentation-settings", inputs: { service: "service", endpoint: "endpoint" }, ngImport: i0, template: "@if (!showMcpPanel()) {\n<div [class]=\"panelClass\" data-agentation>\n  <!-- \u30D8\u30C3\u30C0\u30FC -->\n  <div class=\"agentation-settings__header\">\n    <span class=\"agentation-settings__title\">Settings</span>\n    <button\n      class=\"agentation-settings__close\"\n      (click)=\"close()\"\n      type=\"button\"\n    >\n      \u2715\n    </button>\n  </div>\n\n  <!-- \u51FA\u529B\u8A2D\u5B9A\u30BB\u30AF\u30B7\u30E7\u30F3 -->\n  <div class=\"agentation-settings__section\">\n    <label class=\"agentation-settings__label\">Output Detail</label>\n    <select\n      class=\"agentation-settings__select\"\n      [ngModel]=\"service.settings().outputDetail\"\n      (ngModelChange)=\"onOutputDetailChange($event)\"\n    >\n      @for (option of outputDetailOptions; track option.value) {\n        <option [value]=\"option.value\">{{ option.label }}</option>\n      }\n    </select>\n  </div>\n\n  <!-- \u30A2\u30CE\u30C6\u30FC\u30B7\u30E7\u30F3\u30AB\u30E9\u30FC\u30BB\u30AF\u30B7\u30E7\u30F3 -->\n  <div class=\"agentation-settings__section\">\n    <label class=\"agentation-settings__label\">Annotation Color</label>\n    <div class=\"agentation-settings__colors\">\n      @for (color of colorOptions; track color.value) {\n        <button\n          class=\"agentation-settings__color-swatch\"\n          [class.agentation-settings__color-swatch--active]=\"service.settings().annotationColor === color.value\"\n          [style.backgroundColor]=\"color.value\"\n          [title]=\"color.label\"\n          (click)=\"onColorChange(color.value)\"\n          type=\"button\"\n        ></button>\n      }\n    </div>\n  </div>\n\n  <!-- \u30DE\u30FC\u30AB\u30FC\u30AF\u30EA\u30C3\u30AF\u52D5\u4F5C\u30BB\u30AF\u30B7\u30E7\u30F3 -->\n  <div class=\"agentation-settings__section\">\n    <label class=\"agentation-settings__label\">Marker Click</label>\n    <select\n      class=\"agentation-settings__select\"\n      [ngModel]=\"service.settings().markerClickBehavior\"\n      (ngModelChange)=\"onMarkerClickChange($event)\"\n    >\n      @for (option of markerClickOptions; track option.value) {\n        <option [value]=\"option.value\">{{ option.label }}</option>\n      }\n    </select>\n  </div>\n\n  <!-- \u30C8\u30B0\u30EB\u30BB\u30AF\u30B7\u30E7\u30F3 -->\n  <div class=\"agentation-settings__section\">\n    <div class=\"agentation-settings__toggle-row\">\n      <span class=\"agentation-settings__toggle-label\">Auto-clear after copy</span>\n      <button\n        class=\"agentation-settings__toggle-button\"\n        [class.agentation-settings__toggle-button--active]=\"service.settings().autoClearAfterCopy\"\n        (click)=\"onAutoClearToggle()\"\n        type=\"button\"\n      >\n        <span class=\"agentation-settings__toggle-knob\"></span>\n      </button>\n    </div>\n\n    <div class=\"agentation-settings__toggle-row\">\n      <span class=\"agentation-settings__toggle-label\">Block interactions</span>\n      <button\n        class=\"agentation-settings__toggle-button\"\n        [class.agentation-settings__toggle-button--active]=\"service.settings().blockInteractions\"\n        (click)=\"onBlockInteractionsToggle()\"\n        type=\"button\"\n      >\n        <span class=\"agentation-settings__toggle-knob\"></span>\n      </button>\n    </div>\n\n    <div class=\"agentation-settings__toggle-row\">\n      <span class=\"agentation-settings__toggle-label\">Angular detection</span>\n      <button\n        class=\"agentation-settings__toggle-button\"\n        [class.agentation-settings__toggle-button--active]=\"service.settings().angularEnabled\"\n        (click)=\"onAngularToggle()\"\n        type=\"button\"\n      >\n        <span class=\"agentation-settings__toggle-knob\"></span>\n      </button>\n    </div>\n  </div>\n\n  <!-- Webhook\u8A2D\u5B9A\u30BB\u30AF\u30B7\u30E7\u30F3 -->\n  <div class=\"agentation-settings__section\">\n    @if (endpoint) {\n      <!-- MCP\u63A5\u7D9A\u6642: \u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3\u30EA\u30F3\u30AF -->\n      <button class=\"agentation-settings__nav-link\" (click)=\"onOpenMcpPanel()\" type=\"button\">\n        <span>Manage MCP & Webhooks</span>\n        <span class=\"agentation-settings__nav-link-right\">\n          @if (service.connectionStatus() === 'connected') {\n            <span class=\"agentation-settings__nav-dot agentation-settings__nav-dot--connected\"></span>\n          } @else if (service.connectionStatus() === 'connecting') {\n            <span class=\"agentation-settings__nav-dot agentation-settings__nav-dot--connecting\"></span>\n          }\n          <svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" fill=\"none\">\n            <path d=\"M1 1L5.5 6L1 11\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          </svg>\n        </span>\n      </button>\n    } @else {\n      <!-- MCP\u672A\u63A5\u7D9A\u6642: \u5F93\u6765\u306EWebhook\u30A4\u30F3\u30E9\u30A4\u30F3UI -->\n      <div class=\"agentation-settings__toggle-row\">\n        <span class=\"agentation-settings__toggle-label\">Webhooks</span>\n        <button\n          class=\"agentation-settings__toggle-button\"\n          [class.agentation-settings__toggle-button--active]=\"service.settings().webhooksEnabled\"\n          (click)=\"onWebhooksToggle()\"\n          type=\"button\"\n        >\n          <span class=\"agentation-settings__toggle-knob\"></span>\n        </button>\n      </div>\n\n      @if (service.settings().webhooksEnabled) {\n        <div class=\"agentation-settings__webhook-url\">\n          <input\n            class=\"agentation-settings__input\"\n            type=\"url\"\n            placeholder=\"https://example.com/webhook\"\n            [ngModel]=\"service.settings().webhookUrl\"\n            (ngModelChange)=\"onWebhookUrlChange($event)\"\n          />\n        </div>\n      }\n    }\n  </div>\n</div>\n} @else {\n<!-- MCP\u30B5\u30D6\u30D3\u30E5\u30FC -->\n<div [class]=\"panelClass\" data-agentation>\n  <!-- \u623B\u308B\u30DC\u30BF\u30F3 -->\n  <button class=\"agentation-settings__back-button\" (click)=\"onCloseMcpPanel()\" type=\"button\">\n    <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\">\n      <path d=\"M8.5 3.5L4 8L8.5 12.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    </svg>\n    <span>Manage MCP & Webhooks</span>\n  </button>\n\n  <!-- MCP Connection\u30BB\u30AF\u30B7\u30E7\u30F3 -->\n  <div class=\"agentation-settings__section\">\n    <div class=\"agentation-settings__section-row\">\n      <span class=\"agentation-settings__section-header\">MCP Connection</span>\n      @if (endpoint) {\n        <div\n          class=\"agentation-settings__mcp-dot\"\n          [class.agentation-settings__mcp-dot--connected]=\"service.connectionStatus() === 'connected'\"\n          [class.agentation-settings__mcp-dot--connecting]=\"service.connectionStatus() === 'connecting'\"\n          [class.agentation-settings__mcp-dot--disconnected]=\"service.connectionStatus() === 'disconnected'\"\n        ></div>\n      }\n    </div>\n    <p class=\"agentation-settings__description\">\n      MCP connection allows agents to receive and act on annotations.\n    </p>\n  </div>\n\n  <!-- Webhooks\u30BB\u30AF\u30B7\u30E7\u30F3 -->\n  <div class=\"agentation-settings__section\">\n    <div class=\"agentation-settings__section-row\">\n      <span class=\"agentation-settings__section-header\">Webhooks</span>\n      <div class=\"agentation-settings__auto-send-row\">\n        <span\n          class=\"agentation-settings__auto-send-label\"\n          [class.agentation-settings__auto-send-label--active]=\"service.settings().webhooksEnabled\"\n        >Auto-Send</span>\n        <button\n          class=\"agentation-settings__toggle-button\"\n          [class.agentation-settings__toggle-button--active]=\"service.settings().webhooksEnabled\"\n          [disabled]=\"!service.settings().webhookUrl\"\n          (click)=\"onWebhooksToggle()\"\n          type=\"button\"\n        >\n          <span class=\"agentation-settings__toggle-knob\"></span>\n        </button>\n      </div>\n    </div>\n    <p class=\"agentation-settings__description\">\n      The webhook URL will receive live annotation changes and annotation data.\n    </p>\n    <textarea\n      class=\"agentation-settings__webhook-textarea\"\n      placeholder=\"Webhook URL\"\n      [ngModel]=\"service.settings().webhookUrl\"\n      (ngModelChange)=\"onWebhookUrlChange($event)\"\n    ></textarea>\n  </div>\n</div>\n}\n", styles: ["@keyframes settingsEnter{0%{opacity:0;transform:scale(.95) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes settingsExit{0%{opacity:1;transform:scale(1) translateY(0)}to{opacity:0;transform:scale(.95) translateY(8px)}}@keyframes connectionPulse{0%,to{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.9)}}[data-agentation] .agentation-settings{position:fixed;bottom:72px;right:20px;width:260px;padding:12px 16px;background:#1a1a1a;border-radius:12px;box-shadow:0 4px 24px #0000004d,0 0 0 1px #ffffff14;z-index:100001;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#fff;opacity:0}[data-agentation] .agentation-settings--enter{animation:settingsEnter .2s cubic-bezier(.34,1.56,.64,1) forwards}[data-agentation] .agentation-settings--entered{opacity:1;transform:scale(1) translateY(0)}[data-agentation] .agentation-settings--exit{animation:settingsExit .15s ease-in forwards}[data-agentation] .agentation-settings--light{background:#fff;color:#000000d9;box-shadow:0 4px 24px #0000001f,0 0 0 1px #0000000f}[data-agentation] .agentation-settings--light .agentation-settings__label{color:#00000080}[data-agentation] .agentation-settings--light .agentation-settings__select,[data-agentation] .agentation-settings--light .agentation-settings__input{background:#00000008;color:#000000d9;border-color:#0000001f}[data-agentation] .agentation-settings--light .agentation-settings__input::placeholder{color:#00000059}[data-agentation] .agentation-settings--light .agentation-settings__close{color:#0006}[data-agentation] .agentation-settings--light .agentation-settings__close:hover{background:#0000000f;color:#000000bf}[data-agentation] .agentation-settings--light .agentation-settings__toggle-label{color:#000000b3}[data-agentation] .agentation-settings--light .agentation-settings__toggle-button{background:#00000026}[data-agentation] .agentation-settings--light .agentation-settings__toggle-button--active{background:#3c82f7}[data-agentation] .agentation-settings--light .agentation-settings__section+.agentation-settings__section{border-color:#0000000f}[data-agentation] .agentation-settings--light .agentation-settings__nav-link{color:#00000080}[data-agentation] .agentation-settings--light .agentation-settings__nav-link:hover{color:#000c}[data-agentation] .agentation-settings--light .agentation-settings__nav-link-right svg{color:#00000040}[data-agentation] .agentation-settings--light .agentation-settings__nav-link:hover .agentation-settings__nav-link-right svg{color:#000c}[data-agentation] .agentation-settings--light .agentation-settings__back-button{color:#000000d9;border-bottom-color:#00000014}[data-agentation] .agentation-settings--light .agentation-settings__section-header{color:#000000d9}[data-agentation] .agentation-settings--light .agentation-settings__description{color:#00000080}[data-agentation] .agentation-settings--light .agentation-settings__auto-send-label{color:#0006}[data-agentation] .agentation-settings--light .agentation-settings__auto-send-label--active{color:#3c82f7}[data-agentation] .agentation-settings--light .agentation-settings__webhook-textarea{background:#00000008;color:#000000d9;border-color:#0000001f}[data-agentation] .agentation-settings--light .agentation-settings__webhook-textarea::placeholder{color:#00000059}[data-agentation] .agentation-settings__header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}[data-agentation] .agentation-settings__title{font-size:13px;font-weight:600}[data-agentation] .agentation-settings__close{cursor:pointer;display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;border:none;background:transparent;color:#ffffff80;font-size:12px;transition:background-color .15s ease,color .15s ease}[data-agentation] .agentation-settings__close:hover{background:#ffffff1a;color:#fffc}[data-agentation] .agentation-settings__section{padding:8px 0}[data-agentation] .agentation-settings__section+[data-agentation] .agentation-settings__section{border-top:1px solid rgba(255,255,255,.08)}[data-agentation] .agentation-settings__label{display:block;font-size:11px;font-weight:500;color:#ffffff80;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}[data-agentation] .agentation-settings__select{width:100%;padding:6px 8px;font-size:13px;font-family:inherit;background:#ffffff0d;color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:6px;outline:none;cursor:pointer;appearance:auto;transition:border-color .15s ease}[data-agentation] .agentation-settings__select:focus{border-color:#3c82f7}[data-agentation] .agentation-settings__select option{background:#2a2a2a;color:#fff}[data-agentation] .agentation-settings__input{width:100%;padding:6px 8px;font-size:12px;font-family:inherit;background:#ffffff0d;color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:6px;outline:none;box-sizing:border-box;transition:border-color .15s ease;margin-top:6px}[data-agentation] .agentation-settings__input:focus{border-color:#3c82f7}[data-agentation] .agentation-settings__input::placeholder{color:#ffffff59}[data-agentation] .agentation-settings__colors{display:flex;gap:6px;flex-wrap:wrap}[data-agentation] .agentation-settings__color-swatch{width:24px;height:24px;border-radius:50%;border:2px solid transparent;cursor:pointer;padding:0;transition:border-color .15s ease,transform .1s ease}[data-agentation] .agentation-settings__color-swatch:hover{transform:scale(1.1)}[data-agentation] .agentation-settings__color-swatch:active{transform:scale(.95)}[data-agentation] .agentation-settings__color-swatch--active{border-color:#fff;box-shadow:0 0 0 1px #0000004d}[data-agentation] .agentation-settings__toggle-row{display:flex;align-items:center;justify-content:space-between;padding:4px 0}[data-agentation] .agentation-settings__toggle-label{font-size:13px;color:#ffffffd9}[data-agentation] .agentation-settings__toggle-button{position:relative;width:36px;height:20px;border-radius:10px;border:none;background:#fff3;cursor:pointer;padding:0;flex-shrink:0;transition:background-color .2s ease}[data-agentation] .agentation-settings__toggle-button--active{background:#3c82f7}[data-agentation] .agentation-settings__toggle-knob{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .2s ease}.agentation-settings__toggle-button--active [data-agentation] .agentation-settings__toggle-knob{transform:translate(16px)}[data-agentation] .agentation-settings__webhook-url{margin-top:4px}[data-agentation] .agentation-settings__nav-link{display:flex;align-items:center;justify-content:space-between;width:100%;padding:0;border:none;background:transparent;font-family:inherit;font-size:13px;font-weight:400;color:#ffffff80;cursor:pointer;transition:color .15s ease}[data-agentation] .agentation-settings__nav-link:hover{color:#ffffffe6}[data-agentation] .agentation-settings__nav-link-right{display:flex;align-items:center;gap:6px}[data-agentation] .agentation-settings__nav-link-right svg{color:#fff6;transition:color .15s ease}[data-agentation] .agentation-settings__nav-link:hover .agentation-settings__nav-link-right svg{color:#fff}[data-agentation] .agentation-settings__nav-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}[data-agentation] .agentation-settings__nav-dot--connected{background:#34c759;animation:connectionPulse 2.5s ease-in-out infinite}[data-agentation] .agentation-settings__nav-dot--connecting{background:#f5a623;animation:connectionPulse 1.5s ease-in-out infinite}[data-agentation] .agentation-settings__back-button{display:flex;align-items:center;gap:4px;padding:6px 0 12px;margin:-6px 0 8px;border:none;border-bottom:1px solid rgba(255,255,255,.07);border-radius:0;background:transparent;font-family:inherit;font-size:13px;font-weight:500;letter-spacing:-.15px;color:#fff;cursor:pointer;transition:transform .12s cubic-bezier(.32,.72,0,1)}[data-agentation] .agentation-settings__back-button svg{opacity:.4;flex-shrink:0;transition:opacity .15s ease,transform .18s cubic-bezier(.32,.72,0,1)}[data-agentation] .agentation-settings__back-button:hover svg{opacity:1}[data-agentation] .agentation-settings__section-row{display:flex;align-items:center;justify-content:space-between}[data-agentation] .agentation-settings__section-header{font-size:13px;font-weight:400;color:#fff}[data-agentation] .agentation-settings__description{font-size:11px;font-weight:300;color:#ffffff80;margin-top:2px;line-height:14px}[data-agentation] .agentation-settings__mcp-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}[data-agentation] .agentation-settings__mcp-dot--connected{background:#34c759;animation:connectionPulse 2.5s ease-in-out infinite}[data-agentation] .agentation-settings__mcp-dot--connecting{background:#f5a623;animation:connectionPulse 1.5s ease-in-out infinite}[data-agentation] .agentation-settings__mcp-dot--disconnected{background:#ff3b30}[data-agentation] .agentation-settings__auto-send-row{display:flex;align-items:center;gap:8px}[data-agentation] .agentation-settings__auto-send-label{font-size:11px;font-weight:400;color:#fff6;transition:color .15s ease}[data-agentation] .agentation-settings__auto-send-label--active{color:#66b8ff}[data-agentation] .agentation-settings__webhook-textarea{display:block;width:100%;min-height:60px;box-sizing:border-box;margin-top:11px;padding:8px 10px;border:1px solid rgba(255,255,255,.1);border-radius:6px;background:#ffffff08;font-family:inherit;font-size:12px;font-weight:400;color:#fff;outline:none;resize:none;cursor:text!important;-webkit-user-select:text;user-select:text;transition:border-color .15s ease,background .15s ease,box-shadow .15s ease}[data-agentation] .agentation-settings__webhook-textarea::placeholder{color:#ffffff4d}[data-agentation] .agentation-settings__webhook-textarea:focus{border-color:#3c82f7}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: SettingsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'agentation-settings', standalone: true, imports: [CommonModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "@if (!showMcpPanel()) {\n<div [class]=\"panelClass\" data-agentation>\n  <!-- \u30D8\u30C3\u30C0\u30FC -->\n  <div class=\"agentation-settings__header\">\n    <span class=\"agentation-settings__title\">Settings</span>\n    <button\n      class=\"agentation-settings__close\"\n      (click)=\"close()\"\n      type=\"button\"\n    >\n      \u2715\n    </button>\n  </div>\n\n  <!-- \u51FA\u529B\u8A2D\u5B9A\u30BB\u30AF\u30B7\u30E7\u30F3 -->\n  <div class=\"agentation-settings__section\">\n    <label class=\"agentation-settings__label\">Output Detail</label>\n    <select\n      class=\"agentation-settings__select\"\n      [ngModel]=\"service.settings().outputDetail\"\n      (ngModelChange)=\"onOutputDetailChange($event)\"\n    >\n      @for (option of outputDetailOptions; track option.value) {\n        <option [value]=\"option.value\">{{ option.label }}</option>\n      }\n    </select>\n  </div>\n\n  <!-- \u30A2\u30CE\u30C6\u30FC\u30B7\u30E7\u30F3\u30AB\u30E9\u30FC\u30BB\u30AF\u30B7\u30E7\u30F3 -->\n  <div class=\"agentation-settings__section\">\n    <label class=\"agentation-settings__label\">Annotation Color</label>\n    <div class=\"agentation-settings__colors\">\n      @for (color of colorOptions; track color.value) {\n        <button\n          class=\"agentation-settings__color-swatch\"\n          [class.agentation-settings__color-swatch--active]=\"service.settings().annotationColor === color.value\"\n          [style.backgroundColor]=\"color.value\"\n          [title]=\"color.label\"\n          (click)=\"onColorChange(color.value)\"\n          type=\"button\"\n        ></button>\n      }\n    </div>\n  </div>\n\n  <!-- \u30DE\u30FC\u30AB\u30FC\u30AF\u30EA\u30C3\u30AF\u52D5\u4F5C\u30BB\u30AF\u30B7\u30E7\u30F3 -->\n  <div class=\"agentation-settings__section\">\n    <label class=\"agentation-settings__label\">Marker Click</label>\n    <select\n      class=\"agentation-settings__select\"\n      [ngModel]=\"service.settings().markerClickBehavior\"\n      (ngModelChange)=\"onMarkerClickChange($event)\"\n    >\n      @for (option of markerClickOptions; track option.value) {\n        <option [value]=\"option.value\">{{ option.label }}</option>\n      }\n    </select>\n  </div>\n\n  <!-- \u30C8\u30B0\u30EB\u30BB\u30AF\u30B7\u30E7\u30F3 -->\n  <div class=\"agentation-settings__section\">\n    <div class=\"agentation-settings__toggle-row\">\n      <span class=\"agentation-settings__toggle-label\">Auto-clear after copy</span>\n      <button\n        class=\"agentation-settings__toggle-button\"\n        [class.agentation-settings__toggle-button--active]=\"service.settings().autoClearAfterCopy\"\n        (click)=\"onAutoClearToggle()\"\n        type=\"button\"\n      >\n        <span class=\"agentation-settings__toggle-knob\"></span>\n      </button>\n    </div>\n\n    <div class=\"agentation-settings__toggle-row\">\n      <span class=\"agentation-settings__toggle-label\">Block interactions</span>\n      <button\n        class=\"agentation-settings__toggle-button\"\n        [class.agentation-settings__toggle-button--active]=\"service.settings().blockInteractions\"\n        (click)=\"onBlockInteractionsToggle()\"\n        type=\"button\"\n      >\n        <span class=\"agentation-settings__toggle-knob\"></span>\n      </button>\n    </div>\n\n    <div class=\"agentation-settings__toggle-row\">\n      <span class=\"agentation-settings__toggle-label\">Angular detection</span>\n      <button\n        class=\"agentation-settings__toggle-button\"\n        [class.agentation-settings__toggle-button--active]=\"service.settings().angularEnabled\"\n        (click)=\"onAngularToggle()\"\n        type=\"button\"\n      >\n        <span class=\"agentation-settings__toggle-knob\"></span>\n      </button>\n    </div>\n  </div>\n\n  <!-- Webhook\u8A2D\u5B9A\u30BB\u30AF\u30B7\u30E7\u30F3 -->\n  <div class=\"agentation-settings__section\">\n    @if (endpoint) {\n      <!-- MCP\u63A5\u7D9A\u6642: \u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3\u30EA\u30F3\u30AF -->\n      <button class=\"agentation-settings__nav-link\" (click)=\"onOpenMcpPanel()\" type=\"button\">\n        <span>Manage MCP & Webhooks</span>\n        <span class=\"agentation-settings__nav-link-right\">\n          @if (service.connectionStatus() === 'connected') {\n            <span class=\"agentation-settings__nav-dot agentation-settings__nav-dot--connected\"></span>\n          } @else if (service.connectionStatus() === 'connecting') {\n            <span class=\"agentation-settings__nav-dot agentation-settings__nav-dot--connecting\"></span>\n          }\n          <svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" fill=\"none\">\n            <path d=\"M1 1L5.5 6L1 11\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          </svg>\n        </span>\n      </button>\n    } @else {\n      <!-- MCP\u672A\u63A5\u7D9A\u6642: \u5F93\u6765\u306EWebhook\u30A4\u30F3\u30E9\u30A4\u30F3UI -->\n      <div class=\"agentation-settings__toggle-row\">\n        <span class=\"agentation-settings__toggle-label\">Webhooks</span>\n        <button\n          class=\"agentation-settings__toggle-button\"\n          [class.agentation-settings__toggle-button--active]=\"service.settings().webhooksEnabled\"\n          (click)=\"onWebhooksToggle()\"\n          type=\"button\"\n        >\n          <span class=\"agentation-settings__toggle-knob\"></span>\n        </button>\n      </div>\n\n      @if (service.settings().webhooksEnabled) {\n        <div class=\"agentation-settings__webhook-url\">\n          <input\n            class=\"agentation-settings__input\"\n            type=\"url\"\n            placeholder=\"https://example.com/webhook\"\n            [ngModel]=\"service.settings().webhookUrl\"\n            (ngModelChange)=\"onWebhookUrlChange($event)\"\n          />\n        </div>\n      }\n    }\n  </div>\n</div>\n} @else {\n<!-- MCP\u30B5\u30D6\u30D3\u30E5\u30FC -->\n<div [class]=\"panelClass\" data-agentation>\n  <!-- \u623B\u308B\u30DC\u30BF\u30F3 -->\n  <button class=\"agentation-settings__back-button\" (click)=\"onCloseMcpPanel()\" type=\"button\">\n    <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\">\n      <path d=\"M8.5 3.5L4 8L8.5 12.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    </svg>\n    <span>Manage MCP & Webhooks</span>\n  </button>\n\n  <!-- MCP Connection\u30BB\u30AF\u30B7\u30E7\u30F3 -->\n  <div class=\"agentation-settings__section\">\n    <div class=\"agentation-settings__section-row\">\n      <span class=\"agentation-settings__section-header\">MCP Connection</span>\n      @if (endpoint) {\n        <div\n          class=\"agentation-settings__mcp-dot\"\n          [class.agentation-settings__mcp-dot--connected]=\"service.connectionStatus() === 'connected'\"\n          [class.agentation-settings__mcp-dot--connecting]=\"service.connectionStatus() === 'connecting'\"\n          [class.agentation-settings__mcp-dot--disconnected]=\"service.connectionStatus() === 'disconnected'\"\n        ></div>\n      }\n    </div>\n    <p class=\"agentation-settings__description\">\n      MCP connection allows agents to receive and act on annotations.\n    </p>\n  </div>\n\n  <!-- Webhooks\u30BB\u30AF\u30B7\u30E7\u30F3 -->\n  <div class=\"agentation-settings__section\">\n    <div class=\"agentation-settings__section-row\">\n      <span class=\"agentation-settings__section-header\">Webhooks</span>\n      <div class=\"agentation-settings__auto-send-row\">\n        <span\n          class=\"agentation-settings__auto-send-label\"\n          [class.agentation-settings__auto-send-label--active]=\"service.settings().webhooksEnabled\"\n        >Auto-Send</span>\n        <button\n          class=\"agentation-settings__toggle-button\"\n          [class.agentation-settings__toggle-button--active]=\"service.settings().webhooksEnabled\"\n          [disabled]=\"!service.settings().webhookUrl\"\n          (click)=\"onWebhooksToggle()\"\n          type=\"button\"\n        >\n          <span class=\"agentation-settings__toggle-knob\"></span>\n        </button>\n      </div>\n    </div>\n    <p class=\"agentation-settings__description\">\n      The webhook URL will receive live annotation changes and annotation data.\n    </p>\n    <textarea\n      class=\"agentation-settings__webhook-textarea\"\n      placeholder=\"Webhook URL\"\n      [ngModel]=\"service.settings().webhookUrl\"\n      (ngModelChange)=\"onWebhookUrlChange($event)\"\n    ></textarea>\n  </div>\n</div>\n}\n", styles: ["@keyframes settingsEnter{0%{opacity:0;transform:scale(.95) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes settingsExit{0%{opacity:1;transform:scale(1) translateY(0)}to{opacity:0;transform:scale(.95) translateY(8px)}}@keyframes connectionPulse{0%,to{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.9)}}[data-agentation] .agentation-settings{position:fixed;bottom:72px;right:20px;width:260px;padding:12px 16px;background:#1a1a1a;border-radius:12px;box-shadow:0 4px 24px #0000004d,0 0 0 1px #ffffff14;z-index:100001;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#fff;opacity:0}[data-agentation] .agentation-settings--enter{animation:settingsEnter .2s cubic-bezier(.34,1.56,.64,1) forwards}[data-agentation] .agentation-settings--entered{opacity:1;transform:scale(1) translateY(0)}[data-agentation] .agentation-settings--exit{animation:settingsExit .15s ease-in forwards}[data-agentation] .agentation-settings--light{background:#fff;color:#000000d9;box-shadow:0 4px 24px #0000001f,0 0 0 1px #0000000f}[data-agentation] .agentation-settings--light .agentation-settings__label{color:#00000080}[data-agentation] .agentation-settings--light .agentation-settings__select,[data-agentation] .agentation-settings--light .agentation-settings__input{background:#00000008;color:#000000d9;border-color:#0000001f}[data-agentation] .agentation-settings--light .agentation-settings__input::placeholder{color:#00000059}[data-agentation] .agentation-settings--light .agentation-settings__close{color:#0006}[data-agentation] .agentation-settings--light .agentation-settings__close:hover{background:#0000000f;color:#000000bf}[data-agentation] .agentation-settings--light .agentation-settings__toggle-label{color:#000000b3}[data-agentation] .agentation-settings--light .agentation-settings__toggle-button{background:#00000026}[data-agentation] .agentation-settings--light .agentation-settings__toggle-button--active{background:#3c82f7}[data-agentation] .agentation-settings--light .agentation-settings__section+.agentation-settings__section{border-color:#0000000f}[data-agentation] .agentation-settings--light .agentation-settings__nav-link{color:#00000080}[data-agentation] .agentation-settings--light .agentation-settings__nav-link:hover{color:#000c}[data-agentation] .agentation-settings--light .agentation-settings__nav-link-right svg{color:#00000040}[data-agentation] .agentation-settings--light .agentation-settings__nav-link:hover .agentation-settings__nav-link-right svg{color:#000c}[data-agentation] .agentation-settings--light .agentation-settings__back-button{color:#000000d9;border-bottom-color:#00000014}[data-agentation] .agentation-settings--light .agentation-settings__section-header{color:#000000d9}[data-agentation] .agentation-settings--light .agentation-settings__description{color:#00000080}[data-agentation] .agentation-settings--light .agentation-settings__auto-send-label{color:#0006}[data-agentation] .agentation-settings--light .agentation-settings__auto-send-label--active{color:#3c82f7}[data-agentation] .agentation-settings--light .agentation-settings__webhook-textarea{background:#00000008;color:#000000d9;border-color:#0000001f}[data-agentation] .agentation-settings--light .agentation-settings__webhook-textarea::placeholder{color:#00000059}[data-agentation] .agentation-settings__header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}[data-agentation] .agentation-settings__title{font-size:13px;font-weight:600}[data-agentation] .agentation-settings__close{cursor:pointer;display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;border:none;background:transparent;color:#ffffff80;font-size:12px;transition:background-color .15s ease,color .15s ease}[data-agentation] .agentation-settings__close:hover{background:#ffffff1a;color:#fffc}[data-agentation] .agentation-settings__section{padding:8px 0}[data-agentation] .agentation-settings__section+[data-agentation] .agentation-settings__section{border-top:1px solid rgba(255,255,255,.08)}[data-agentation] .agentation-settings__label{display:block;font-size:11px;font-weight:500;color:#ffffff80;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}[data-agentation] .agentation-settings__select{width:100%;padding:6px 8px;font-size:13px;font-family:inherit;background:#ffffff0d;color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:6px;outline:none;cursor:pointer;appearance:auto;transition:border-color .15s ease}[data-agentation] .agentation-settings__select:focus{border-color:#3c82f7}[data-agentation] .agentation-settings__select option{background:#2a2a2a;color:#fff}[data-agentation] .agentation-settings__input{width:100%;padding:6px 8px;font-size:12px;font-family:inherit;background:#ffffff0d;color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:6px;outline:none;box-sizing:border-box;transition:border-color .15s ease;margin-top:6px}[data-agentation] .agentation-settings__input:focus{border-color:#3c82f7}[data-agentation] .agentation-settings__input::placeholder{color:#ffffff59}[data-agentation] .agentation-settings__colors{display:flex;gap:6px;flex-wrap:wrap}[data-agentation] .agentation-settings__color-swatch{width:24px;height:24px;border-radius:50%;border:2px solid transparent;cursor:pointer;padding:0;transition:border-color .15s ease,transform .1s ease}[data-agentation] .agentation-settings__color-swatch:hover{transform:scale(1.1)}[data-agentation] .agentation-settings__color-swatch:active{transform:scale(.95)}[data-agentation] .agentation-settings__color-swatch--active{border-color:#fff;box-shadow:0 0 0 1px #0000004d}[data-agentation] .agentation-settings__toggle-row{display:flex;align-items:center;justify-content:space-between;padding:4px 0}[data-agentation] .agentation-settings__toggle-label{font-size:13px;color:#ffffffd9}[data-agentation] .agentation-settings__toggle-button{position:relative;width:36px;height:20px;border-radius:10px;border:none;background:#fff3;cursor:pointer;padding:0;flex-shrink:0;transition:background-color .2s ease}[data-agentation] .agentation-settings__toggle-button--active{background:#3c82f7}[data-agentation] .agentation-settings__toggle-knob{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .2s ease}.agentation-settings__toggle-button--active [data-agentation] .agentation-settings__toggle-knob{transform:translate(16px)}[data-agentation] .agentation-settings__webhook-url{margin-top:4px}[data-agentation] .agentation-settings__nav-link{display:flex;align-items:center;justify-content:space-between;width:100%;padding:0;border:none;background:transparent;font-family:inherit;font-size:13px;font-weight:400;color:#ffffff80;cursor:pointer;transition:color .15s ease}[data-agentation] .agentation-settings__nav-link:hover{color:#ffffffe6}[data-agentation] .agentation-settings__nav-link-right{display:flex;align-items:center;gap:6px}[data-agentation] .agentation-settings__nav-link-right svg{color:#fff6;transition:color .15s ease}[data-agentation] .agentation-settings__nav-link:hover .agentation-settings__nav-link-right svg{color:#fff}[data-agentation] .agentation-settings__nav-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}[data-agentation] .agentation-settings__nav-dot--connected{background:#34c759;animation:connectionPulse 2.5s ease-in-out infinite}[data-agentation] .agentation-settings__nav-dot--connecting{background:#f5a623;animation:connectionPulse 1.5s ease-in-out infinite}[data-agentation] .agentation-settings__back-button{display:flex;align-items:center;gap:4px;padding:6px 0 12px;margin:-6px 0 8px;border:none;border-bottom:1px solid rgba(255,255,255,.07);border-radius:0;background:transparent;font-family:inherit;font-size:13px;font-weight:500;letter-spacing:-.15px;color:#fff;cursor:pointer;transition:transform .12s cubic-bezier(.32,.72,0,1)}[data-agentation] .agentation-settings__back-button svg{opacity:.4;flex-shrink:0;transition:opacity .15s ease,transform .18s cubic-bezier(.32,.72,0,1)}[data-agentation] .agentation-settings__back-button:hover svg{opacity:1}[data-agentation] .agentation-settings__section-row{display:flex;align-items:center;justify-content:space-between}[data-agentation] .agentation-settings__section-header{font-size:13px;font-weight:400;color:#fff}[data-agentation] .agentation-settings__description{font-size:11px;font-weight:300;color:#ffffff80;margin-top:2px;line-height:14px}[data-agentation] .agentation-settings__mcp-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}[data-agentation] .agentation-settings__mcp-dot--connected{background:#34c759;animation:connectionPulse 2.5s ease-in-out infinite}[data-agentation] .agentation-settings__mcp-dot--connecting{background:#f5a623;animation:connectionPulse 1.5s ease-in-out infinite}[data-agentation] .agentation-settings__mcp-dot--disconnected{background:#ff3b30}[data-agentation] .agentation-settings__auto-send-row{display:flex;align-items:center;gap:8px}[data-agentation] .agentation-settings__auto-send-label{font-size:11px;font-weight:400;color:#fff6;transition:color .15s ease}[data-agentation] .agentation-settings__auto-send-label--active{color:#66b8ff}[data-agentation] .agentation-settings__webhook-textarea{display:block;width:100%;min-height:60px;box-sizing:border-box;margin-top:11px;padding:8px 10px;border:1px solid rgba(255,255,255,.1);border-radius:6px;background:#ffffff08;font-family:inherit;font-size:12px;font-weight:400;color:#fff;outline:none;resize:none;cursor:text!important;-webkit-user-select:text;user-select:text;transition:border-color .15s ease,background .15s ease,box-shadow .15s ease}[data-agentation] .agentation-settings__webhook-textarea::placeholder{color:#ffffff4d}[data-agentation] .agentation-settings__webhook-textarea:focus{border-color:#3c82f7}\n"] }]
        }], propDecorators: { service: [{
                type: Input,
                args: [{ required: true }]
            }], endpoint: [{
                type: Input
            }] } });

// =============================================================================
// Agentation用カスタムOverlayContainer
// =============================================================================
/**
 * CDK Overlayがdocument.body直下に挿入する要素に
 * data-agentation属性を付与してスタイルスコープを確保する
 */
class AgentationOverlayContainer extends OverlayContainer {
    _createContainer() {
        super._createContainer();
        // スタイルスコープ用属性を付与
        this._containerElement.setAttribute('data-agentation', '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: AgentationOverlayContainer, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: AgentationOverlayContainer });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: AgentationOverlayContainer, decorators: [{
            type: Injectable
        }] });

// =============================================================================
// ストレージユーティリティ
// =============================================================================
//
// TODO: カスタムストレージ用のStorageAdapterインターフェースに抽象化
// (IndexedDB, APIバックエンド等)
//
const STORAGE_PREFIX = "feedback-annotations-";
const DEFAULT_RETENTION_DAYS = 7;
function getStorageKey(pathname) {
    return `${STORAGE_PREFIX}${pathname}`;
}
function loadAnnotations(pathname) {
    if (typeof window === "undefined")
        return [];
    try {
        const stored = localStorage.getItem(getStorageKey(pathname));
        if (!stored)
            return [];
        const data = JSON.parse(stored);
        const cutoff = Date.now() - DEFAULT_RETENTION_DAYS * 24 * 60 * 60 * 1000;
        return data.filter((a) => !a.timestamp || a.timestamp > cutoff);
    }
    catch {
        return [];
    }
}
function saveAnnotations(pathname, annotations) {
    if (typeof window === "undefined")
        return;
    try {
        localStorage.setItem(getStorageKey(pathname), JSON.stringify(annotations));
    }
    catch {
        // localStorageが満杯か無効
    }
}
function clearAnnotations(pathname) {
    if (typeof window === "undefined")
        return;
    try {
        localStorage.removeItem(getStorageKey(pathname));
    }
    catch {
        // 無視
    }
}
/**
 * 全ページのlocalStorageからアノテーションを読み込み
 * pathname -> アノテーション配列のMapを返す
 */
function loadAllAnnotations() {
    const result = new Map();
    if (typeof window === "undefined")
        return result;
    try {
        const cutoff = Date.now() - DEFAULT_RETENTION_DAYS * 24 * 60 * 60 * 1000;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith(STORAGE_PREFIX)) {
                const pathname = key.slice(STORAGE_PREFIX.length);
                const stored = localStorage.getItem(key);
                if (stored) {
                    const data = JSON.parse(stored);
                    const filtered = data.filter((a) => !a.timestamp || a.timestamp > cutoff);
                    if (filtered.length > 0) {
                        result.set(pathname, filtered);
                    }
                }
            }
        }
    }
    catch {
        // エラーを無視
    }
    return result;
}
/**
 * 同期マーカー付きでアノテーションを保存
 * 保存前に各アノテーションに`_syncedTo: sessionId`を追加
 */
function saveAnnotationsWithSyncMarker(pathname, annotations, sessionId) {
    const marked = annotations.map((annotation) => ({
        ...annotation,
        _syncedTo: sessionId,
    }));
    saveAnnotations(pathname, marked);
}
/**
 * 指定セッションに未同期のアノテーションを取得
 * `_syncedTo`マーカーがないか、異なるセッションIDのアノテーションを返す
 * sessionIdが未指定の場合、同期マーカーがないアノテーションを返す
 */
function getUnsyncedAnnotations(pathname, sessionId) {
    const annotations = loadAnnotations(pathname);
    return annotations.filter((annotation) => {
        if (!annotation._syncedTo)
            return true;
        if (sessionId && annotation._syncedTo !== sessionId)
            return true;
        return false;
    });
}
/**
 * パス名に対する全アノテーションの`_syncedTo`マーカーを除去
 * 同期状態のリセットや同期先の変更時に有用
 */
function clearSyncMarkers(pathname) {
    const annotations = loadAnnotations(pathname);
    const cleaned = annotations.map((annotation) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _syncedTo, ...rest } = annotation;
        return rest;
    });
    saveAnnotations(pathname, cleaned);
}
// =============================================================================
// セッションストレージ
// =============================================================================
const SESSION_PREFIX = "agentation-session-";
function getSessionStorageKey(pathname) {
    return `${SESSION_PREFIX}${pathname}`;
}
function loadSessionId(pathname) {
    if (typeof window === "undefined")
        return null;
    try {
        return localStorage.getItem(getSessionStorageKey(pathname));
    }
    catch {
        return null;
    }
}
function saveSessionId(pathname, sessionId) {
    if (typeof window === "undefined")
        return;
    try {
        localStorage.setItem(getSessionStorageKey(pathname), sessionId);
    }
    catch {
        // localStorageが満杯か無効
    }
}
function clearSessionId(pathname) {
    if (typeof window === "undefined")
        return;
    try {
        localStorage.removeItem(getSessionStorageKey(pathname));
    }
    catch {
        // 無視
    }
}

// =============================================================================
// サーバー同期ユーティリティ
// =============================================================================
//
// Agentationプロトコルのオプションサーバー同期機能
// エンドポイントが提供された場合、アノテーションをサーバーに同期
// ネットワークエラー時はローカルのみモードにグレースフルにフォールバック
//
/**
 * サーバーから全セッションを取得
 */
async function listSessions(endpoint) {
    const response = await fetch(`${endpoint}/sessions`);
    if (!response.ok) {
        throw new Error(`Failed to list sessions: ${response.status}`);
    }
    return response.json();
}
/**
 * サーバーに新しいセッションを作成
 */
async function createSession(endpoint, url) {
    const response = await fetch(`${endpoint}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
    });
    if (!response.ok) {
        throw new Error(`Failed to create session: ${response.status}`);
    }
    return response.json();
}
/**
 * 既存のセッションをアノテーション付きで取得
 */
async function getSession(endpoint, sessionId) {
    const response = await fetch(`${endpoint}/sessions/${sessionId}`);
    if (!response.ok) {
        throw new Error(`Failed to get session: ${response.status}`);
    }
    return response.json();
}
/**
 * 新しいアノテーションをサーバーに同期
 * サーバーが割り当てたフィールドを含むアノテーションを返す
 */
async function syncAnnotation(endpoint, sessionId, annotation) {
    const response = await fetch(`${endpoint}/sessions/${sessionId}/annotations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(annotation),
    });
    if (!response.ok) {
        throw new Error(`Failed to sync annotation: ${response.status}`);
    }
    return response.json();
}
/**
 * サーバー上のアノテーションを更新
 */
async function updateAnnotation(endpoint, annotationId, data) {
    const response = await fetch(`${endpoint}/annotations/${annotationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Failed to update annotation: ${response.status}`);
    }
    return response.json();
}
/**
 * サーバーからアノテーションを削除
 */
async function deleteAnnotation(endpoint, annotationId) {
    const response = await fetch(`${endpoint}/annotations/${annotationId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Failed to delete annotation: ${response.status}`);
    }
}
/**
 * エージェントにアノテーションへのアクション実行を要求
 * SSE経由でaction.requestedイベントを発行し、接続済みエージェントに通知
 * UIが正確なフィードバックを表示できるよう配信情報を返す
 */
async function requestAction(endpoint, sessionId, output) {
    const response = await fetch(`${endpoint}/sessions/${sessionId}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ output }),
    });
    if (!response.ok) {
        throw new Error(`Failed to request action: ${response.status}`);
    }
    return response.json();
}

// =============================================================================
// 出力生成ユーティリティ
// =============================================================================
/**
 * アノテーション配列からMarkdown形式の出力テキストを生成
 */
function generateOutput(annotations, pathname, detailLevel = 'standard', angularMode = 'filtered') {
    if (annotations.length === 0)
        return '';
    const viewport = typeof window !== 'undefined'
        ? `${window.innerWidth}×${window.innerHeight}`
        : 'unknown';
    let output = `## Page Feedback: ${pathname}\n`;
    if (detailLevel === 'forensic') {
        // フォレンジックモード用のフル環境情報
        output += `\n**Environment:**\n`;
        output += `- Viewport: ${viewport}\n`;
        if (typeof window !== 'undefined') {
            output += `- URL: ${window.location.href}\n`;
            output += `- User Agent: ${navigator.userAgent}\n`;
            output += `- Timestamp: ${new Date().toISOString()}\n`;
            output += `- Device Pixel Ratio: ${window.devicePixelRatio}\n`;
        }
        output += `\n---\n`;
    }
    else if (detailLevel !== 'compact') {
        output += `**Viewport:** ${viewport}\n`;
    }
    output += '\n';
    annotations.forEach((a, i) => {
        if (detailLevel === 'compact') {
            output += `${i + 1}. **${a.element}**: ${a.comment}`;
            if (a.selectedText) {
                output += ` (re: "${a.selectedText.slice(0, 30)}${a.selectedText.length > 30 ? '...' : ''}")`;
            }
            output += '\n';
        }
        else if (detailLevel === 'forensic') {
            // フォレンジックモード - 出力ページの例に合わせた順序
            output += `### ${i + 1}. ${a.element}\n`;
            if (a.isMultiSelect && a.fullPath) {
                output += `*Forensic data shown for first element of selection*\n`;
            }
            if (a.fullPath) {
                output += `**Full DOM Path:** ${a.fullPath}\n`;
            }
            if (a.cssClasses) {
                output += `**CSS Classes:** ${a.cssClasses}\n`;
            }
            if (a.boundingBox) {
                output += `**Position:** x:${Math.round(a.boundingBox.x)}, y:${Math.round(a.boundingBox.y)} (${Math.round(a.boundingBox.width)}×${Math.round(a.boundingBox.height)}px)\n`;
            }
            output += `**Annotation at:** ${a.x.toFixed(1)}% from left, ${Math.round(a.y)}px from top\n`;
            if (a.selectedText) {
                output += `**Selected text:** "${a.selectedText}"\n`;
            }
            if (a.nearbyText && !a.selectedText) {
                output += `**Context:** ${a.nearbyText.slice(0, 100)}\n`;
            }
            if (a.computedStyles) {
                output += `**Computed Styles:** ${a.computedStyles}\n`;
            }
            if (a.accessibility) {
                output += `**Accessibility:** ${a.accessibility}\n`;
            }
            if (a.nearbyElements) {
                output += `**Nearby Elements:** ${a.nearbyElements}\n`;
            }
            if (a.angularComponents) {
                output += `**Angular:** ${a.angularComponents}\n`;
            }
            output += `**Feedback:** ${a.comment}\n\n`;
        }
        else {
            // スタンダード・詳細モード
            output += `### ${i + 1}. ${a.element}\n`;
            output += `**Location:** ${a.elementPath}\n`;
            // Angularコンポーネント（スタンダード・詳細両方で表示）
            if (a.angularComponents) {
                output += `**Angular:** ${a.angularComponents}\n`;
            }
            if (detailLevel === 'detailed') {
                if (a.cssClasses) {
                    output += `**Classes:** ${a.cssClasses}\n`;
                }
                if (a.boundingBox) {
                    output += `**Position:** ${Math.round(a.boundingBox.x)}px, ${Math.round(a.boundingBox.y)}px (${Math.round(a.boundingBox.width)}×${Math.round(a.boundingBox.height)}px)\n`;
                }
            }
            if (a.selectedText) {
                output += `**Selected text:** "${a.selectedText}"\n`;
            }
            if (detailLevel === 'detailed' && a.nearbyText && !a.selectedText) {
                output += `**Context:** ${a.nearbyText.slice(0, 100)}\n`;
            }
            output += `**Feedback:** ${a.comment}\n\n`;
        }
    });
    return output.trim();
}

// =============================================================================
// AgentationService - Angular Signalsベースの状態管理サービス
// =============================================================================
/** UUID生成（crypto.randomUUID非対応ブラウザ用フォールバック） */
function generateId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    // フォールバック: Math.random()ベース
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
class AgentationService {
    // ツールバーUI状態
    toolbarState = signal({
        isActive: false,
        showMarkers: true,
        markersVisible: false,
        markersExiting: false,
        isDarkMode: false,
        showSettings: false,
        showSettingsVisible: false,
        settingsPage: 'main',
        toolbarPosition: null,
        isTransitioning: false,
        tooltipsHidden: false,
        mounted: false,
    });
    // アノテーション状態
    annotationState = signal({
        annotations: [],
        pendingAnnotation: null,
        editingAnnotation: null,
        hoveredMarkerId: null,
        deletingMarkerId: null,
        exitingMarkers: new Set(),
        renumberFrom: null,
    });
    // ホバー情報
    hoverInfo = signal(null);
    hoverPosition = signal({ x: 0, y: 0 });
    // サーバー接続状態
    syncState = signal({
        connectionStatus: 'disconnected',
        currentSessionId: null,
    });
    // アクションUI状態
    actionState = signal({
        copied: false,
        sendState: 'idle',
        cleared: false,
        isClearing: false,
    });
    // フリーズ状態
    isFrozen = signal(false);
    // スクロール状態
    scrollY = signal(0);
    isScrolling = signal(false);
    // 設定
    settings = signal(DEFAULT_SETTINGS);
    // ===== 算出状態 =====
    annotations = computed(() => this.annotationState().annotations);
    hasAnnotations = computed(() => this.annotations().length > 0);
    isActive = computed(() => this.toolbarState().isActive);
    pendingAnnotation = computed(() => this.annotationState().pendingAnnotation);
    editingAnnotation = computed(() => this.annotationState().editingAnnotation);
    showMarkers = computed(() => this.toolbarState().showMarkers);
    markersVisible = computed(() => this.toolbarState().markersVisible);
    connectionStatus = computed(() => this.syncState().connectionStatus);
    currentSessionId = computed(() => this.syncState().currentSessionId);
    // Angular検出モード（設定の出力詳細レベルから導出）
    angularMode = computed(() => {
        const s = this.settings();
        if (!s.angularEnabled)
            return 'off';
        return OUTPUT_TO_ANGULAR_MODE[s.outputDetail];
    });
    // エンドポイントとパス名（コンポーネントから設定される）
    endpoint;
    pathname = '';
    webhookUrl;
    /** クリップボード書き込みフラグ（コンポーネントから設定） */
    copyToClipboardEnabled = true;
    // ===== 初期化 =====
    /** コンポーネントからの設定注入 */
    configure(config) {
        this.endpoint = config.endpoint;
        this.webhookUrl = config.webhookUrl;
        this.pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
        if (config.sessionId) {
            this.syncState.update(s => ({ ...s, currentSessionId: config.sessionId }));
        }
        // localStorageからアノテーション読み込み
        const stored = loadAnnotations(this.pathname);
        if (stored.length > 0) {
            this.annotationState.update(s => ({ ...s, annotations: stored }));
        }
        this.toolbarState.update(s => ({ ...s, mounted: true }));
    }
    // ===== ツールバーアクション =====
    activate() {
        this.toolbarState.update(s => ({ ...s, isActive: true }));
    }
    deactivate() {
        this.toolbarState.update(s => ({
            ...s,
            isActive: false,
            showSettings: false,
            showSettingsVisible: false,
        }));
        this.annotationState.update(s => ({
            ...s,
            pendingAnnotation: null,
            editingAnnotation: null,
        }));
        this.hoverInfo.set(null);
    }
    toggleMarkers() {
        this.toolbarState.update(s => ({ ...s, showMarkers: !s.showMarkers }));
    }
    toggleSettings() {
        this.toolbarState.update(s => ({
            ...s,
            showSettings: !s.showSettings,
            showSettingsVisible: !s.showSettings,
            settingsPage: 'main',
        }));
    }
    toggleDarkMode() {
        this.toolbarState.update(s => ({ ...s, isDarkMode: !s.isDarkMode }));
    }
    updateSettings(partial) {
        this.settings.update(s => ({ ...s, ...partial }));
    }
    setToolbarPosition(pos) {
        this.toolbarState.update(s => ({ ...s, toolbarPosition: pos }));
    }
    // ===== アノテーション操作 =====
    /** 新しいアノテーション要素の選択を開始 */
    startAnnotation(pending) {
        this.annotationState.update(s => ({
            ...s,
            pendingAnnotation: pending,
            editingAnnotation: null,
        }));
    }
    /** アノテーション追加（テキスト入力完了後） */
    addAnnotation(comment) {
        const pending = this.annotationState().pendingAnnotation;
        if (!pending)
            return null;
        const annotation = {
            id: generateId(),
            x: pending.x,
            y: pending.y,
            comment,
            element: pending.element,
            elementPath: pending.elementPath,
            timestamp: Date.now(),
            selectedText: pending.selectedText,
            boundingBox: pending.boundingBox,
            nearbyText: pending.nearbyText,
            cssClasses: pending.cssClasses,
            isMultiSelect: pending.isMultiSelect,
            isFixed: pending.isFixed,
            fullPath: pending.fullPath,
            accessibility: pending.accessibility,
            computedStyles: pending.computedStyles,
            nearbyElements: pending.nearbyElements,
            angularComponents: pending.angularComponents,
            elementBoundingBoxes: pending.elementBoundingBoxes,
        };
        this.annotationState.update(s => ({
            ...s,
            annotations: [...s.annotations, annotation],
            pendingAnnotation: null,
        }));
        // localStorageに保存
        this.persistAnnotations();
        // サーバー同期
        this.syncToServer(annotation);
        return annotation;
    }
    /** アノテーション削除 */
    deleteAnnotation(id) {
        const annotation = this.annotations().find(a => a.id === id);
        if (!annotation)
            return undefined;
        // 退場アニメーション設定
        this.annotationState.update(s => ({
            ...s,
            deletingMarkerId: id,
            exitingMarkers: new Set(s.exitingMarkers).add(id),
        }));
        // アニメーション完了後に実際に削除
        setTimeout(() => {
            this.annotationState.update(s => {
                const newExiting = new Set(s.exitingMarkers);
                newExiting.delete(id);
                return {
                    ...s,
                    annotations: s.annotations.filter(a => a.id !== id),
                    deletingMarkerId: null,
                    exitingMarkers: newExiting,
                };
            });
            this.persistAnnotations();
        }, 150);
        // サーバーから削除
        if (this.endpoint && this.syncState().currentSessionId) {
            deleteAnnotation(this.endpoint, id).catch(() => { });
        }
        return annotation;
    }
    /** アノテーション更新（コメント編集） */
    updateAnnotation(id, comment) {
        let updated;
        this.annotationState.update(s => {
            const idx = s.annotations.findIndex(a => a.id === id);
            if (idx === -1)
                return s;
            const newAnnotations = [...s.annotations];
            newAnnotations[idx] = { ...newAnnotations[idx], comment };
            updated = newAnnotations[idx];
            return { ...s, annotations: newAnnotations, editingAnnotation: null };
        });
        this.persistAnnotations();
        // サーバー更新
        if (updated && this.endpoint && this.syncState().currentSessionId) {
            updateAnnotation(this.endpoint, id, { comment }).catch(() => { });
        }
        return updated;
    }
    /** 全アノテーション削除 */
    clearAll() {
        const cleared = [...this.annotations()];
        this.annotationState.update(s => ({
            ...s,
            annotations: [],
            pendingAnnotation: null,
            editingAnnotation: null,
        }));
        this.persistAnnotations();
        // サーバーから各アノテーションを削除
        if (this.endpoint && this.syncState().currentSessionId) {
            for (const annotation of cleared) {
                deleteAnnotation(this.endpoint, annotation.id).catch(() => { });
            }
        }
        return cleared;
    }
    /** アノテーション編集モード開始 */
    startEditing(annotation) {
        this.annotationState.update(s => ({
            ...s,
            editingAnnotation: annotation,
            pendingAnnotation: null,
        }));
    }
    /** アノテーション編集モードキャンセル */
    cancelEditing() {
        this.annotationState.update(s => ({ ...s, editingAnnotation: null }));
    }
    /** 保留中アノテーションのキャンセル */
    cancelPending() {
        this.annotationState.update(s => ({ ...s, pendingAnnotation: null }));
    }
    // ===== ホバー状態 =====
    updateHover(info, position) {
        this.hoverInfo.set(info);
        if (position) {
            this.hoverPosition.set(position);
        }
    }
    setHoveredMarker(id) {
        this.annotationState.update(s => ({ ...s, hoveredMarkerId: id }));
    }
    // ===== 出力・コピー =====
    async copyOutput() {
        const output = generateOutput(this.annotations(), this.pathname, this.settings().outputDetail, this.angularMode());
        if (this.copyToClipboardEnabled) {
            try {
                await navigator.clipboard.writeText(output);
                this.actionState.update(s => ({ ...s, copied: true }));
                setTimeout(() => {
                    this.actionState.update(s => ({ ...s, copied: false }));
                }, 2000);
            }
            catch {
                // クリップボードアクセス失敗
            }
        }
        // 自動クリア設定
        if (this.settings().autoClearAfterCopy) {
            this.clearAll();
        }
        return output;
    }
    /** サーバーにアクションを送信 */
    async sendToAgent() {
        if (!this.endpoint || !this.syncState().currentSessionId)
            return;
        this.actionState.update(s => ({ ...s, sendState: 'sending' }));
        const output = generateOutput(this.annotations(), this.pathname, this.settings().outputDetail, this.angularMode());
        try {
            await requestAction(this.endpoint, this.syncState().currentSessionId, output);
            this.actionState.update(s => ({ ...s, sendState: 'sent' }));
            setTimeout(() => {
                this.actionState.update(s => ({ ...s, sendState: 'idle' }));
            }, 2000);
        }
        catch {
            this.actionState.update(s => ({ ...s, sendState: 'failed' }));
            setTimeout(() => {
                this.actionState.update(s => ({ ...s, sendState: 'idle' }));
            }, 2000);
        }
    }
    // ===== フリーズ制御 =====
    toggleFreeze() {
        // freeze/unfreezeはfreeze-animations.tsから呼び出し
        this.isFrozen.update(v => !v);
    }
    // ===== スクロール状態 =====
    updateScrollY(y) {
        this.scrollY.set(y);
    }
    setScrolling(isScrolling) {
        this.isScrolling.set(isScrolling);
    }
    // ===== プライベート =====
    /** localStorageへの永続化 */
    persistAnnotations() {
        const sessionId = this.syncState().currentSessionId;
        if (sessionId) {
            saveAnnotationsWithSyncMarker(this.pathname, this.annotations(), sessionId);
        }
        else {
            saveAnnotations(this.pathname, this.annotations());
        }
    }
    /** サーバーへの同期 */
    async syncToServer(annotation) {
        if (!this.endpoint)
            return;
        const sessionId = this.syncState().currentSessionId;
        if (!sessionId)
            return;
        const url = typeof window !== 'undefined' ? window.location.href : '';
        try {
            await syncAnnotation(this.endpoint, sessionId, {
                ...annotation,
                sessionId,
                url,
            });
        }
        catch {
            // 同期失敗時は無視（localStorageにはすでに保存済み）
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: AgentationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: AgentationService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: AgentationService, decorators: [{
            type: Injectable
        }] });

// =============================================================================
// DOM・UIユーティリティ関数
// =============================================================================
/**
 * Shadow DOMを貫通して最深の要素を取得
 * document.elementFromPoint()はshadowホストで止まるため、
 * 再帰的にオープンshadow rootの内部をチェックして実際のターゲットを見つける
 */
function deepElementFromPoint(x, y) {
    let element = document.elementFromPoint(x, y);
    if (!element)
        return null;
    // Shadow rootを通して掘り下げ続ける
    while (element?.shadowRoot) {
        const deeper = element.shadowRoot.elementFromPoint(x, y);
        if (!deeper || deeper === element)
            break;
        element = deeper;
    }
    return element;
}
/**
 * 要素がfixed/sticky配置かどうか判定
 */
function isElementFixed(element) {
    let current = element;
    while (current && current !== document.body) {
        const style = window.getComputedStyle(current);
        const position = style.position;
        if (position === "fixed" || position === "sticky") {
            return true;
        }
        current = current.parentElement;
    }
    return false;
}
/**
 * HEX色コードをRGBA文字列に変換
 */
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/**
 * 日付文字列を相対時間表記に変換
 */
function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);
    if (diffSec < 60)
        return "just now";
    if (diffMin < 60)
        return `${diffMin}m ago`;
    if (diffHr < 24)
        return `${diffHr}h ago`;
    if (diffDay < 7)
        return `${diffDay}d ago`;
    return date.toLocaleDateString();
}
/**
 * URLを短縮表示用に切り詰め
 */
function truncateUrl(url) {
    try {
        const parsed = new URL(url);
        const path = parsed.pathname;
        // パスを表示、長すぎる場合は切り詰め
        if (path.length > 25) {
            return "..." + path.slice(-22);
        }
        return path || "/";
    }
    catch {
        // URLパースに失敗した場合は文字列を単純に切り詰め
        if (url.length > 25) {
            return "..." + url.slice(-22);
        }
        return url;
    }
}
/**
 * 有効なHTTP(S) URLかどうかを検証
 */
function isValidUrl(url) {
    if (!url || !url.trim())
        return false;
    try {
        const parsed = new URL(url.trim());
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    }
    catch {
        return false;
    }
}

// =============================================================================
// 要素識別ユーティリティ
// =============================================================================
// =============================================================================
// Shadow DOMヘルパー
// =============================================================================
/**
 * 親要素を取得（Shadow DOM境界を越える）
 * Shadow Root内でparentElementがない場合、shadowホストを返す
 */
function getParentElement(element) {
    if (element.parentElement) {
        return element.parentElement;
    }
    const root = element.getRootNode();
    if (root instanceof ShadowRoot) {
        return root.host;
    }
    return null;
}
/**
 * Shadow DOM境界を越えて最も近い祖先要素を検索
 */
function closestCrossingShadow(element, selector) {
    let current = element;
    while (current) {
        if (current.matches(selector))
            return current;
        current = getParentElement(current);
    }
    return null;
}
/**
 * 要素がShadow DOM内にあるか判定
 */
function isInShadowDOM(element) {
    return element.getRootNode() instanceof ShadowRoot;
}
/**
 * 要素のshadowホストを取得（Shadow DOM内でない場合はnull）
 */
function getShadowHost(element) {
    const root = element.getRootNode();
    if (root instanceof ShadowRoot) {
        return root.host;
    }
    return null;
}
// =============================================================================
// 要素パスユーティリティ
// =============================================================================
/**
 * 要素の読みやすいパスを取得（例: "article > section > p"）
 * Shadow DOM内の要素もShadow境界を越えてサポート
 */
function getElementPath(target, maxDepth = 4) {
    const parts = [];
    let current = target;
    let depth = 0;
    while (current && depth < maxDepth) {
        const tag = current.tagName.toLowerCase();
        // 汎用ラッパーはスキップ
        if (tag === "html" || tag === "body")
            break;
        // 識別子を取得
        let identifier = tag;
        if (current.id) {
            identifier = `#${current.id}`;
        }
        else if (current.className && typeof current.className === "string") {
            const meaningfulClass = current.className
                .split(/\s+/)
                .find(c => c.length > 2 && !c.match(/^[a-z]{1,2}$/) && !c.match(/[A-Z0-9]{5,}/));
            if (meaningfulClass) {
                identifier = `.${meaningfulClass.split("_")[0]}`;
            }
        }
        // Shadow境界の越境をマーク
        const nextParent = getParentElement(current);
        if (!current.parentElement && nextParent) {
            identifier = `⟨shadow⟩ ${identifier}`;
        }
        parts.unshift(identifier);
        current = nextParent;
        depth++;
    }
    return parts.join(" > ");
}
/**
 * 要素を識別して人間が読みやすい名前とパスを返す
 */
function identifyElement(target) {
    const path = getElementPath(target);
    if (target.dataset['element']) {
        return { name: target.dataset['element'], path };
    }
    const tag = target.tagName.toLowerCase();
    // SVG要素
    if (["path", "circle", "rect", "line", "g"].includes(tag)) {
        // 親SVGのコンテキストを取得（Shadow境界を越える）
        const svg = closestCrossingShadow(target, "svg");
        if (svg) {
            const parent = getParentElement(svg);
            if (parent instanceof HTMLElement) {
                const parentName = identifyElement(parent).name;
                return { name: `graphic in ${parentName}`, path };
            }
        }
        return { name: "graphic element", path };
    }
    if (tag === "svg") {
        const parent = getParentElement(target);
        if (parent?.tagName.toLowerCase() === "button") {
            const btnText = parent.textContent?.trim();
            return { name: btnText ? `icon in "${btnText}" button` : "button icon", path };
        }
        return { name: "icon", path };
    }
    // インタラクティブ要素
    if (tag === "button") {
        const text = target.textContent?.trim();
        const ariaLabel = target.getAttribute("aria-label");
        if (ariaLabel)
            return { name: `button [${ariaLabel}]`, path };
        return { name: text ? `button "${text.slice(0, 25)}"` : "button", path };
    }
    if (tag === "a") {
        const text = target.textContent?.trim();
        const href = target.getAttribute("href");
        if (text)
            return { name: `link "${text.slice(0, 25)}"`, path };
        if (href)
            return { name: `link to ${href.slice(0, 30)}`, path };
        return { name: "link", path };
    }
    if (tag === "input") {
        const type = target.getAttribute("type") || "text";
        const placeholder = target.getAttribute("placeholder");
        const name = target.getAttribute("name");
        if (placeholder)
            return { name: `input "${placeholder}"`, path };
        if (name)
            return { name: `input [${name}]`, path };
        return { name: `${type} input`, path };
    }
    // 見出し
    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)) {
        const text = target.textContent?.trim();
        return { name: text ? `${tag} "${text.slice(0, 35)}"` : tag, path };
    }
    // テキスト要素
    if (tag === "p") {
        const text = target.textContent?.trim();
        if (text)
            return { name: `paragraph: "${text.slice(0, 40)}${text.length > 40 ? '...' : ''}"`, path };
        return { name: "paragraph", path };
    }
    if (tag === "span" || tag === "label") {
        const text = target.textContent?.trim();
        if (text && text.length < 40)
            return { name: `"${text}"`, path };
        return { name: tag, path };
    }
    if (tag === "li") {
        const text = target.textContent?.trim();
        if (text && text.length < 40)
            return { name: `list item: "${text.slice(0, 35)}"`, path };
        return { name: "list item", path };
    }
    if (tag === "blockquote")
        return { name: "blockquote", path };
    if (tag === "code") {
        const text = target.textContent?.trim();
        if (text && text.length < 30)
            return { name: `code: \`${text}\``, path };
        return { name: "code", path };
    }
    if (tag === "pre")
        return { name: "code block", path };
    // メディア
    if (tag === "img") {
        const alt = target.getAttribute("alt");
        return { name: alt ? `image "${alt.slice(0, 30)}"` : "image", path };
    }
    if (tag === "video")
        return { name: "video", path };
    // コンテナ - 意味のある名前を推測
    if (["div", "section", "article", "nav", "header", "footer", "aside", "main"].includes(tag)) {
        const className = target.className;
        const role = target.getAttribute("role");
        const ariaLabel = target.getAttribute("aria-label");
        if (ariaLabel)
            return { name: `${tag} [${ariaLabel}]`, path };
        if (role)
            return { name: `${role}`, path };
        if (typeof className === "string" && className) {
            const words = className
                .split(/[\s_-]+/)
                .map((c) => c.replace(/[A-Z0-9]{5,}.*$/, "")) // CSSモジュールのハッシュを除去
                .filter((c) => c.length > 2 && !/^[a-z]{1,2}$/.test(c))
                .slice(0, 2);
            if (words.length > 0)
                return { name: words.join(" "), path };
        }
        return { name: tag === "div" ? "container" : tag, path };
    }
    return { name: tag, path };
}
/**
 * 要素とその兄弟からテキストコンテンツを取得（コンテキスト用）
 */
function getNearbyText(element) {
    const texts = [];
    // 自身のテキスト
    const ownText = element.textContent?.trim();
    if (ownText && ownText.length < 100) {
        texts.push(ownText);
    }
    // 前の兄弟のテキスト
    const prev = element.previousElementSibling;
    if (prev) {
        const prevText = prev.textContent?.trim();
        if (prevText && prevText.length < 50) {
            texts.unshift(`[before: "${prevText.slice(0, 40)}"]`);
        }
    }
    // 次の兄弟のテキスト
    const next = element.nextElementSibling;
    if (next) {
        const nextText = next.textContent?.trim();
        if (nextText && nextText.length < 50) {
            texts.push(`[after: "${nextText.slice(0, 40)}"]`);
        }
    }
    return texts.join(" ");
}
/**
 * アニメーションフィードバック用の簡略化された要素識別子
 */
function identifyAnimationElement(target) {
    // data属性による明示的なラベリングを許可
    if (target.dataset['element'])
        return target.dataset['element'];
    const tag = target.tagName.toLowerCase();
    // SVG要素
    if (tag === "path")
        return "path";
    if (tag === "circle")
        return "circle";
    if (tag === "rect")
        return "rectangle";
    if (tag === "line")
        return "line";
    if (tag === "ellipse")
        return "ellipse";
    if (tag === "polygon")
        return "polygon";
    if (tag === "g")
        return "group";
    if (tag === "svg")
        return "svg";
    // インタラクティブ要素
    if (tag === "button") {
        const text = target.textContent?.trim();
        return text ? `button "${text}"` : "button";
    }
    if (tag === "input") {
        const type = target.getAttribute("type") || "text";
        return `input (${type})`;
    }
    // テキスト要素
    if (tag === "span" || tag === "p" || tag === "label") {
        const text = target.textContent?.trim();
        if (text && text.length < 30)
            return `"${text}"`;
        return "text";
    }
    // コンテナ - クラス名から用途を推測
    if (tag === "div") {
        const className = target.className;
        if (typeof className === "string" && className) {
            const words = className
                .split(/[\s_-]+/)
                .map(c => c.replace(/[A-Z0-9]{5,}.*$/, ""))
                .filter(c => c.length > 2 && !/^[a-z]{1,2}$/.test(c))
                .slice(0, 2);
            if (words.length > 0) {
                return words.join(" ");
            }
        }
        return "container";
    }
    return tag;
}
/**
 * 構造的コンテキスト用に近くの兄弟要素を取得
 * Shadow DOM内の要素もサポート
 */
function getNearbyElements(element) {
    const parent = getParentElement(element);
    if (!parent)
        return "";
    // 正しいソースから兄弟を取得
    const elementRoot = element.getRootNode();
    const children = (elementRoot instanceof ShadowRoot && element.parentElement)
        ? Array.from(element.parentElement.children)
        : Array.from(parent.children);
    const siblings = children.filter((child) => child !== element && child instanceof HTMLElement);
    if (siblings.length === 0)
        return "";
    // 最大4つの近くの兄弟の簡潔な識別子を取得
    const siblingIds = siblings.slice(0, 4).map((sib) => {
        const tag = sib.tagName.toLowerCase();
        const className = sib.className;
        // 最初の意味のあるクラスを取得
        let cls = "";
        if (typeof className === "string" && className) {
            const meaningful = className
                .split(/\s+/)
                .map((c) => c.replace(/[_][a-zA-Z0-9]{5,}.*$/, "")) // モジュールハッシュを除去
                .find((c) => c.length > 2 && !/^[a-z]{1,2}$/.test(c));
            if (meaningful)
                cls = `.${meaningful}`;
        }
        // ボタン/リンクには短いテキストを含める
        if (tag === "button" || tag === "a") {
            const text = sib.textContent?.trim().slice(0, 15);
            if (text)
                return `${tag}${cls} "${text}"`;
        }
        return `${tag}${cls}`;
    });
    // 親のコンテキストを追加
    const parentTag = parent.tagName.toLowerCase();
    let parentId = parentTag;
    if (typeof parent.className === "string" && parent.className) {
        const parentCls = parent.className
            .split(/\s+/)
            .map((c) => c.replace(/[_][a-zA-Z0-9]{5,}.*$/, ""))
            .find((c) => c.length > 2 && !/^[a-z]{1,2}$/.test(c));
        if (parentCls)
            parentId = `.${parentCls}`;
    }
    const total = parent.children.length;
    const suffix = total > siblingIds.length + 1 ? ` (${total} total in ${parentId})` : "";
    return siblingIds.join(", ") + suffix;
}
/**
 * 要素のCSSクラス名を取得（モジュールハッシュを除去）
 */
function getElementClasses(target) {
    const className = target.className;
    if (typeof className !== "string" || !className)
        return "";
    // クラス名を分割してクリーンアップ（モジュールハッシュ _abc123 を除去）
    const classes = className
        .split(/\s+/)
        .filter(c => c.length > 0)
        .map(c => {
        // ハッシュ前の意味のある部分を保持
        const match = c.match(/^([a-zA-Z][a-zA-Z0-9_-]*?)(?:_[a-zA-Z0-9]{5,})?$/);
        return match ? match[1] : c;
    })
        .filter((c, i, arr) => arr.indexOf(c) === i); // 重複排除
    return classes.join(", ");
}
/**
 * 要素の主要な計算済みスタイルを取得（スタイリングの問題に有用）
 */
function getComputedStylesSnapshot(target) {
    if (typeof window === "undefined")
        return "";
    const styles = window.getComputedStyle(target);
    const parts = [];
    // 色とテキスト
    const color = styles.color;
    const bg = styles.backgroundColor;
    if (color && color !== "rgb(0, 0, 0)")
        parts.push(`color: ${color}`);
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent")
        parts.push(`bg: ${bg}`);
    // タイポグラフィ
    const fontSize = styles.fontSize;
    const fontWeight = styles.fontWeight;
    if (fontSize)
        parts.push(`font: ${fontSize}`);
    if (fontWeight && fontWeight !== "400" && fontWeight !== "normal")
        parts.push(`weight: ${fontWeight}`);
    // スペーシング
    const padding = styles.padding;
    const margin = styles.margin;
    if (padding && padding !== "0px")
        parts.push(`padding: ${padding}`);
    if (margin && margin !== "0px")
        parts.push(`margin: ${margin}`);
    // レイアウト
    const display = styles.display;
    const position = styles.position;
    if (display && display !== "block" && display !== "inline")
        parts.push(`display: ${display}`);
    if (position && position !== "static")
        parts.push(`position: ${position}`);
    // ボーダー
    const borderRadius = styles.borderRadius;
    if (borderRadius && borderRadius !== "0px")
        parts.push(`radius: ${borderRadius}`);
    return parts.join(", ");
}
// 計算済みスタイル収集時にフィルタリングする値（ブラウザデフォルト / 無関係な値）
const DEFAULT_STYLE_VALUES = new Set([
    "none", "normal", "auto", "0px", "rgba(0, 0, 0, 0)", "transparent", "static", "visible"
]);
// スタイルプロパティ選択用の要素タイプカテゴリ
const TEXT_ELEMENTS = new Set([
    "p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "label", "li", "td", "th",
    "blockquote", "figcaption", "caption", "legend", "dt", "dd", "pre", "code",
    "em", "strong", "b", "i", "a", "time", "cite", "q"
]);
const FORM_INPUT_ELEMENTS = new Set(["input", "textarea", "select"]);
const MEDIA_ELEMENTS = new Set(["img", "video", "canvas", "svg"]);
const CONTAINER_ELEMENTS = new Set([
    "div", "section", "article", "nav", "header", "footer", "aside", "main",
    "ul", "ol", "form", "fieldset"
]);
/**
 * アノテーションポップアップ表示用の主要な計算済みスタイルを取得
 * 要素タイプに基づいて異なるプロパティを返し、デバッグに最も関連性の高い
 * CSSプロパティを表示する
 */
function getDetailedComputedStyles(target) {
    if (typeof window === "undefined")
        return {};
    const styles = window.getComputedStyle(target);
    const result = {};
    const tag = target.tagName.toLowerCase();
    // 要素タイプに基づいて関連プロパティを選択
    let properties;
    if (TEXT_ELEMENTS.has(tag)) {
        // テキスト要素にはタイポグラフィ重視
        properties = ["color", "fontSize", "fontWeight", "fontFamily", "lineHeight"];
    }
    else if (tag === "button" || (tag === "a" && target.getAttribute("role") === "button")) {
        // インタラクティブ要素には外観とスペーシング
        properties = ["backgroundColor", "color", "padding", "borderRadius", "fontSize"];
    }
    else if (FORM_INPUT_ELEMENTS.has(tag)) {
        // フォームスタイリング
        properties = ["backgroundColor", "color", "padding", "borderRadius", "fontSize"];
    }
    else if (MEDIA_ELEMENTS.has(tag)) {
        // メディアにはサイズ
        properties = ["width", "height", "objectFit", "borderRadius"];
    }
    else if (CONTAINER_ELEMENTS.has(tag)) {
        // コンテナにはレイアウト重視
        properties = ["display", "padding", "margin", "gap", "backgroundColor"];
    }
    else {
        // デフォルトフォールバック
        properties = ["color", "fontSize", "margin", "padding", "backgroundColor"];
    }
    for (const prop of properties) {
        const cssPropertyName = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
        const value = styles.getPropertyValue(cssPropertyName);
        if (value && !DEFAULT_STYLE_VALUES.has(value)) {
            result[prop] = value;
        }
    }
    return result;
}
// フォレンジック出力用の包括的CSSプロパティリスト
const FORENSIC_PROPERTIES = [
    // 色
    "color", "backgroundColor", "borderColor",
    // タイポグラフィ
    "fontSize", "fontWeight", "fontFamily", "lineHeight", "letterSpacing", "textAlign",
    // ボックスモデル
    "width", "height", "padding", "margin", "border", "borderRadius",
    // レイアウトと配置
    "display", "position", "top", "right", "bottom", "left", "zIndex",
    "flexDirection", "justifyContent", "alignItems", "gap",
    // ビジュアルエフェクト
    "opacity", "visibility", "overflow", "boxShadow",
    // トランスフォーム
    "transform",
];
/**
 * フォレンジック出力用の完全な計算済みスタイルを取得
 * フォレンジック出力形式で最大限のデバッグ詳細のため、
 * 関連する全CSSプロパティのセミコロン区切り文字列を返す
 */
function getForensicComputedStyles(target) {
    if (typeof window === "undefined")
        return "";
    const styles = window.getComputedStyle(target);
    const parts = [];
    for (const prop of FORENSIC_PROPERTIES) {
        const cssPropertyName = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
        const value = styles.getPropertyValue(cssPropertyName);
        if (value && !DEFAULT_STYLE_VALUES.has(value)) {
            parts.push(`${cssPropertyName}: ${value}`);
        }
    }
    return parts.join("; ");
}
/**
 * フォレンジック計算済みスタイル文字列をRecordに変換
 * getForensicComputedStylesの逆操作 - アノテーション編集時に使用
 */
function parseComputedStylesString(stylesStr) {
    if (!stylesStr)
        return undefined;
    const result = {};
    const parts = stylesStr.split(";").map((p) => p.trim()).filter(Boolean);
    for (const part of parts) {
        const colonIndex = part.indexOf(":");
        if (colonIndex > 0) {
            const key = part.slice(0, colonIndex).trim();
            const value = part.slice(colonIndex + 1).trim();
            if (key && value) {
                result[key] = value;
            }
        }
    }
    return Object.keys(result).length > 0 ? result : undefined;
}
/**
 * 要素のアクセシビリティ情報を取得
 */
function getAccessibilityInfo(target) {
    const parts = [];
    const role = target.getAttribute("role");
    const ariaLabel = target.getAttribute("aria-label");
    const ariaDescribedBy = target.getAttribute("aria-describedby");
    const tabIndex = target.getAttribute("tabindex");
    const ariaHidden = target.getAttribute("aria-hidden");
    if (role)
        parts.push(`role="${role}"`);
    if (ariaLabel)
        parts.push(`aria-label="${ariaLabel}"`);
    if (ariaDescribedBy)
        parts.push(`aria-describedby="${ariaDescribedBy}"`);
    if (tabIndex)
        parts.push(`tabindex=${tabIndex}`);
    if (ariaHidden === "true")
        parts.push("aria-hidden");
    // フォーカス可能性チェック
    const focusable = target.matches("a, button, input, select, textarea, [tabindex]");
    if (focusable)
        parts.push("focusable");
    return parts.join(", ");
}
/**
 * 完全なDOM祖先パスを取得（フォレンジックモード用）
 * Shadow DOM内の要素もShadow境界の越境をマーキングしてサポート
 */
function getFullElementPath(target) {
    const parts = [];
    let current = target;
    while (current && current.tagName.toLowerCase() !== "html") {
        const tag = current.tagName.toLowerCase();
        let identifier = tag;
        if (current.id) {
            identifier = `${tag}#${current.id}`;
        }
        else if (current.className && typeof current.className === "string") {
            const cls = current.className
                .split(/\s+/)
                .map(c => c.replace(/[_][a-zA-Z0-9]{5,}.*$/, ""))
                .find(c => c.length > 2);
            if (cls)
                identifier = `${tag}.${cls}`;
        }
        // Shadow境界の越境をマーク
        const nextParent = getParentElement(current);
        if (!current.parentElement && nextParent) {
            identifier = `⟨shadow⟩ ${identifier}`;
        }
        parts.unshift(identifier);
        current = nextParent;
    }
    return parts.join(" > ");
}

// =============================================================================
// Angularコンポーネント検出モジュール
// =============================================================================
/**
 * HTMLElementに対応するAngularコンポーネント名を検出する
 */
function getAngularComponentName(element, config = {}) {
    const { mode = 'auto', maxDepth = 10, maxComponents = 5 } = config;
    // デバッグAPI利用可能か判定
    if (mode === 'auto' || mode === 'debug-api') {
        if (typeof window !== 'undefined' && window['ng']) {
            const ng = window['ng'];
            if (typeof ng['getComponent'] === 'function') {
                return detectViaDebugAPI(element, maxDepth, maxComponents);
            }
        }
    }
    // フォールバック: タグ名ベース検出
    if (mode === 'auto' || mode === 'tag-name') {
        return detectViaTagName(element, maxDepth, maxComponents);
    }
    return { path: null, components: [] };
}
/**
 * Angular Debug API経由でコンポーネントを検出
 */
function detectViaDebugAPI(element, maxDepth, maxComponents) {
    const ng = window['ng'];
    const components = [];
    let current = element;
    let depth = 0;
    while (current && depth < maxDepth && components.length < maxComponents) {
        try {
            const component = ng['getComponent'](current);
            if (component) {
                const name = component.constructor?.name || current.tagName.toLowerCase();
                components.unshift(name);
            }
        }
        catch {
            // コンポーネントが見つからない場合は無視
        }
        current = current.parentElement;
        depth++;
    }
    return {
        path: components.length > 0 ? components.map(c => `<${c}>`).join(' ') : null,
        components,
    };
}
/**
 * タグ名ベースでAngularコンポーネントを検出（常時利用可能）
 */
function detectViaTagName(element, maxDepth, maxComponents) {
    const components = [];
    let current = element;
    let depth = 0;
    while (current && depth < maxDepth && components.length < maxComponents) {
        const tagName = current.tagName?.toLowerCase();
        // カスタム要素（ハイフン含むタグ名）はAngularコンポーネントの可能性が高い
        if (tagName && tagName.includes('-') && !tagName.startsWith('ng-')) {
            // ケバブケースをPascalCaseに変換
            const pascalName = tagName
                .split('-')
                .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                .join('');
            components.unshift(pascalName);
        }
        current = current.parentElement;
        depth++;
    }
    return {
        path: components.length > 0 ? components.map(c => `<${c}>`).join(' ') : null,
        components,
    };
}

// =============================================================================
// DOMイベント管理サービス
// =============================================================================
//
// NgZone外で高頻度DOMイベント（mousemove, click, scroll等）を処理し、
// 変更検出のパフォーマンスオーバーヘッドを最小化する。
//
class DOMEventService {
    ngZone = inject(NgZone);
    destroyRef = inject(DestroyRef);
    // イベントストリーム
    mouseMove$ = new Subject();
    elementClick$ = new Subject();
    escapePress$ = new Subject();
    scrollChange$ = new Subject();
    // イベントリスナーのクリーンアップ関数
    cleanupFns = [];
    isAttached = false;
    // ドラッグ選択の状態
    mouseDownPos = null;
    dragStart = null;
    isDragActive = false;
    lastElementUpdate = 0;
    justFinishedDrag = false;
    DRAG_THRESHOLD = 8;
    ELEMENT_UPDATE_THROTTLE = 50;
    // ドラッグ選択のイベントストリーム
    dragStateChange$ = new Subject();
    dragRect$ = new Subject();
    dragHighlights$ = new Subject();
    dragComplete$ = new Subject();
    // ドラッグ開始を無視するテキスト要素・フォーム要素タグ
    TEXT_TAGS = new Set([
        'P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
        'LI', 'TD', 'TH', 'LABEL', 'BLOCKQUOTE', 'FIGCAPTION',
        'CAPTION', 'LEGEND', 'DT', 'DD', 'PRE', 'CODE',
        'EM', 'STRONG', 'B', 'I', 'U', 'S', 'A',
        'TIME', 'ADDRESS', 'CITE', 'Q', 'ABBR', 'DFN',
        'MARK', 'SMALL', 'SUB', 'SUP',
        'INPUT', 'TEXTAREA', 'SELECT',
    ]);
    // ドラッグ検出対象の有意な要素タグ
    MEANINGFUL_TAGS = new Set([
        'BUTTON', 'A', 'INPUT', 'IMG',
        'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
        'LI', 'LABEL', 'TD', 'TH',
        'SECTION', 'ARTICLE', 'ASIDE', 'NAV',
    ]);
    // 近傍要素検索セレクタ
    NEARBY_SELECTOR = 'button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th, div, span, section, article, aside, nav';
    // 最終要素検索セレクタ（mouseup時）
    FINAL_SELECTOR = 'button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th';
    /** DOMイベントリスナーを設置（ツールバー活性化時に呼び出し） */
    attach(options) {
        if (this.isAttached)
            return;
        this.isAttached = true;
        this.ngZone.runOutsideAngular(() => {
            // --- ドラッグ選択: mousedown ---
            const handleMouseDown = (e) => {
                // 左ボタンのみ（右クリック・中クリック等を除外）
                if (e.button !== 0)
                    return;
                const target = deepElementFromPoint(e.clientX, e.clientY);
                if (!target)
                    return;
                if (this.isToolbarElement(target))
                    return;
                // テキスト要素上ではネイティブ選択を優先
                if (this.TEXT_TAGS.has(target.tagName) || target.isContentEditable)
                    return;
                this.mouseDownPos = { x: e.clientX, y: e.clientY };
            };
            document.addEventListener('mousedown', handleMouseDown);
            this.cleanupFns.push(() => document.removeEventListener('mousedown', handleMouseDown));
            // mousemoveリスナー
            const handleMouseMove = (e) => {
                // --- ドラッグ処理 ---
                if (this.mouseDownPos) {
                    const dx = e.clientX - this.mouseDownPos.x;
                    const dy = e.clientY - this.mouseDownPos.y;
                    const distance = dx * dx + dy * dy;
                    const thresholdSq = this.DRAG_THRESHOLD * this.DRAG_THRESHOLD;
                    if (!this.isDragActive && distance >= thresholdSq) {
                        this.dragStart = this.mouseDownPos;
                        this.isDragActive = true;
                        this.dragStateChange$.next(true);
                    }
                    if (this.isDragActive && this.dragStart) {
                        // ドラッグ矩形を更新
                        const left = Math.min(this.dragStart.x, e.clientX);
                        const top = Math.min(this.dragStart.y, e.clientY);
                        const width = Math.abs(e.clientX - this.dragStart.x);
                        const height = Math.abs(e.clientY - this.dragStart.y);
                        this.dragRect$.next({ left, top, width, height });
                        // 要素検出のスロットリング
                        const now = Date.now();
                        if (now - this.lastElementUpdate < this.ELEMENT_UPDATE_THROTTLE)
                            return;
                        this.lastElementUpdate = now;
                        const right = Math.max(this.dragStart.x, e.clientX);
                        const bottom = Math.max(this.dragStart.y, e.clientY);
                        const highlights = this.findElementsInRect(left, top, right, bottom);
                        this.dragHighlights$.next(highlights);
                        return; // ドラッグ中はホバー処理をスキップ
                    }
                }
                // --- 通常のホバー処理 ---
                const target = deepElementFromPoint(e.clientX, e.clientY);
                if (!target)
                    return;
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
                let angularComponents = null;
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
            const handleClick = (e) => {
                // ドラッグ直後のクリックは無視
                if (this.justFinishedDrag) {
                    this.justFinishedDrag = false;
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                const target = deepElementFromPoint(e.clientX, e.clientY);
                if (!target)
                    return;
                if (this.isToolbarElement(target))
                    return;
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
                // 常にポップアップ用のComputedStylesを収集（React版準拠）
                let computedStyles = '';
                const computedStylesObj = getDetailedComputedStyles(target);
                // フォレンジックモードでは追加で詳細文字列も取得
                if (options.outputDetail === 'forensic') {
                    computedStyles = getForensicComputedStyles(target);
                }
                else {
                    computedStyles = Object.entries(computedStylesObj)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join('; ');
                }
                // Angularコンポーネント検出
                let angularComponents;
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
            // --- ドラッグ選択: mouseup ---
            const handleMouseUp = (e) => {
                if (this.isDragActive && this.dragStart) {
                    this.justFinishedDrag = true;
                    // 最終的な要素検出
                    const left = Math.min(this.dragStart.x, e.clientX);
                    const top = Math.min(this.dragStart.y, e.clientY);
                    const right = Math.max(this.dragStart.x, e.clientX);
                    const bottom = Math.max(this.dragStart.y, e.clientY);
                    // 最終要素を再検出（mouseup時はより厳密なセレクタ）
                    const finalElements = this.findFinalElements(left, top, right, bottom);
                    const x = (e.clientX / window.innerWidth) * 100;
                    const y = e.clientY + window.scrollY;
                    if (finalElements.length > 0) {
                        const bounds = finalElements.reduce((acc, { rect }) => ({
                            left: Math.min(acc.left, rect.left),
                            top: Math.min(acc.top, rect.top),
                            right: Math.max(acc.right, rect.right),
                            bottom: Math.max(acc.bottom, rect.bottom),
                        }), { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity });
                        const elementNames = finalElements
                            .slice(0, 5)
                            .map(({ element }) => identifyElement(element).name)
                            .join(', ');
                        const suffix = finalElements.length > 5
                            ? ` +${finalElements.length - 5} more`
                            : '';
                        // 最初の要素からスタイル情報を収集
                        const firstEl = finalElements[0].element;
                        const computedStylesObj = getDetailedComputedStyles(firstEl);
                        const computedStyles = getForensicComputedStyles(firstEl);
                        this.dragComplete$.next({
                            x,
                            y,
                            clientY: e.clientY,
                            element: `${finalElements.length} elements: ${elementNames}${suffix}`,
                            elementPath: 'multi-select',
                            isMultiSelect: true,
                            boundingBox: {
                                x: bounds.left,
                                y: bounds.top + window.scrollY,
                                width: bounds.right - bounds.left,
                                height: bounds.bottom - bounds.top,
                            },
                            fullPath: getFullElementPath(firstEl),
                            accessibility: getAccessibilityInfo(firstEl),
                            computedStyles: computedStyles || undefined,
                            computedStylesObj: Object.keys(computedStylesObj).length > 0 ? computedStylesObj : undefined,
                            nearbyElements: getNearbyElements(firstEl),
                            cssClasses: getElementClasses(firstEl),
                            nearbyText: getNearbyText(firstEl),
                            targetElement: firstEl,
                        });
                    }
                    else {
                        // 要素がない場合でもドラッグ範囲が意味のあるサイズなら発行
                        const width = Math.abs(right - left);
                        const height = Math.abs(bottom - top);
                        if (width > 20 && height > 20) {
                            this.dragComplete$.next({
                                x,
                                y,
                                clientY: e.clientY,
                                element: 'Area selection',
                                elementPath: `region at (${Math.round(left)}, ${Math.round(top)})`,
                                isMultiSelect: true,
                                boundingBox: {
                                    x: left,
                                    y: top + window.scrollY,
                                    width,
                                    height,
                                },
                            });
                        }
                    }
                }
                // 状態リセット
                this.mouseDownPos = null;
                this.dragStart = null;
                if (this.isDragActive) {
                    this.isDragActive = false;
                    this.dragStateChange$.next(false);
                    this.dragRect$.next(null);
                    this.dragHighlights$.next([]);
                }
            };
            document.addEventListener('mouseup', handleMouseUp);
            this.cleanupFns.push(() => document.removeEventListener('mouseup', handleMouseUp));
            // キーボードリスナー
            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    this.escapePress$.next();
                }
            };
            document.addEventListener('keydown', handleKeyDown);
            this.cleanupFns.push(() => document.removeEventListener('keydown', handleKeyDown));
            // スクロールリスナー
            let scrollTimeout = null;
            const handleScroll = () => {
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
                if (scrollTimeout)
                    clearTimeout(scrollTimeout);
            });
        });
    }
    /** DOMイベントリスナーを解除（ツールバー非活性化時に呼び出し） */
    detach() {
        this.cleanupFns.forEach(fn => fn());
        this.cleanupFns = [];
        this.isAttached = false;
        // ドラッグ状態リセット
        this.mouseDownPos = null;
        this.dragStart = null;
        this.isDragActive = false;
        this.justFinishedDrag = false;
    }
    /** 全リソース解放（コンポーネントDestroy時） */
    destroy() {
        this.detach();
        this.mouseMove$.complete();
        this.elementClick$.complete();
        this.escapePress$.complete();
        this.scrollChange$.complete();
        this.dragStateChange$.complete();
        this.dragRect$.complete();
        this.dragHighlights$.complete();
        this.dragComplete$.complete();
    }
    /** フィードバックツールバーの要素かどうか判定 */
    isToolbarElement(element) {
        return !!element.closest('[data-feedback-toolbar]') ||
            !!element.closest('[data-annotation-popup]') ||
            !!element.closest('.agentation-settings') ||
            !!element.closest('.agentation-marker');
    }
    /** ドラッグ矩形内の要素ハイライト用DOMRectを検出 */
    findElementsInRect(left, top, right, bottom) {
        const midX = (left + right) / 2;
        const midY = (top + bottom) / 2;
        // 9つのサンプルポイントで要素を検出
        const candidateElements = new Set();
        const points = [
            [left, top], [right, top],
            [left, bottom], [right, bottom],
            [midX, midY],
            [midX, top], [midX, bottom],
            [left, midY], [right, midY],
        ];
        for (const [x, y] of points) {
            const elements = document.elementsFromPoint(x, y);
            for (const el of elements) {
                if (el instanceof HTMLElement)
                    candidateElements.add(el);
            }
        }
        // 近傍要素も検索
        const nearbyElements = Array.from(document.querySelectorAll(this.NEARBY_SELECTOR));
        for (const el of nearbyElements) {
            if (!(el instanceof HTMLElement))
                continue;
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const centerInside = centerX >= left && centerX <= right && centerY >= top && centerY <= bottom;
            const overlapX = Math.min(rect.right, right) - Math.max(rect.left, left);
            const overlapY = Math.min(rect.bottom, bottom) - Math.max(rect.top, top);
            const overlapArea = overlapX > 0 && overlapY > 0 ? overlapX * overlapY : 0;
            const elementArea = rect.width * rect.height;
            const overlapRatio = elementArea > 0 ? overlapArea / elementArea : 0;
            if (centerInside || overlapRatio > 0.5) {
                candidateElements.add(el);
            }
        }
        // フィルタリングして有意な要素のみ返す
        const allMatching = [];
        for (const el of candidateElements) {
            if (this.isToolbarElement(el))
                continue;
            const rect = el.getBoundingClientRect();
            // 大きすぎる・小さすぎる要素を除外
            if (rect.width > window.innerWidth * 0.8 && rect.height > window.innerHeight * 0.5)
                continue;
            if (rect.width < 10 || rect.height < 10)
                continue;
            // ドラッグ矩形と交差判定
            if (rect.left < right && rect.right > left && rect.top < bottom && rect.bottom > top) {
                const tagName = el.tagName;
                let shouldInclude = this.MEANINGFUL_TAGS.has(tagName);
                // div/spanは有意な内容がある場合のみ
                if (!shouldInclude && (tagName === 'DIV' || tagName === 'SPAN')) {
                    const hasText = el.textContent && el.textContent.trim().length > 0;
                    const isInteractive = el.onclick !== null
                        || el.getAttribute('role') === 'button'
                        || el.getAttribute('role') === 'link'
                        || el.classList.contains('clickable')
                        || el.hasAttribute('data-clickable');
                    if ((hasText || isInteractive) && !el.querySelector('p, h1, h2, h3, h4, h5, h6, button, a')) {
                        shouldInclude = true;
                    }
                }
                if (shouldInclude) {
                    // 親要素の除外（既存のマッチが完全に包含する場合）
                    let dominated = false;
                    for (const existingRect of allMatching) {
                        if (existingRect.left <= rect.left && existingRect.right >= rect.right
                            && existingRect.top <= rect.top && existingRect.bottom >= rect.bottom) {
                            dominated = true;
                            break;
                        }
                    }
                    if (!dominated)
                        allMatching.push(rect);
                }
            }
        }
        return allMatching;
    }
    /** mouseup時の最終要素検出（より厳密なセレクタ） */
    findFinalElements(left, top, right, bottom) {
        const allMatching = [];
        document.querySelectorAll(this.FINAL_SELECTOR).forEach(el => {
            if (!(el instanceof HTMLElement))
                return;
            if (this.isToolbarElement(el))
                return;
            const rect = el.getBoundingClientRect();
            if (rect.width > window.innerWidth * 0.8 && rect.height > window.innerHeight * 0.5)
                return;
            if (rect.width < 10 || rect.height < 10)
                return;
            if (rect.left < right && rect.right > left && rect.top < bottom && rect.bottom > top) {
                allMatching.push({ element: el, rect });
            }
        });
        // 子要素が選択されている場合は親を除外
        return allMatching.filter(({ element: el }) => !allMatching.some(({ element: other }) => other !== el && el.contains(other)));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: DOMEventService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: DOMEventService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: DOMEventService, decorators: [{
            type: Injectable
        }] });

// =============================================================================
// サーバー同期サービス
// =============================================================================
//
// SSEベースのサーバー同期サービス。
// セッション管理、リアルタイムイベント受信、指数バックオフ再接続を提供する。
//
class ServerSyncService {
    destroyRef = inject(DestroyRef);
    // SSE接続
    eventSource = null;
    reconnectTimer = null;
    reconnectAttempts = 0;
    MAX_RECONNECT_ATTEMPTS = 5;
    BASE_BACKOFF_MS = 1000;
    // 接続パラメータ
    endpoint = null;
    sessionId = null;
    // 接続状態
    connectionStatus = signal('disconnected');
    // サーバーからのイベントストリーム
    serverEvent$ = new Subject();
    // ヘルスチェック間隔
    healthCheckInterval = null;
    constructor() {
        // DestroyRefでクリーンアップ
        this.destroyRef.onDestroy(() => {
            this.destroy();
        });
    }
    /** SSE接続を開始 */
    async connect(endpoint, options) {
        this.endpoint = endpoint;
        this.connectionStatus.set('connecting');
        const pathname = options?.pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');
        const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
        try {
            // セッションID取得（優先順位: 引数 → localStorage → 新規作成）
            let sid = options?.sessionId || loadSessionId(pathname);
            if (sid) {
                // 既存セッションの取得を試行
                try {
                    const session = await getSession(endpoint, sid);
                    this.sessionId = session.id;
                }
                catch {
                    // セッションが見つからない場合は新規作成
                    sid = null;
                }
            }
            if (!sid) {
                // 新規セッション作成
                const session = await createSession(endpoint, pageUrl);
                this.sessionId = session.id;
                saveSessionId(pathname, session.id);
            }
            // SSE接続開始
            this.startSSE();
            // ヘルスチェック開始
            this.startHealthCheck();
            this.connectionStatus.set('connected');
            this.reconnectAttempts = 0;
            return this.sessionId;
        }
        catch {
            this.connectionStatus.set('error');
            this.scheduleReconnect();
            return null;
        }
    }
    /** SSE接続を切断 */
    disconnect() {
        this.stopSSE();
        this.stopHealthCheck();
        this.clearReconnectTimer();
        this.connectionStatus.set('disconnected');
        this.reconnectAttempts = 0;
    }
    /** 全リソース解放 */
    destroy() {
        this.disconnect();
        this.serverEvent$.complete();
        this.endpoint = null;
        this.sessionId = null;
    }
    /** 現在のセッションIDを取得 */
    getSessionId() {
        return this.sessionId;
    }
    // ===== プライベートメソッド =====
    /** SSEイベントソースを開始 */
    startSSE() {
        if (!this.endpoint || !this.sessionId)
            return;
        this.stopSSE();
        this.eventSource = new EventSource(`${this.endpoint}/sessions/${this.sessionId}/events`);
        // アノテーション更新イベント
        const handleUpdate = (e) => {
            try {
                const event = JSON.parse(e.data);
                this.serverEvent$.next({
                    type: 'annotation.updated',
                    payload: event.payload,
                });
            }
            catch {
                // パースエラーは無視
            }
        };
        this.eventSource.addEventListener('annotation.updated', handleUpdate);
        // エラーハンドリング
        this.eventSource.onerror = () => {
            this.handleSSEError();
        };
        this.eventSource.onopen = () => {
            this.connectionStatus.set('connected');
            this.reconnectAttempts = 0;
        };
    }
    /** SSEイベントソースを停止 */
    stopSSE() {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }
    /** SSEエラー時の処理 */
    handleSSEError() {
        this.stopSSE();
        if (this.connectionStatus() !== 'disconnected') {
            this.connectionStatus.set('error');
            this.scheduleReconnect();
        }
    }
    /** 指数バックオフで再接続をスケジュール */
    scheduleReconnect() {
        if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
            this.connectionStatus.set('error');
            return;
        }
        this.clearReconnectTimer();
        const delay = this.BASE_BACKOFF_MS * Math.pow(2, this.reconnectAttempts);
        this.reconnectTimer = originalSetTimeout(() => {
            this.reconnectAttempts++;
            this.connectionStatus.set('connecting');
            this.startSSE();
        }, delay);
    }
    /** 再接続タイマーをクリア */
    clearReconnectTimer() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
    }
    /** ヘルスチェックを開始（10秒間隔） */
    startHealthCheck() {
        this.stopHealthCheck();
        const check = async () => {
            if (!this.endpoint)
                return;
            try {
                const response = await fetch(`${this.endpoint}/health`);
                if (response.ok) {
                    if (this.connectionStatus() === 'error') {
                        this.connectionStatus.set('connected');
                        this.reconnectAttempts = 0;
                    }
                }
            }
            catch {
                if (this.connectionStatus() === 'connected') {
                    this.connectionStatus.set('error');
                }
            }
        };
        check();
        this.healthCheckInterval = setInterval(check, 10000);
    }
    /** ヘルスチェックを停止 */
    stopHealthCheck() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
            this.healthCheckInterval = null;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: ServerSyncService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: ServerSyncService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: ServerSyncService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });

// =============================================================================
// Agentationメインコンポーネント
// =============================================================================
//
// 公開APIの唯一のエントリポイント。
// React版のPageFeedbackToolbarCSSに相当するAngularコンポーネント。
// ツールバー、マーカー、ホバーハイライト、ポップアップを統合管理する。
//
class AgentationComponent {
    // ===== 入力プロパティ =====
    /** サーバーエンドポイントURL */
    endpoint;
    /** 既存セッションID */
    sessionId;
    /** コピー時にクリップボードに書き込むか */
    copyToClipboard = true;
    /** WebhookURL */
    webhookUrl;
    // ===== 出力イベント =====
    annotationAdd = new EventEmitter();
    annotationDelete = new EventEmitter();
    annotationUpdate = new EventEmitter();
    annotationsClear = new EventEmitter();
    copyOutput = new EventEmitter();
    sessionCreated = new EventEmitter();
    // ===== サービス注入 =====
    service = inject(AgentationService);
    domEvents = inject(DOMEventService);
    serverSync = inject(ServerSyncService);
    // ===== アイコンデータ =====
    icons = {
        plus: ICON_PLUS,
        eyeAnimated: ICON_EYE_ANIMATED,
        pausePlay: ICON_PAUSE_PLAY_ANIMATED,
        copy: ICON_COPY_ANIMATED,
        send: ICON_SEND_ARROW,
        gear: ICON_GEAR,
        trash: ICON_TRASH_ALT,
        sun: ICON_SUN,
        moon: ICON_MOON,
        chevronLeft: ICON_CHEVRON_LEFT,
        listSparkle: ICON_LIST_SPARKLE,
        bunny: ICON_ANIMATED_BUNNY,
    };
    // ユーティリティ公開（テンプレートで使用）
    hexToRgba = hexToRgba;
    // ポップアップ参照（shake用）
    pendingPopup;
    editPopup;
    // ドラッグ選択の状態
    isDragging = signal(false);
    dragRectStyle = signal({});
    dragHighlightRects = signal([]);
    /** DOMRectをngStyleオブジェクトに変換 */
    rectToStyle(rect) {
        return {
            position: 'fixed',
            left: rect.left + 'px',
            top: rect.top + 'px',
            width: rect.width + 'px',
            height: rect.height + 'px',
        };
    }
    constructor() {
        // isActive変更を監視してDOMイベントをattach/detach
        effect(() => {
            if (this.service.isActive()) {
                this.domEvents.attach({
                    angularMode: this.service.angularMode(),
                    outputDetail: this.service.settings().outputDetail,
                    blockInteractions: this.service.settings().blockInteractions,
                });
            }
            else {
                this.domEvents.detach();
            }
        });
        // フリーズ状態の変更を監視
        effect(() => {
            if (this.service.isFrozen()) {
                freeze();
            }
            else {
                unfreeze();
            }
        });
    }
    ngOnInit() {
        // サービス初期化
        this.service.copyToClipboardEnabled = this.copyToClipboard;
        this.service.configure({
            endpoint: this.endpoint,
            sessionId: this.sessionId,
            webhookUrl: this.webhookUrl,
        });
        // DOMイベント購読
        this.domEvents.mouseMove$.subscribe(result => {
            if (!this.service.isActive())
                return;
            this.service.updateHover(result.element ? {
                element: result.element,
                elementName: result.elementName,
                elementPath: result.elementPath,
                rect: result.rect,
                angularComponents: result.angularComponents,
            } : null, result.position);
        });
        this.domEvents.elementClick$.subscribe(result => {
            if (!this.service.isActive())
                return;
            // ポップアップ表示中はshakeして新規作成しない（React版準拠）
            if (this.service.pendingAnnotation()) {
                this.pendingPopup?.shake();
                return;
            }
            if (this.service.editingAnnotation()) {
                this.editPopup?.shake();
                return;
            }
            this.service.startAnnotation({
                x: result.x,
                y: result.y,
                clientY: result.clientY,
                element: result.element,
                elementPath: result.elementPath,
                selectedText: result.selectedText,
                boundingBox: result.boundingBox,
                nearbyText: result.nearbyText,
                cssClasses: result.cssClasses,
                isFixed: result.isFixed,
                fullPath: result.fullPath,
                accessibility: result.accessibility,
                computedStyles: result.computedStyles,
                computedStylesObj: result.computedStylesObj,
                nearbyElements: result.nearbyElements,
                angularComponents: result.angularComponents,
                targetElement: result.targetElement,
            });
        });
        this.domEvents.escapePress$.subscribe(() => {
            if (this.service.pendingAnnotation()) {
                this.service.cancelPending();
            }
            else if (this.service.editingAnnotation()) {
                this.service.cancelEditing();
            }
            else if (this.service.isActive()) {
                this.service.deactivate();
            }
        });
        // ドラッグ選択イベント購読
        this.domEvents.dragStateChange$.subscribe(isDragging => {
            this.isDragging.set(isDragging);
            if (isDragging) {
                // ドラッグ開始時にホバー情報をクリア
                this.service.updateHover(null, { x: 0, y: 0 });
            }
        });
        this.domEvents.dragRect$.subscribe(rect => {
            if (rect) {
                this.dragRectStyle.set({
                    position: 'fixed',
                    left: rect.left + 'px',
                    top: rect.top + 'px',
                    width: rect.width + 'px',
                    height: rect.height + 'px',
                });
            }
        });
        this.domEvents.dragHighlights$.subscribe(rects => {
            this.dragHighlightRects.set(rects);
        });
        this.domEvents.dragComplete$.subscribe(result => {
            if (!this.service.isActive())
                return;
            // ポップアップ表示中はshakeして新規作成しない（React版準拠）
            if (this.service.pendingAnnotation()) {
                this.pendingPopup?.shake();
                return;
            }
            if (this.service.editingAnnotation()) {
                this.editPopup?.shake();
                return;
            }
            this.service.startAnnotation({
                x: result.x,
                y: result.y,
                clientY: result.clientY,
                element: result.element,
                elementPath: result.elementPath,
                selectedText: result.selectedText,
                boundingBox: result.boundingBox,
                nearbyText: result.nearbyText,
                cssClasses: result.cssClasses,
                isFixed: result.isFixed,
                isMultiSelect: result.isMultiSelect,
                fullPath: result.fullPath,
                accessibility: result.accessibility,
                computedStyles: result.computedStyles,
                computedStylesObj: result.computedStylesObj,
                nearbyElements: result.nearbyElements,
                angularComponents: result.angularComponents,
                targetElement: result.targetElement,
            });
        });
        this.domEvents.scrollChange$.subscribe(y => {
            if (y === -1) {
                this.service.setScrolling(false);
            }
            else {
                this.service.updateScrollY(y);
                this.service.setScrolling(true);
            }
        });
        // サーバー接続
        if (this.endpoint) {
            this.serverSync.connect(this.endpoint, {
                sessionId: this.sessionId,
            }).then(sid => {
                if (sid) {
                    this.service.syncState.update(s => ({ ...s, currentSessionId: sid, connectionStatus: 'connected' }));
                    if (!this.sessionId) {
                        this.sessionCreated.emit(sid);
                    }
                }
            });
            // サーバーイベント購読
            this.serverSync.serverEvent$.subscribe(event => {
                const removedStatuses = ['resolved', 'dismissed'];
                if (event.type === 'annotation.updated' && removedStatuses.includes(event.payload.status || '')) {
                    this.service.deleteAnnotation(event.payload.id);
                }
            });
        }
    }
    ngOnDestroy() {
        this.domEvents.destroy();
        this.serverSync.destroy();
        // フリーズ解除
        if (this.service.isFrozen()) {
            unfreeze();
        }
    }
    // ===== テンプレート用メソッド =====
    /** ツールバー活性化トグル */
    toggleActive() {
        if (this.service.isActive()) {
            this.service.deactivate();
        }
        else {
            this.service.activate();
        }
    }
    /** アノテーション送信 */
    onAnnotationSubmit(text) {
        const annotation = this.service.addAnnotation(text);
        if (annotation) {
            this.annotationAdd.emit(annotation);
        }
    }
    /** アノテーション編集送信 */
    onAnnotationEditSubmit(text) {
        const editing = this.service.editingAnnotation();
        if (!editing)
            return;
        const updated = this.service.updateAnnotation(editing.id, text);
        if (updated) {
            this.annotationUpdate.emit(updated);
        }
    }
    /** マーカークリック */
    onMarkerClick(id) {
        const behavior = this.service.settings().markerClickBehavior;
        if (behavior === 'delete') {
            const deleted = this.service.deleteAnnotation(id);
            if (deleted) {
                this.annotationDelete.emit(deleted);
            }
        }
        else {
            const annotation = this.service.annotations().find(a => a.id === id);
            if (annotation) {
                this.service.startEditing(annotation);
            }
        }
    }
    /** 編集ポップアップからの削除（常に削除動作） */
    onDeleteFromPopup(id) {
        const deleted = this.service.deleteAnnotation(id);
        if (deleted) {
            this.annotationDelete.emit(deleted);
        }
    }
    /** コピー */
    async onCopy() {
        const output = await this.service.copyOutput();
        this.copyOutput.emit(output);
    }
    /** 全クリア */
    onClearAll() {
        const cleared = this.service.clearAll();
        this.annotationsClear.emit(cleared);
    }
    /** エージェントに送信 */
    async onSendToAgent() {
        await this.service.sendToAgent();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: AgentationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.18", type: AgentationComponent, isStandalone: true, selector: "agentation", inputs: { endpoint: "endpoint", sessionId: "sessionId", copyToClipboard: "copyToClipboard", webhookUrl: "webhookUrl" }, outputs: { annotationAdd: "annotationAdd", annotationDelete: "annotationDelete", annotationUpdate: "annotationUpdate", annotationsClear: "annotationsClear", copyOutput: "copyOutput", sessionCreated: "sessionCreated" }, providers: [
            AgentationService,
            DOMEventService,
            ServerSyncService,
            { provide: OverlayContainer, useClass: AgentationOverlayContainer },
        ], viewQueries: [{ propertyName: "pendingPopup", first: true, predicate: ["pendingPopup"], descendants: true }, { propertyName: "editPopup", first: true, predicate: ["editPopup"], descendants: true }], ngImport: i0, template: "<div\n  data-agentation\n  [class.agentation--dark]=\"service.toolbarState().isDarkMode\"\n>\n  <!-- \u30D5\u30ED\u30FC\u30C6\u30A3\u30F3\u30B0\u30C4\u30FC\u30EB\u30D0\u30FC -->\n  <div\n    class=\"agentation-toolbar\"\n    [style.--accent-color]=\"service.settings().annotationColor\"\n    data-feedback-toolbar\n  >\n    <!-- \u30DE\u30B9\u30B3\u30C3\u30C8/\u6D3B\u6027\u5316\u30DC\u30BF\u30F3 -->\n    <button\n      class=\"agentation-toolbar__toggle\"\n      (click)=\"toggleActive()\"\n      type=\"button\"\n    >\n      <agentation-icon [data]=\"icons.bunny\" [size]=\"20\" />\n      @if (!service.isActive() && service.hasAnnotations()) {\n        <span\n          class=\"agentation-toolbar__badge\"\n          [style.backgroundColor]=\"service.settings().annotationColor\"\n        >\n          {{ service.annotations().length }}\n        </span>\n      }\n    </button>\n\n    @if (service.isActive()) {\n      <!-- \u30A2\u30CE\u30C6\u30FC\u30B7\u30E7\u30F3\u6570\u30D0\u30C3\u30B8 -->\n      @if (service.hasAnnotations()) {\n        <div class=\"agentation-toolbar__count\">\n          {{ service.annotations().length }}\n        </div>\n      }\n\n      <!-- \u30DE\u30FC\u30AB\u30FC\u8868\u793A\u30C8\u30B0\u30EB -->\n      <button\n        class=\"agentation-toolbar__button\"\n        (click)=\"service.toggleMarkers()\"\n        type=\"button\"\n      >\n        <agentation-icon [data]=\"icons.eyeAnimated\" [size]=\"24\" />\n      </button>\n\n      <!-- \u30D5\u30EA\u30FC\u30BA\u30C8\u30B0\u30EB -->\n      <button\n        class=\"agentation-toolbar__button\"\n        (click)=\"service.toggleFreeze()\"\n        type=\"button\"\n      >\n        <agentation-icon [data]=\"icons.pausePlay\" [size]=\"24\" />\n      </button>\n\n      <!-- \u30B3\u30D4\u30FC -->\n      <button\n        class=\"agentation-toolbar__button\"\n        (click)=\"onCopy()\"\n        [disabled]=\"!service.hasAnnotations()\"\n        type=\"button\"\n      >\n        <agentation-icon [data]=\"icons.copy\" [size]=\"24\" />\n      </button>\n\n      <!-- \u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u306B\u9001\u4FE1\uFF08\u30A8\u30F3\u30C9\u30DD\u30A4\u30F3\u30C8\u63A5\u7D9A\u6642\u306E\u307F\uFF09 -->\n      @if (endpoint && service.syncState().currentSessionId) {\n        <button\n          class=\"agentation-toolbar__button\"\n          (click)=\"onSendToAgent()\"\n          [disabled]=\"!service.hasAnnotations()\"\n          type=\"button\"\n          title=\"Send Annotations\"\n        >\n          <agentation-icon [data]=\"icons.send\" [size]=\"24\" />\n        </button>\n      }\n\n      <!-- \u5168\u30AF\u30EA\u30A2 -->\n      <button\n        class=\"agentation-toolbar__button agentation-toolbar__button--danger\"\n        (click)=\"onClearAll()\"\n        [disabled]=\"!service.hasAnnotations()\"\n        type=\"button\"\n      >\n        <agentation-icon [data]=\"icons.trash\" [size]=\"24\" />\n      </button>\n\n      <!-- \u8A2D\u5B9A -->\n      <button\n        class=\"agentation-toolbar__button\"\n        (click)=\"service.toggleSettings()\"\n        type=\"button\"\n      >\n        <agentation-icon [data]=\"icons.gear\" [size]=\"24\" />\n        @if (endpoint && service.connectionStatus() !== 'disconnected') {\n          <span class=\"agentation-toolbar__settings-badge\"\n            [class.agentation-toolbar__settings-badge--connected]=\"service.connectionStatus() === 'connected'\"\n            [class.agentation-toolbar__settings-badge--connecting]=\"service.connectionStatus() === 'connecting'\"\n            [class.agentation-toolbar__settings-badge--error]=\"service.connectionStatus() === 'error'\"\n          ></span>\n        }\n      </button>\n\n      <!-- \u30C0\u30FC\u30AF\u30E2\u30FC\u30C9\u30C8\u30B0\u30EB -->\n      <button\n        class=\"agentation-toolbar__button\"\n        (click)=\"service.toggleDarkMode()\"\n        type=\"button\"\n      >\n        <agentation-icon\n          [data]=\"service.toolbarState().isDarkMode ? icons.sun : icons.moon\"\n          [size]=\"24\"\n        />\n      </button>\n    }\n  </div>\n\n  <!-- \u8A2D\u5B9A\u30D1\u30CD\u30EB -->\n  @if (service.toolbarState().showSettings && service.isActive()) {\n    <agentation-settings [service]=\"service\" [endpoint]=\"endpoint || ''\" />\n  }\n\n  <!-- \u30DE\u30FC\u30AB\u30FC\u30EC\u30A4\u30E4\u30FC -->\n  @if (service.isActive() && service.showMarkers()) {\n    @for (annotation of service.annotations(); track annotation.id; let i = $index) {\n      <agentation-marker\n        [annotationId]=\"annotation.id\"\n        [number]=\"i + 1\"\n        [x]=\"annotation.x\"\n        [y]=\"annotation.y\"\n        [scrollY]=\"service.scrollY()\"\n        [isFixed]=\"annotation.isFixed || false\"\n        [accentColor]=\"service.settings().annotationColor\"\n        [isExiting]=\"service.annotationState().exitingMarkers.has(annotation.id)\"\n        [isHovered]=\"service.annotationState().hoveredMarkerId === annotation.id\"\n        [clickBehavior]=\"service.settings().markerClickBehavior\"\n        (markerClick)=\"onMarkerClick($event)\"\n        (markerHoverStart)=\"service.setHoveredMarker($event)\"\n        (markerHoverEnd)=\"service.setHoveredMarker(null)\"\n      />\n    }\n  }\n\n  <!-- \u30DB\u30D0\u30FC\u30CF\u30A4\u30E9\u30A4\u30C8 -->\n  @if (service.isActive() && service.hoverInfo()?.rect && !isDragging()) {\n    <div\n      class=\"agentation-hover-highlight\"\n      [style.position]=\"'fixed'\"\n      [style.left.px]=\"service.hoverInfo()!.rect!.left\"\n      [style.top.px]=\"service.hoverInfo()!.rect!.top\"\n      [style.width.px]=\"service.hoverInfo()!.rect!.width\"\n      [style.height.px]=\"service.hoverInfo()!.rect!.height\"\n      [style.border]=\"'2px solid ' + service.settings().annotationColor\"\n      [style.backgroundColor]=\"hexToRgba(service.settings().annotationColor, 0.1)\"\n      [style.pointerEvents]=\"'none'\"\n      [style.zIndex]=\"'100000'\"\n      [style.borderRadius]=\"'4px'\"\n    ></div>\n  }\n\n  <!-- \u30DB\u30D0\u30FC\u30E9\u30D9\u30EB -->\n  @if (service.isActive() && service.hoverInfo()?.element && !isDragging()) {\n    <div\n      class=\"agentation-hover-label\"\n      [style.position]=\"'fixed'\"\n      [style.left.px]=\"service.hoverPosition().x + 16\"\n      [style.top.px]=\"service.hoverPosition().y + 16\"\n      [style.zIndex]=\"'100001'\"\n      [style.pointerEvents]=\"'none'\"\n    >\n      {{ service.hoverInfo()!.element }}\n    </div>\n  }\n\n  <!-- \u30A2\u30CE\u30C6\u30FC\u30B7\u30E7\u30F3\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\uFF08\u65B0\u898F\u4F5C\u6210\uFF09 -->\n  @if (service.pendingAnnotation()) {\n    <agentation-popup\n      #pendingPopup\n      [element]=\"service.pendingAnnotation()!.element\"\n      [selectedText]=\"service.pendingAnnotation()!.selectedText\"\n      [accentColor]=\"service.settings().annotationColor\"\n      [lightMode]=\"!service.toolbarState().isDarkMode\"\n      [computedStyles]=\"service.pendingAnnotation()!.computedStylesObj\"\n      [positionStyle]=\"{\n        position: 'fixed',\n        left: service.pendingAnnotation()!.x + '%',\n        top: service.pendingAnnotation()!.clientY + 'px'\n      }\"\n      (submitText)=\"onAnnotationSubmit($event)\"\n      (cancel)=\"service.cancelPending()\"\n    />\n  }\n\n  <!-- \u30A2\u30CE\u30C6\u30FC\u30B7\u30E7\u30F3\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\uFF08\u7DE8\u96C6\uFF09 -->\n  @if (service.editingAnnotation()) {\n    <agentation-popup\n      #editPopup\n      [element]=\"service.editingAnnotation()!.element\"\n      [initialValue]=\"service.editingAnnotation()!.comment\"\n      [submitLabel]=\"'Save'\"\n      [accentColor]=\"service.settings().annotationColor\"\n      [lightMode]=\"!service.toolbarState().isDarkMode\"\n      [showDelete]=\"true\"\n      [positionStyle]=\"{\n        position: 'fixed',\n        left: service.editingAnnotation()!.x + '%',\n        top: (service.editingAnnotation()!.isFixed ? service.editingAnnotation()!.y : service.editingAnnotation()!.y - service.scrollY()) + 'px'\n      }\"\n      (submitText)=\"onAnnotationEditSubmit($event)\"\n      (cancel)=\"service.cancelEditing()\"\n      (delete)=\"onDeleteFromPopup(service.editingAnnotation()!.id)\"\n    />\n  }\n\n  <!-- \u30C9\u30E9\u30C3\u30B0\u9078\u629EUI -->\n  @if (isDragging()) {\n    <div class=\"agentation-drag-selection\" [ngStyle]=\"dragRectStyle()\"></div>\n    @for (rect of dragHighlightRects(); track $index) {\n      <div class=\"agentation-selected-highlight\" [ngStyle]=\"rectToStyle(rect)\"></div>\n    }\n  }\n</div>\n", styles: ["[data-agentation] svg[fill=none]{fill:none!important}@keyframes toolbarEnter{0%{opacity:0;transform:scale(.5) rotate(90deg)}to{opacity:1;transform:scale(1) rotate(0)}}@keyframes badgeEnter{0%{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}@keyframes scaleIn{0%{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}@keyframes scaleOut{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.85)}}@keyframes slideUp{0%{opacity:0;transform:scale(.85) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes slideDown{0%{opacity:1;transform:scale(1) translateY(0)}to{opacity:0;transform:scale(.85) translateY(8px)}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeOut{0%{opacity:1}to{opacity:0}}@keyframes hoverHighlightIn{0%{opacity:0;transform:scale(.98)}to{opacity:1;transform:scale(1)}}@keyframes hoverTooltipIn{0%{opacity:0;transform:scale(.95) translateY(4px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes connectionPulse{0%,to{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.9)}}[data-agentation] .agentation-toolbar{position:fixed;bottom:20px;right:20px;z-index:100000;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;-webkit-user-select:none;user-select:none;display:flex;align-items:center;gap:6px;background:#1a1a1a;color:#fff;border:none;border-radius:24px;padding:6px;box-shadow:0 2px 8px #0003,0 4px 16px #0000001a;pointer-events:auto;cursor:grab;transition:width .4s cubic-bezier(.19,1,.22,1),transform .4s cubic-bezier(.19,1,.22,1)}[data-agentation] .agentation-toolbar--dragging{transition:width .4s cubic-bezier(.19,1,.22,1);cursor:grabbing}[data-agentation] .agentation-toolbar--entrance{animation:toolbarEnter .5s cubic-bezier(.34,1.2,.64,1) forwards}[data-agentation] .agentation-toolbar--collapsed{width:44px;height:44px;border-radius:22px;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center}[data-agentation] .agentation-toolbar--collapsed svg{margin-top:-1px}[data-agentation] .agentation-toolbar--collapsed:hover{background:#2a2a2a}[data-agentation] .agentation-toolbar--collapsed:active{transform:scale(.95)}[data-agentation] .agentation-toolbar--expanded{height:44px;border-radius:24px;padding:6px;width:257px}[data-agentation] .agentation-toolbar__toggle{position:relative;cursor:pointer;display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;border:none;background:transparent;color:#ffffffd9;padding:0;transition:opacity .1s cubic-bezier(.19,1,.22,1)}[data-agentation] .agentation-toolbar__toggle:hover{background:#ffffff1f;color:#fff}[data-agentation] .agentation-toolbar__toggle:active{transform:scale(.92)}[data-agentation] .agentation-toolbar__toggle--visible{opacity:1;visibility:visible;pointer-events:auto}[data-agentation] .agentation-toolbar__toggle--hidden{opacity:0;pointer-events:none}[data-agentation] .agentation-toolbar__button{position:relative;cursor:pointer!important;display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;border:none;background:transparent;color:#ffffffd9;padding:0;transition:background-color .15s ease,color .15s ease,transform .1s ease,opacity .2s ease}[data-agentation] .agentation-toolbar__button:hover:not(:disabled):not(.agentation-toolbar__button--active):not(.agentation-toolbar__button--failed):not(.agentation-toolbar__button--auto-sync):not(.agentation-toolbar__button--error):not(.agentation-toolbar__button--no-hover){background:#ffffff1f;color:#fff}[data-agentation] .agentation-toolbar__button:active:not(:disabled){transform:scale(.92)}[data-agentation] .agentation-toolbar__button:disabled{opacity:.35;cursor:not-allowed!important}[data-agentation] .agentation-toolbar__button--active{color:#3c82f7;background:#3c82f740}[data-agentation] .agentation-toolbar__button--error{color:#ff3b30;background:#ff3b3040}[data-agentation] .agentation-toolbar__button--danger:hover:not(:disabled):not(.agentation-toolbar__button--active):not(.agentation-toolbar__button--failed){background:#ff3b3040;color:#ff3b30}[data-agentation] .agentation-toolbar__button--no-hover,[data-agentation] .agentation-toolbar__button--status-showing{cursor:default!important;pointer-events:none;background:transparent!important}[data-agentation] .agentation-toolbar__button--auto-sync{color:#34c759;background:transparent;cursor:default!important}[data-agentation] .agentation-toolbar__button--failed{color:#ff3b30;background:#ff3b3040}[data-agentation] .agentation-toolbar__button-badge{position:absolute;top:0;right:0;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:#3c82f7;color:#fff;font-size:10px;font-weight:600;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 2px #1a1a1a,0 1px 3px #0003;pointer-events:none}[data-agentation] .agentation-toolbar__button-badge--light{box-shadow:0 0 0 2px #fff,0 1px 3px #0003}[data-agentation] .agentation-toolbar__count{position:absolute;top:-13px;right:-13px;-webkit-user-select:none;user-select:none;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:#3c82f7;color:#fff;font-size:10px;font-weight:600;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 3px #00000026,inset 0 0 0 1px #ffffff0a;opacity:1;transition:transform .3s ease,opacity .2s ease;transform:scale(1)}[data-agentation] .agentation-toolbar__count--fade-out{opacity:0;transform:scale(0);pointer-events:none}[data-agentation] .agentation-toolbar__count--entrance{animation:badgeEnter .3s cubic-bezier(.34,1.2,.64,1) .4s both}[data-agentation] .agentation-toolbar__badge{position:absolute;top:-13px;right:-13px;-webkit-user-select:none;user-select:none;min-width:18px;height:18px;padding:0 5px;border-radius:9px;color:#fff;font-size:10px;font-weight:600;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 3px #00000026,inset 0 0 0 1px #ffffff0a;animation:badgeEnter .3s cubic-bezier(.34,1.2,.64,1) .4s both}[data-agentation] .agentation-toolbar__button-wrapper{position:relative;display:flex;align-items:center;justify-content:center}[data-agentation] .agentation-toolbar__button-wrapper:hover .agentation-toolbar__button-tooltip{opacity:1;visibility:visible;transform:translate(-50%) scale(1);transition-delay:.85s}[data-agentation] .agentation-toolbar__button-wrapper:has(.agentation-toolbar__button:disabled):hover .agentation-toolbar__button-tooltip{opacity:0;visibility:hidden}[data-agentation] .agentation-toolbar__send-wrapper{width:0;opacity:0;overflow:hidden;pointer-events:none;margin-left:-6px;transition:width .4s cubic-bezier(.19,1,.22,1),opacity .3s cubic-bezier(.19,1,.22,1),margin .4s cubic-bezier(.19,1,.22,1)}[data-agentation] .agentation-toolbar__send-wrapper .agentation-toolbar__button{transform:scale(.8);transition:transform .4s cubic-bezier(.19,1,.22,1)}[data-agentation] .agentation-toolbar__send-wrapper--visible{width:34px;opacity:1;overflow:visible;pointer-events:auto;margin-left:0}[data-agentation] .agentation-toolbar__send-wrapper--visible .agentation-toolbar__button{transform:scale(1)}[data-agentation] .agentation-toolbar__button-tooltip{position:absolute;bottom:calc(100% + 14px);left:50%;transform:translate(-50%) scale(.95);padding:6px 10px;background:#1a1a1a;color:#ffffffe6;font-size:12px;font-weight:500;border-radius:8px;white-space:nowrap;opacity:0;visibility:hidden;pointer-events:none;z-index:100001;box-shadow:0 2px 8px #0000004d;transition:opacity .135s ease,transform .135s ease,visibility .135s ease}[data-agentation] .agentation-toolbar__button-tooltip:after{content:\"\";position:absolute;top:calc(100% - 4px);left:50%;transform:translate(-50%) rotate(45deg);width:8px;height:8px;background:#1a1a1a;border-radius:0 0 2px}[data-agentation] .agentation-toolbar__shortcut{margin-left:4px;opacity:.5}[data-agentation] .agentation-toolbar--tooltip-below .agentation-toolbar__button-tooltip{bottom:auto;top:calc(100% + 14px);transform:translate(-50%) scale(.95)}[data-agentation] .agentation-toolbar--tooltip-below .agentation-toolbar__button-tooltip:after{top:-4px;bottom:auto;border-radius:2px 0 0}[data-agentation] .agentation-toolbar--tooltip-below .agentation-toolbar__button-wrapper:hover .agentation-toolbar__button-tooltip{transform:translate(-50%) scale(1)}[data-agentation] .agentation-toolbar--tooltips-hidden .agentation-toolbar__button-tooltip{opacity:0!important;visibility:hidden!important;transition:none!important}[data-agentation] .agentation-toolbar__button-tooltip--visible,[data-agentation] .agentation-toolbar--tooltips-hidden .agentation-toolbar__button-tooltip--visible{opacity:1!important;visibility:visible!important;transform:translate(-50%) scale(1)!important;transition-delay:0s!important}[data-agentation] .agentation-toolbar__button-wrapper--align-left .agentation-toolbar__button-tooltip{left:50%;transform:translate(-12px) scale(.95)}[data-agentation] .agentation-toolbar__button-wrapper--align-left .agentation-toolbar__button-tooltip:after{left:16px}[data-agentation] .agentation-toolbar__button-wrapper--align-left:hover .agentation-toolbar__button-tooltip{transform:translate(-12px) scale(1)}[data-agentation] .agentation-toolbar--tooltip-below .agentation-toolbar__button-wrapper--align-left .agentation-toolbar__button-tooltip{transform:translate(-12px) scale(.95)}[data-agentation] .agentation-toolbar--tooltip-below .agentation-toolbar__button-wrapper--align-left:hover .agentation-toolbar__button-tooltip{transform:translate(-12px) scale(1)}[data-agentation] .agentation-toolbar__button-wrapper--align-right .agentation-toolbar__button-tooltip{left:50%;transform:translate(calc(-100% + 12px)) scale(.95)}[data-agentation] .agentation-toolbar__button-wrapper--align-right .agentation-toolbar__button-tooltip:after{left:auto;right:8px}[data-agentation] .agentation-toolbar__button-wrapper--align-right:hover .agentation-toolbar__button-tooltip{transform:translate(calc(-100% + 12px)) scale(1)}[data-agentation] .agentation-toolbar--tooltip-below .agentation-toolbar__button-wrapper--align-right .agentation-toolbar__button-tooltip{transform:translate(calc(-100% + 12px)) scale(.95)}[data-agentation] .agentation-toolbar--tooltip-below .agentation-toolbar__button-wrapper--align-right:hover .agentation-toolbar__button-tooltip{transform:translate(calc(-100% + 12px)) scale(1)}[data-agentation] .agentation-toolbar__divider{width:1px;height:12px;background:#ffffff26;margin:0 2px}[data-agentation] .agentation-toolbar__settings-badge{position:absolute;top:3px;right:3px;width:6px;height:6px;border-radius:50%;pointer-events:none;transition:background .3s ease,opacity .15s ease,transform .15s ease}[data-agentation] .agentation-toolbar__settings-badge--connected{background:#34c759;animation:connectionPulse 2.5s ease-in-out infinite}[data-agentation] .agentation-toolbar__settings-badge--connecting{background:#f59e0b;animation:connectionPulse 1.5s ease-in-out infinite}[data-agentation] .agentation-toolbar__settings-badge--error{background:#ff3b30}[data-agentation] .agentation-hover-highlight{position:fixed;border:2px solid rgba(60,130,247,.5);border-radius:4px;pointer-events:none!important;background:#3c82f70a;box-sizing:border-box;will-change:opacity;contain:layout style;z-index:100000}[data-agentation] .agentation-hover-highlight--enter{animation:hoverHighlightIn .12s ease-out forwards}[data-agentation] .agentation-hover-label{position:fixed;font-size:11px;font-weight:500;color:#fff;background:#000000d9;padding:6px 10px;border-radius:6px;pointer-events:none!important;white-space:nowrap;max-width:280px;overflow:hidden;text-overflow:ellipsis;z-index:100001;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}[data-agentation] .agentation-hover-label--enter{animation:hoverTooltipIn .1s ease-out forwards}[data-agentation] .agentation-hover-label__path{font-size:10px;color:#fff9;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis}[data-agentation] .agentation-hover-label__element-name{overflow:hidden;text-overflow:ellipsis}[data-agentation] .agentation-overlay{position:fixed;inset:0;z-index:99997;pointer-events:none}[data-agentation] .agentation-overlay>*{pointer-events:auto}[data-agentation] .agentation-multi-select-outline{position:fixed;border:2px dashed rgba(52,199,89,.6);border-radius:4px;pointer-events:none!important;background:#34c7590d;box-sizing:border-box;will-change:opacity}[data-agentation] .agentation-multi-select-outline--enter{animation:fadeIn .15s ease-out forwards}[data-agentation] .agentation-multi-select-outline--exit{animation:fadeOut .15s ease-out forwards}[data-agentation] .agentation-single-select-outline{position:fixed;border:2px solid rgba(60,130,247,.6);border-radius:4px;pointer-events:none!important;background:#3c82f70d;box-sizing:border-box;will-change:opacity}[data-agentation] .agentation-single-select-outline--enter{animation:fadeIn .15s ease-out forwards}[data-agentation] .agentation-single-select-outline--exit{animation:fadeOut .15s ease-out forwards}[data-agentation] .agentation-markers-layer{position:absolute;top:0;left:0;right:0;height:0;z-index:100002;pointer-events:none}[data-agentation] .agentation-markers-layer>*{pointer-events:auto}[data-agentation] .agentation-fixed-markers-layer{position:fixed;inset:0;z-index:100002;pointer-events:none}[data-agentation] .agentation-fixed-markers-layer>*{pointer-events:auto}[data-agentation] .agentation-drag-selection{position:fixed;top:0;left:0;border:2px solid rgba(52,199,89,.6);border-radius:4px;background:#34c75914;pointer-events:none;z-index:99997;will-change:transform,width,height;contain:layout style}[data-agentation] .agentation-drag-selection__count{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#34c759;color:#fff;font-size:14px;font-weight:600;padding:4px 8px;border-radius:16px;min-width:24px;text-align:center}[data-agentation] .agentation-selected-highlight{position:fixed;top:0;left:0;border:2px solid rgba(52,199,89,.5);border-radius:4px;background:#34c7590f;pointer-events:none;will-change:transform,width,height;contain:layout style}[data-agentation]:not(.agentation--dark) .agentation-toolbar{background:#fff;color:#000000d9;box-shadow:0 2px 8px #00000014,0 4px 16px #0000000f,0 0 0 1px #0000000a}[data-agentation]:not(.agentation--dark) .agentation-toolbar--collapsed:hover{background:#f5f5f5}[data-agentation]:not(.agentation--dark) .agentation-toolbar__toggle{color:#00000080}[data-agentation]:not(.agentation--dark) .agentation-toolbar__toggle:hover{background:#0000000f;color:#000000d9}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button{color:#00000080}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button:hover:not(:disabled):not(.agentation-toolbar__button--active):not(.agentation-toolbar__button--failed):not(.agentation-toolbar__button--auto-sync):not(.agentation-toolbar__button--error):not(.agentation-toolbar__button--no-hover){background:#0000000f;color:#000000d9}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button--active{color:#3c82f7;background:#3c82f726}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button--error{color:#ff3b30;background:#ff3b3026}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button--danger:hover:not(:disabled):not(.agentation-toolbar__button--active):not(.agentation-toolbar__button--failed){background:#ff3b3026;color:#ff3b30}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button--auto-sync{color:#34c759;background:transparent}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button--failed{color:#ff3b30;background:#ff3b3026}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button-tooltip{background:#fff;color:#000000d9;box-shadow:0 2px 8px #00000014,0 4px 16px #0000000f,0 0 0 1px #0000000a}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button-tooltip:after{background:#fff}[data-agentation]:not(.agentation--dark) .agentation-toolbar__divider{background:#0000001a}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button-badge{box-shadow:0 0 0 2px #fff,0 1px 3px #0003}[data-agentation]:not(.agentation--dark) .agentation-toolbar__settings-badge{box-shadow:0 0 0 2px #fff}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "component", type: MarkerComponent, selector: "agentation-marker", inputs: ["annotationId", "number", "x", "y", "scrollY", "isFixed", "accentColor", "isExiting", "isHovered", "isRenumbering", "clickBehavior"], outputs: ["markerClick", "markerHoverStart", "markerHoverEnd"] }, { kind: "component", type: PopupComponent, selector: "agentation-popup", inputs: ["element", "timestamp", "selectedText", "placeholder", "initialValue", "submitLabel", "accentColor", "isExiting", "lightMode", "computedStyles", "positionStyle", "showDelete"], outputs: ["submitText", "cancel", "delete"] }, { kind: "component", type: SettingsComponent, selector: "agentation-settings", inputs: ["service", "endpoint"] }, { kind: "component", type: IconComponent, selector: "agentation-icon", inputs: ["data", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.18", ngImport: i0, type: AgentationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'agentation', standalone: true, imports: [
                        CommonModule,
                        OverlayModule,
                        MarkerComponent,
                        PopupComponent,
                        SettingsComponent,
                        IconComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [
                        AgentationService,
                        DOMEventService,
                        ServerSyncService,
                        { provide: OverlayContainer, useClass: AgentationOverlayContainer },
                    ], template: "<div\n  data-agentation\n  [class.agentation--dark]=\"service.toolbarState().isDarkMode\"\n>\n  <!-- \u30D5\u30ED\u30FC\u30C6\u30A3\u30F3\u30B0\u30C4\u30FC\u30EB\u30D0\u30FC -->\n  <div\n    class=\"agentation-toolbar\"\n    [style.--accent-color]=\"service.settings().annotationColor\"\n    data-feedback-toolbar\n  >\n    <!-- \u30DE\u30B9\u30B3\u30C3\u30C8/\u6D3B\u6027\u5316\u30DC\u30BF\u30F3 -->\n    <button\n      class=\"agentation-toolbar__toggle\"\n      (click)=\"toggleActive()\"\n      type=\"button\"\n    >\n      <agentation-icon [data]=\"icons.bunny\" [size]=\"20\" />\n      @if (!service.isActive() && service.hasAnnotations()) {\n        <span\n          class=\"agentation-toolbar__badge\"\n          [style.backgroundColor]=\"service.settings().annotationColor\"\n        >\n          {{ service.annotations().length }}\n        </span>\n      }\n    </button>\n\n    @if (service.isActive()) {\n      <!-- \u30A2\u30CE\u30C6\u30FC\u30B7\u30E7\u30F3\u6570\u30D0\u30C3\u30B8 -->\n      @if (service.hasAnnotations()) {\n        <div class=\"agentation-toolbar__count\">\n          {{ service.annotations().length }}\n        </div>\n      }\n\n      <!-- \u30DE\u30FC\u30AB\u30FC\u8868\u793A\u30C8\u30B0\u30EB -->\n      <button\n        class=\"agentation-toolbar__button\"\n        (click)=\"service.toggleMarkers()\"\n        type=\"button\"\n      >\n        <agentation-icon [data]=\"icons.eyeAnimated\" [size]=\"24\" />\n      </button>\n\n      <!-- \u30D5\u30EA\u30FC\u30BA\u30C8\u30B0\u30EB -->\n      <button\n        class=\"agentation-toolbar__button\"\n        (click)=\"service.toggleFreeze()\"\n        type=\"button\"\n      >\n        <agentation-icon [data]=\"icons.pausePlay\" [size]=\"24\" />\n      </button>\n\n      <!-- \u30B3\u30D4\u30FC -->\n      <button\n        class=\"agentation-toolbar__button\"\n        (click)=\"onCopy()\"\n        [disabled]=\"!service.hasAnnotations()\"\n        type=\"button\"\n      >\n        <agentation-icon [data]=\"icons.copy\" [size]=\"24\" />\n      </button>\n\n      <!-- \u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u306B\u9001\u4FE1\uFF08\u30A8\u30F3\u30C9\u30DD\u30A4\u30F3\u30C8\u63A5\u7D9A\u6642\u306E\u307F\uFF09 -->\n      @if (endpoint && service.syncState().currentSessionId) {\n        <button\n          class=\"agentation-toolbar__button\"\n          (click)=\"onSendToAgent()\"\n          [disabled]=\"!service.hasAnnotations()\"\n          type=\"button\"\n          title=\"Send Annotations\"\n        >\n          <agentation-icon [data]=\"icons.send\" [size]=\"24\" />\n        </button>\n      }\n\n      <!-- \u5168\u30AF\u30EA\u30A2 -->\n      <button\n        class=\"agentation-toolbar__button agentation-toolbar__button--danger\"\n        (click)=\"onClearAll()\"\n        [disabled]=\"!service.hasAnnotations()\"\n        type=\"button\"\n      >\n        <agentation-icon [data]=\"icons.trash\" [size]=\"24\" />\n      </button>\n\n      <!-- \u8A2D\u5B9A -->\n      <button\n        class=\"agentation-toolbar__button\"\n        (click)=\"service.toggleSettings()\"\n        type=\"button\"\n      >\n        <agentation-icon [data]=\"icons.gear\" [size]=\"24\" />\n        @if (endpoint && service.connectionStatus() !== 'disconnected') {\n          <span class=\"agentation-toolbar__settings-badge\"\n            [class.agentation-toolbar__settings-badge--connected]=\"service.connectionStatus() === 'connected'\"\n            [class.agentation-toolbar__settings-badge--connecting]=\"service.connectionStatus() === 'connecting'\"\n            [class.agentation-toolbar__settings-badge--error]=\"service.connectionStatus() === 'error'\"\n          ></span>\n        }\n      </button>\n\n      <!-- \u30C0\u30FC\u30AF\u30E2\u30FC\u30C9\u30C8\u30B0\u30EB -->\n      <button\n        class=\"agentation-toolbar__button\"\n        (click)=\"service.toggleDarkMode()\"\n        type=\"button\"\n      >\n        <agentation-icon\n          [data]=\"service.toolbarState().isDarkMode ? icons.sun : icons.moon\"\n          [size]=\"24\"\n        />\n      </button>\n    }\n  </div>\n\n  <!-- \u8A2D\u5B9A\u30D1\u30CD\u30EB -->\n  @if (service.toolbarState().showSettings && service.isActive()) {\n    <agentation-settings [service]=\"service\" [endpoint]=\"endpoint || ''\" />\n  }\n\n  <!-- \u30DE\u30FC\u30AB\u30FC\u30EC\u30A4\u30E4\u30FC -->\n  @if (service.isActive() && service.showMarkers()) {\n    @for (annotation of service.annotations(); track annotation.id; let i = $index) {\n      <agentation-marker\n        [annotationId]=\"annotation.id\"\n        [number]=\"i + 1\"\n        [x]=\"annotation.x\"\n        [y]=\"annotation.y\"\n        [scrollY]=\"service.scrollY()\"\n        [isFixed]=\"annotation.isFixed || false\"\n        [accentColor]=\"service.settings().annotationColor\"\n        [isExiting]=\"service.annotationState().exitingMarkers.has(annotation.id)\"\n        [isHovered]=\"service.annotationState().hoveredMarkerId === annotation.id\"\n        [clickBehavior]=\"service.settings().markerClickBehavior\"\n        (markerClick)=\"onMarkerClick($event)\"\n        (markerHoverStart)=\"service.setHoveredMarker($event)\"\n        (markerHoverEnd)=\"service.setHoveredMarker(null)\"\n      />\n    }\n  }\n\n  <!-- \u30DB\u30D0\u30FC\u30CF\u30A4\u30E9\u30A4\u30C8 -->\n  @if (service.isActive() && service.hoverInfo()?.rect && !isDragging()) {\n    <div\n      class=\"agentation-hover-highlight\"\n      [style.position]=\"'fixed'\"\n      [style.left.px]=\"service.hoverInfo()!.rect!.left\"\n      [style.top.px]=\"service.hoverInfo()!.rect!.top\"\n      [style.width.px]=\"service.hoverInfo()!.rect!.width\"\n      [style.height.px]=\"service.hoverInfo()!.rect!.height\"\n      [style.border]=\"'2px solid ' + service.settings().annotationColor\"\n      [style.backgroundColor]=\"hexToRgba(service.settings().annotationColor, 0.1)\"\n      [style.pointerEvents]=\"'none'\"\n      [style.zIndex]=\"'100000'\"\n      [style.borderRadius]=\"'4px'\"\n    ></div>\n  }\n\n  <!-- \u30DB\u30D0\u30FC\u30E9\u30D9\u30EB -->\n  @if (service.isActive() && service.hoverInfo()?.element && !isDragging()) {\n    <div\n      class=\"agentation-hover-label\"\n      [style.position]=\"'fixed'\"\n      [style.left.px]=\"service.hoverPosition().x + 16\"\n      [style.top.px]=\"service.hoverPosition().y + 16\"\n      [style.zIndex]=\"'100001'\"\n      [style.pointerEvents]=\"'none'\"\n    >\n      {{ service.hoverInfo()!.element }}\n    </div>\n  }\n\n  <!-- \u30A2\u30CE\u30C6\u30FC\u30B7\u30E7\u30F3\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\uFF08\u65B0\u898F\u4F5C\u6210\uFF09 -->\n  @if (service.pendingAnnotation()) {\n    <agentation-popup\n      #pendingPopup\n      [element]=\"service.pendingAnnotation()!.element\"\n      [selectedText]=\"service.pendingAnnotation()!.selectedText\"\n      [accentColor]=\"service.settings().annotationColor\"\n      [lightMode]=\"!service.toolbarState().isDarkMode\"\n      [computedStyles]=\"service.pendingAnnotation()!.computedStylesObj\"\n      [positionStyle]=\"{\n        position: 'fixed',\n        left: service.pendingAnnotation()!.x + '%',\n        top: service.pendingAnnotation()!.clientY + 'px'\n      }\"\n      (submitText)=\"onAnnotationSubmit($event)\"\n      (cancel)=\"service.cancelPending()\"\n    />\n  }\n\n  <!-- \u30A2\u30CE\u30C6\u30FC\u30B7\u30E7\u30F3\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\uFF08\u7DE8\u96C6\uFF09 -->\n  @if (service.editingAnnotation()) {\n    <agentation-popup\n      #editPopup\n      [element]=\"service.editingAnnotation()!.element\"\n      [initialValue]=\"service.editingAnnotation()!.comment\"\n      [submitLabel]=\"'Save'\"\n      [accentColor]=\"service.settings().annotationColor\"\n      [lightMode]=\"!service.toolbarState().isDarkMode\"\n      [showDelete]=\"true\"\n      [positionStyle]=\"{\n        position: 'fixed',\n        left: service.editingAnnotation()!.x + '%',\n        top: (service.editingAnnotation()!.isFixed ? service.editingAnnotation()!.y : service.editingAnnotation()!.y - service.scrollY()) + 'px'\n      }\"\n      (submitText)=\"onAnnotationEditSubmit($event)\"\n      (cancel)=\"service.cancelEditing()\"\n      (delete)=\"onDeleteFromPopup(service.editingAnnotation()!.id)\"\n    />\n  }\n\n  <!-- \u30C9\u30E9\u30C3\u30B0\u9078\u629EUI -->\n  @if (isDragging()) {\n    <div class=\"agentation-drag-selection\" [ngStyle]=\"dragRectStyle()\"></div>\n    @for (rect of dragHighlightRects(); track $index) {\n      <div class=\"agentation-selected-highlight\" [ngStyle]=\"rectToStyle(rect)\"></div>\n    }\n  }\n</div>\n", styles: ["[data-agentation] svg[fill=none]{fill:none!important}@keyframes toolbarEnter{0%{opacity:0;transform:scale(.5) rotate(90deg)}to{opacity:1;transform:scale(1) rotate(0)}}@keyframes badgeEnter{0%{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}@keyframes scaleIn{0%{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}@keyframes scaleOut{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.85)}}@keyframes slideUp{0%{opacity:0;transform:scale(.85) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes slideDown{0%{opacity:1;transform:scale(1) translateY(0)}to{opacity:0;transform:scale(.85) translateY(8px)}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeOut{0%{opacity:1}to{opacity:0}}@keyframes hoverHighlightIn{0%{opacity:0;transform:scale(.98)}to{opacity:1;transform:scale(1)}}@keyframes hoverTooltipIn{0%{opacity:0;transform:scale(.95) translateY(4px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes connectionPulse{0%,to{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.9)}}[data-agentation] .agentation-toolbar{position:fixed;bottom:20px;right:20px;z-index:100000;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;-webkit-user-select:none;user-select:none;display:flex;align-items:center;gap:6px;background:#1a1a1a;color:#fff;border:none;border-radius:24px;padding:6px;box-shadow:0 2px 8px #0003,0 4px 16px #0000001a;pointer-events:auto;cursor:grab;transition:width .4s cubic-bezier(.19,1,.22,1),transform .4s cubic-bezier(.19,1,.22,1)}[data-agentation] .agentation-toolbar--dragging{transition:width .4s cubic-bezier(.19,1,.22,1);cursor:grabbing}[data-agentation] .agentation-toolbar--entrance{animation:toolbarEnter .5s cubic-bezier(.34,1.2,.64,1) forwards}[data-agentation] .agentation-toolbar--collapsed{width:44px;height:44px;border-radius:22px;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center}[data-agentation] .agentation-toolbar--collapsed svg{margin-top:-1px}[data-agentation] .agentation-toolbar--collapsed:hover{background:#2a2a2a}[data-agentation] .agentation-toolbar--collapsed:active{transform:scale(.95)}[data-agentation] .agentation-toolbar--expanded{height:44px;border-radius:24px;padding:6px;width:257px}[data-agentation] .agentation-toolbar__toggle{position:relative;cursor:pointer;display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;border:none;background:transparent;color:#ffffffd9;padding:0;transition:opacity .1s cubic-bezier(.19,1,.22,1)}[data-agentation] .agentation-toolbar__toggle:hover{background:#ffffff1f;color:#fff}[data-agentation] .agentation-toolbar__toggle:active{transform:scale(.92)}[data-agentation] .agentation-toolbar__toggle--visible{opacity:1;visibility:visible;pointer-events:auto}[data-agentation] .agentation-toolbar__toggle--hidden{opacity:0;pointer-events:none}[data-agentation] .agentation-toolbar__button{position:relative;cursor:pointer!important;display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;border:none;background:transparent;color:#ffffffd9;padding:0;transition:background-color .15s ease,color .15s ease,transform .1s ease,opacity .2s ease}[data-agentation] .agentation-toolbar__button:hover:not(:disabled):not(.agentation-toolbar__button--active):not(.agentation-toolbar__button--failed):not(.agentation-toolbar__button--auto-sync):not(.agentation-toolbar__button--error):not(.agentation-toolbar__button--no-hover){background:#ffffff1f;color:#fff}[data-agentation] .agentation-toolbar__button:active:not(:disabled){transform:scale(.92)}[data-agentation] .agentation-toolbar__button:disabled{opacity:.35;cursor:not-allowed!important}[data-agentation] .agentation-toolbar__button--active{color:#3c82f7;background:#3c82f740}[data-agentation] .agentation-toolbar__button--error{color:#ff3b30;background:#ff3b3040}[data-agentation] .agentation-toolbar__button--danger:hover:not(:disabled):not(.agentation-toolbar__button--active):not(.agentation-toolbar__button--failed){background:#ff3b3040;color:#ff3b30}[data-agentation] .agentation-toolbar__button--no-hover,[data-agentation] .agentation-toolbar__button--status-showing{cursor:default!important;pointer-events:none;background:transparent!important}[data-agentation] .agentation-toolbar__button--auto-sync{color:#34c759;background:transparent;cursor:default!important}[data-agentation] .agentation-toolbar__button--failed{color:#ff3b30;background:#ff3b3040}[data-agentation] .agentation-toolbar__button-badge{position:absolute;top:0;right:0;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:#3c82f7;color:#fff;font-size:10px;font-weight:600;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 2px #1a1a1a,0 1px 3px #0003;pointer-events:none}[data-agentation] .agentation-toolbar__button-badge--light{box-shadow:0 0 0 2px #fff,0 1px 3px #0003}[data-agentation] .agentation-toolbar__count{position:absolute;top:-13px;right:-13px;-webkit-user-select:none;user-select:none;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:#3c82f7;color:#fff;font-size:10px;font-weight:600;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 3px #00000026,inset 0 0 0 1px #ffffff0a;opacity:1;transition:transform .3s ease,opacity .2s ease;transform:scale(1)}[data-agentation] .agentation-toolbar__count--fade-out{opacity:0;transform:scale(0);pointer-events:none}[data-agentation] .agentation-toolbar__count--entrance{animation:badgeEnter .3s cubic-bezier(.34,1.2,.64,1) .4s both}[data-agentation] .agentation-toolbar__badge{position:absolute;top:-13px;right:-13px;-webkit-user-select:none;user-select:none;min-width:18px;height:18px;padding:0 5px;border-radius:9px;color:#fff;font-size:10px;font-weight:600;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 3px #00000026,inset 0 0 0 1px #ffffff0a;animation:badgeEnter .3s cubic-bezier(.34,1.2,.64,1) .4s both}[data-agentation] .agentation-toolbar__button-wrapper{position:relative;display:flex;align-items:center;justify-content:center}[data-agentation] .agentation-toolbar__button-wrapper:hover .agentation-toolbar__button-tooltip{opacity:1;visibility:visible;transform:translate(-50%) scale(1);transition-delay:.85s}[data-agentation] .agentation-toolbar__button-wrapper:has(.agentation-toolbar__button:disabled):hover .agentation-toolbar__button-tooltip{opacity:0;visibility:hidden}[data-agentation] .agentation-toolbar__send-wrapper{width:0;opacity:0;overflow:hidden;pointer-events:none;margin-left:-6px;transition:width .4s cubic-bezier(.19,1,.22,1),opacity .3s cubic-bezier(.19,1,.22,1),margin .4s cubic-bezier(.19,1,.22,1)}[data-agentation] .agentation-toolbar__send-wrapper .agentation-toolbar__button{transform:scale(.8);transition:transform .4s cubic-bezier(.19,1,.22,1)}[data-agentation] .agentation-toolbar__send-wrapper--visible{width:34px;opacity:1;overflow:visible;pointer-events:auto;margin-left:0}[data-agentation] .agentation-toolbar__send-wrapper--visible .agentation-toolbar__button{transform:scale(1)}[data-agentation] .agentation-toolbar__button-tooltip{position:absolute;bottom:calc(100% + 14px);left:50%;transform:translate(-50%) scale(.95);padding:6px 10px;background:#1a1a1a;color:#ffffffe6;font-size:12px;font-weight:500;border-radius:8px;white-space:nowrap;opacity:0;visibility:hidden;pointer-events:none;z-index:100001;box-shadow:0 2px 8px #0000004d;transition:opacity .135s ease,transform .135s ease,visibility .135s ease}[data-agentation] .agentation-toolbar__button-tooltip:after{content:\"\";position:absolute;top:calc(100% - 4px);left:50%;transform:translate(-50%) rotate(45deg);width:8px;height:8px;background:#1a1a1a;border-radius:0 0 2px}[data-agentation] .agentation-toolbar__shortcut{margin-left:4px;opacity:.5}[data-agentation] .agentation-toolbar--tooltip-below .agentation-toolbar__button-tooltip{bottom:auto;top:calc(100% + 14px);transform:translate(-50%) scale(.95)}[data-agentation] .agentation-toolbar--tooltip-below .agentation-toolbar__button-tooltip:after{top:-4px;bottom:auto;border-radius:2px 0 0}[data-agentation] .agentation-toolbar--tooltip-below .agentation-toolbar__button-wrapper:hover .agentation-toolbar__button-tooltip{transform:translate(-50%) scale(1)}[data-agentation] .agentation-toolbar--tooltips-hidden .agentation-toolbar__button-tooltip{opacity:0!important;visibility:hidden!important;transition:none!important}[data-agentation] .agentation-toolbar__button-tooltip--visible,[data-agentation] .agentation-toolbar--tooltips-hidden .agentation-toolbar__button-tooltip--visible{opacity:1!important;visibility:visible!important;transform:translate(-50%) scale(1)!important;transition-delay:0s!important}[data-agentation] .agentation-toolbar__button-wrapper--align-left .agentation-toolbar__button-tooltip{left:50%;transform:translate(-12px) scale(.95)}[data-agentation] .agentation-toolbar__button-wrapper--align-left .agentation-toolbar__button-tooltip:after{left:16px}[data-agentation] .agentation-toolbar__button-wrapper--align-left:hover .agentation-toolbar__button-tooltip{transform:translate(-12px) scale(1)}[data-agentation] .agentation-toolbar--tooltip-below .agentation-toolbar__button-wrapper--align-left .agentation-toolbar__button-tooltip{transform:translate(-12px) scale(.95)}[data-agentation] .agentation-toolbar--tooltip-below .agentation-toolbar__button-wrapper--align-left:hover .agentation-toolbar__button-tooltip{transform:translate(-12px) scale(1)}[data-agentation] .agentation-toolbar__button-wrapper--align-right .agentation-toolbar__button-tooltip{left:50%;transform:translate(calc(-100% + 12px)) scale(.95)}[data-agentation] .agentation-toolbar__button-wrapper--align-right .agentation-toolbar__button-tooltip:after{left:auto;right:8px}[data-agentation] .agentation-toolbar__button-wrapper--align-right:hover .agentation-toolbar__button-tooltip{transform:translate(calc(-100% + 12px)) scale(1)}[data-agentation] .agentation-toolbar--tooltip-below .agentation-toolbar__button-wrapper--align-right .agentation-toolbar__button-tooltip{transform:translate(calc(-100% + 12px)) scale(.95)}[data-agentation] .agentation-toolbar--tooltip-below .agentation-toolbar__button-wrapper--align-right:hover .agentation-toolbar__button-tooltip{transform:translate(calc(-100% + 12px)) scale(1)}[data-agentation] .agentation-toolbar__divider{width:1px;height:12px;background:#ffffff26;margin:0 2px}[data-agentation] .agentation-toolbar__settings-badge{position:absolute;top:3px;right:3px;width:6px;height:6px;border-radius:50%;pointer-events:none;transition:background .3s ease,opacity .15s ease,transform .15s ease}[data-agentation] .agentation-toolbar__settings-badge--connected{background:#34c759;animation:connectionPulse 2.5s ease-in-out infinite}[data-agentation] .agentation-toolbar__settings-badge--connecting{background:#f59e0b;animation:connectionPulse 1.5s ease-in-out infinite}[data-agentation] .agentation-toolbar__settings-badge--error{background:#ff3b30}[data-agentation] .agentation-hover-highlight{position:fixed;border:2px solid rgba(60,130,247,.5);border-radius:4px;pointer-events:none!important;background:#3c82f70a;box-sizing:border-box;will-change:opacity;contain:layout style;z-index:100000}[data-agentation] .agentation-hover-highlight--enter{animation:hoverHighlightIn .12s ease-out forwards}[data-agentation] .agentation-hover-label{position:fixed;font-size:11px;font-weight:500;color:#fff;background:#000000d9;padding:6px 10px;border-radius:6px;pointer-events:none!important;white-space:nowrap;max-width:280px;overflow:hidden;text-overflow:ellipsis;z-index:100001;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}[data-agentation] .agentation-hover-label--enter{animation:hoverTooltipIn .1s ease-out forwards}[data-agentation] .agentation-hover-label__path{font-size:10px;color:#fff9;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis}[data-agentation] .agentation-hover-label__element-name{overflow:hidden;text-overflow:ellipsis}[data-agentation] .agentation-overlay{position:fixed;inset:0;z-index:99997;pointer-events:none}[data-agentation] .agentation-overlay>*{pointer-events:auto}[data-agentation] .agentation-multi-select-outline{position:fixed;border:2px dashed rgba(52,199,89,.6);border-radius:4px;pointer-events:none!important;background:#34c7590d;box-sizing:border-box;will-change:opacity}[data-agentation] .agentation-multi-select-outline--enter{animation:fadeIn .15s ease-out forwards}[data-agentation] .agentation-multi-select-outline--exit{animation:fadeOut .15s ease-out forwards}[data-agentation] .agentation-single-select-outline{position:fixed;border:2px solid rgba(60,130,247,.6);border-radius:4px;pointer-events:none!important;background:#3c82f70d;box-sizing:border-box;will-change:opacity}[data-agentation] .agentation-single-select-outline--enter{animation:fadeIn .15s ease-out forwards}[data-agentation] .agentation-single-select-outline--exit{animation:fadeOut .15s ease-out forwards}[data-agentation] .agentation-markers-layer{position:absolute;top:0;left:0;right:0;height:0;z-index:100002;pointer-events:none}[data-agentation] .agentation-markers-layer>*{pointer-events:auto}[data-agentation] .agentation-fixed-markers-layer{position:fixed;inset:0;z-index:100002;pointer-events:none}[data-agentation] .agentation-fixed-markers-layer>*{pointer-events:auto}[data-agentation] .agentation-drag-selection{position:fixed;top:0;left:0;border:2px solid rgba(52,199,89,.6);border-radius:4px;background:#34c75914;pointer-events:none;z-index:99997;will-change:transform,width,height;contain:layout style}[data-agentation] .agentation-drag-selection__count{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#34c759;color:#fff;font-size:14px;font-weight:600;padding:4px 8px;border-radius:16px;min-width:24px;text-align:center}[data-agentation] .agentation-selected-highlight{position:fixed;top:0;left:0;border:2px solid rgba(52,199,89,.5);border-radius:4px;background:#34c7590f;pointer-events:none;will-change:transform,width,height;contain:layout style}[data-agentation]:not(.agentation--dark) .agentation-toolbar{background:#fff;color:#000000d9;box-shadow:0 2px 8px #00000014,0 4px 16px #0000000f,0 0 0 1px #0000000a}[data-agentation]:not(.agentation--dark) .agentation-toolbar--collapsed:hover{background:#f5f5f5}[data-agentation]:not(.agentation--dark) .agentation-toolbar__toggle{color:#00000080}[data-agentation]:not(.agentation--dark) .agentation-toolbar__toggle:hover{background:#0000000f;color:#000000d9}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button{color:#00000080}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button:hover:not(:disabled):not(.agentation-toolbar__button--active):not(.agentation-toolbar__button--failed):not(.agentation-toolbar__button--auto-sync):not(.agentation-toolbar__button--error):not(.agentation-toolbar__button--no-hover){background:#0000000f;color:#000000d9}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button--active{color:#3c82f7;background:#3c82f726}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button--error{color:#ff3b30;background:#ff3b3026}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button--danger:hover:not(:disabled):not(.agentation-toolbar__button--active):not(.agentation-toolbar__button--failed){background:#ff3b3026;color:#ff3b30}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button--auto-sync{color:#34c759;background:transparent}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button--failed{color:#ff3b30;background:#ff3b3026}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button-tooltip{background:#fff;color:#000000d9;box-shadow:0 2px 8px #00000014,0 4px 16px #0000000f,0 0 0 1px #0000000a}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button-tooltip:after{background:#fff}[data-agentation]:not(.agentation--dark) .agentation-toolbar__divider{background:#0000001a}[data-agentation]:not(.agentation--dark) .agentation-toolbar__button-badge{box-shadow:0 0 0 2px #fff,0 1px 3px #0003}[data-agentation]:not(.agentation--dark) .agentation-toolbar__settings-badge{box-shadow:0 0 0 2px #fff}\n"] }]
        }], ctorParameters: () => [], propDecorators: { endpoint: [{
                type: Input
            }], sessionId: [{
                type: Input
            }], copyToClipboard: [{
                type: Input
            }], webhookUrl: [{
                type: Input
            }], annotationAdd: [{
                type: Output
            }], annotationDelete: [{
                type: Output
            }], annotationUpdate: [{
                type: Output
            }], annotationsClear: [{
                type: Output
            }], copyOutput: [{
                type: Output
            }], sessionCreated: [{
                type: Output
            }], pendingPopup: [{
                type: ViewChild,
                args: ['pendingPopup']
            }], editPopup: [{
                type: ViewChild,
                args: ['editPopup']
            }] } });

// =============================================================================
// @agentation/angular - 公開API
// =============================================================================
// メインコンポーネント

/**
 * Generated bundle index. Do not edit.
 */

export { AgentationComponent, AgentationOverlayContainer, AgentationService, COLOR_OPTIONS, DEFAULT_SETTINGS, DOMEventService, IconComponent, MARKER_CLICK_OPTIONS, MarkerComponent, OUTPUT_DETAIL_OPTIONS, OUTPUT_TO_ANGULAR_MODE, PopupComponent, ServerSyncService, SettingsComponent, deepElementFromPoint, formatRelativeTime, generateOutput, getAngularComponentName, hexToRgba, isElementFixed, isValidUrl, truncateUrl };
//# sourceMappingURL=agentation-angular.mjs.map
