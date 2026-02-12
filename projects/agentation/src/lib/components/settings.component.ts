// =============================================================================
// 設定パネルコンポーネント
// =============================================================================

import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  OnInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentationService } from '../services/agentation.service';
import {
  COLOR_OPTIONS,
  OUTPUT_DETAIL_OPTIONS,
  MARKER_CLICK_OPTIONS,
} from '../constants';
import type { MarkerClickBehavior } from '../constants';
import type { OutputDetailLevel } from '../utils/output-generator';
import { originalSetTimeout } from '../utils/freeze-animations';

// アニメーション状態
type AnimState = 'initial' | 'enter' | 'entered' | 'exit';

@Component({
  selector: 'agentation-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit, OnDestroy {
  /** サービス参照 */
  @Input({ required: true }) service!: AgentationService;

  /** MCPエンドポイントURL */
  @Input() endpoint = '';

  // MCPパネル表示状態
  readonly showMcpPanel = signal(false);

  // アニメーション状態
  readonly animState = signal<AnimState>('initial');

  // 定数公開（テンプレートで使用）
  readonly colorOptions = COLOR_OPTIONS;
  readonly outputDetailOptions = OUTPUT_DETAIL_OPTIONS;
  readonly markerClickOptions = MARKER_CLICK_OPTIONS;

  // タイマー参照
  private enterTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    // 入場アニメーション
    originalSetTimeout(() => {
      this.animState.set('enter');
    }, 0);

    this.enterTimer = originalSetTimeout(() => {
      this.animState.set('entered');
    }, 200);
  }

  ngOnDestroy(): void {
    if (this.enterTimer) clearTimeout(this.enterTimer);
  }

  /** 設定パネルのCSSクラス算出 */
  get panelClass(): string {
    const classes = ['agentation-settings'];
    const isDark = this.service.toolbarState().isDarkMode;
    if (!isDark) classes.push('agentation-settings--light');
    if (this.animState() === 'enter') classes.push('agentation-settings--enter');
    if (this.animState() === 'entered') classes.push('agentation-settings--entered');
    if (this.animState() === 'exit') classes.push('agentation-settings--exit');
    return classes.join(' ');
  }

  /** 出力詳細レベル変更 */
  onOutputDetailChange(value: string): void {
    this.service.updateSettings({ outputDetail: value as OutputDetailLevel });
  }

  /** アノテーションカラー変更 */
  onColorChange(value: string): void {
    this.service.updateSettings({ annotationColor: value });
  }

  /** マーカークリック動作変更 */
  onMarkerClickChange(value: string): void {
    this.service.updateSettings({ markerClickBehavior: value as MarkerClickBehavior });
  }

  /** 自動クリア トグル */
  onAutoClearToggle(): void {
    this.service.updateSettings({
      autoClearAfterCopy: !this.service.settings().autoClearAfterCopy,
    });
  }

  /** インタラクションブロック トグル */
  onBlockInteractionsToggle(): void {
    this.service.updateSettings({
      blockInteractions: !this.service.settings().blockInteractions,
    });
  }

  /** Angular検出 トグル */
  onAngularToggle(): void {
    this.service.updateSettings({
      angularEnabled: !this.service.settings().angularEnabled,
    });
  }

  /** Webhook トグル */
  onWebhooksToggle(): void {
    this.service.updateSettings({
      webhooksEnabled: !this.service.settings().webhooksEnabled,
    });
  }

  /** Webhook URL変更 */
  onWebhookUrlChange(value: string): void {
    this.service.updateSettings({ webhookUrl: value });
  }

  /** MCPパネルを開く */
  onOpenMcpPanel(): void {
    this.showMcpPanel.set(true);
  }

  /** MCPパネルを閉じる */
  onCloseMcpPanel(): void {
    this.showMcpPanel.set(false);
  }

  /** 設定パネルを閉じる */
  close(): void {
    this.animState.set('exit');
    originalSetTimeout(() => {
      this.service.toggleSettings();
    }, 150);
  }
}
