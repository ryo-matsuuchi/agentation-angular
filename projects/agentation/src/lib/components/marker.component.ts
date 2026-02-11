// =============================================================================
// マーカーコンポーネント
// =============================================================================
//
// アノテーション位置に表示される番号バッジ。
// クリック動作（編集/削除）とホバーエフェクトをサポート。
//

import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icons/icon.component';
import { ICON_CLOSE, ICON_EDIT } from '../icons/icon-data';

@Component({
  selector: 'agentation-marker',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './marker.component.html',
  styleUrl: './marker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerComponent {
  /** アノテーションID */
  @Input({ required: true }) annotationId!: string;
  /** マーカー番号（1から開始） */
  @Input({ required: true }) number!: number;
  /** X座標（ビューポート幅の%） */
  @Input({ required: true }) x!: number;
  /** Y座標（px - ドキュメント上部からの絶対位置） */
  @Input({ required: true }) y!: number;
  /** スクロールY値 */
  @Input() scrollY = 0;
  /** fixed配置かどうか */
  @Input() isFixed = false;
  /** アクセントカラー */
  @Input() accentColor = '#3c82f7';
  /** 退場アニメーション中か */
  @Input() isExiting = false;
  /** ホバー中か */
  @Input() isHovered = false;
  /** 番号変更アニメーション */
  @Input() isRenumbering = false;
  /** クリック動作モード */
  @Input() clickBehavior: 'edit' | 'delete' = 'edit';

  /** マーカークリック */
  @Output() markerClick = new EventEmitter<string>();
  /** マーカーホバー開始 */
  @Output() markerHoverStart = new EventEmitter<string>();
  /** マーカーホバー終了 */
  @Output() markerHoverEnd = new EventEmitter<string>();

  // アイコンデータ
  readonly closeIcon = ICON_CLOSE;
  readonly editIcon = ICON_EDIT;

  /** マーカーの表示位置（top） */
  get topPosition(): number {
    return this.isFixed ? this.y : this.y - this.scrollY;
  }

  /** マーカーのスタイル */
  get markerStyle(): Record<string, string> {
    return {
      position: 'fixed',
      left: `${this.x}%`,
      top: `${this.topPosition}px`,
      transform: 'translate(-50%, -50%)',
      zIndex: '100002',
    };
  }

  /** マーカーのCSSクラス */
  get markerClass(): string {
    const classes = ['agentation-marker'];
    if (this.isExiting) classes.push('agentation-marker--exiting');
    if (this.isHovered) classes.push('agentation-marker--hovered');
    if (this.isRenumbering) classes.push('agentation-marker--renumbering');
    return classes.join(' ');
  }

  onClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.markerClick.emit(this.annotationId);
  }

  onMouseEnter(): void {
    this.markerHoverStart.emit(this.annotationId);
  }

  onMouseLeave(): void {
    this.markerHoverEnd.emit(this.annotationId);
  }
}
