// =============================================================================
// アノテーションポップアップコンポーネント
// =============================================================================

import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  signal,
  input,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icons/icon.component';
import { ICON_TRASH } from '../icons/icon-data';
import { originalSetTimeout } from '../utils/freeze-animations';

// アニメーション状態
type AnimState = 'initial' | 'enter' | 'entered' | 'exit';

@Component({
  selector: 'agentation-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PopupComponent implements OnInit, OnDestroy {
  /** shakeアニメーションのトリガー（signal input） */
  readonly shakeTrigger = input(0);

  /** 要素名（ヘッダー表示用） */
  @Input({ required: true }) element!: string;
  /** タイムスタンプ表示 */
  @Input() timestamp?: string;
  /** 選択テキスト */
  @Input() selectedText?: string;
  /** プレースホルダー */
  @Input() placeholder = 'What should change?';
  /** 初期値（編集モード用） */
  @Input() initialValue = '';
  /** 送信ボタンラベル */
  @Input() submitLabel = 'Add';
  /** アクセントカラー（hex） */
  @Input() accentColor = '#3c82f7';
  /** 退場状態（親制御） */
  @Input() isExiting = false;
  /** ライトモード */
  @Input() lightMode = false;
  /** 要素のComputedStyles */
  @Input() computedStyles?: Record<string, string>;
  /** ポジションスタイル */
  @Input() positionStyle?: Record<string, string>;
  /** 削除ボタン表示 */
  @Input() showDelete = false;

  /** テキスト送信イベント */
  @Output() submitText = new EventEmitter<string>();
  /** キャンセルイベント */
  @Output() cancel = new EventEmitter<void>();
  /** 削除イベント */
  @Output() delete = new EventEmitter<void>();

  @ViewChild('textareaRef') textareaRef!: ElementRef<HTMLTextAreaElement>;

  // 内部状態
  readonly text = signal('');
  readonly animState = signal<AnimState>('initial');
  readonly isShaking = signal(false);
  readonly isFocused = signal(false);
  readonly isStylesExpanded = signal(false);

  // アイコンデータ
  readonly trashIcon = ICON_TRASH;

  constructor() {
    // shakeTriggerが変更されたらshakeアニメーションを発火
    effect(() => {
      const v = this.shakeTrigger();
      if (v > 0) {
        this.shake();
      }
    });
  }

  // タイマー参照
  private cancelTimer: ReturnType<typeof setTimeout> | null = null;
  private shakeTimer: ReturnType<typeof setTimeout> | null = null;
  private enterTimer: ReturnType<typeof setTimeout> | null = null;
  private focusTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    if (this.cancelTimer) clearTimeout(this.cancelTimer);
    if (this.shakeTimer) clearTimeout(this.shakeTimer);
    if (this.enterTimer) clearTimeout(this.enterTimer);
    if (this.focusTimer) clearTimeout(this.focusTimer);
  }

  /** シェイクアニメーション（外部から呼び出し可能） */
  shake(): void {
    if (this.shakeTimer) clearTimeout(this.shakeTimer);
    this.isShaking.set(true);
    this.shakeTimer = originalSetTimeout(() => {
      this.isShaking.set(false);
      this.textareaRef?.nativeElement?.focus();
    }, 250);
  }

  /** キャンセル処理（退場アニメーション付き） */
  handleCancel(): void {
    this.animState.set('exit');
    this.cancelTimer = originalSetTimeout(() => {
      this.cancel.emit();
    }, 150);
  }

  /** 送信処理 */
  handleSubmit(): void {
    const trimmed = this.text().trim();
    if (!trimmed) return;
    this.submitText.emit(trimmed);
  }

  /** キーボード処理 */
  handleKeyDown(event: KeyboardEvent): void {
    // IME入力中は無視
    if (event.isComposing) return;
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleSubmit();
    }
    if (event.key === 'Escape') {
      this.handleCancel();
    }
  }

  /** テキスト変更 */
  onTextChange(value: string): void {
    this.text.set(value);
  }

  /** スタイル表示トグル */
  toggleStyles(): void {
    const wasExpanded = this.isStylesExpanded();
    this.isStylesExpanded.set(!wasExpanded);
    if (wasExpanded) {
      originalSetTimeout(() => this.textareaRef?.nativeElement?.focus(), 0);
    }
  }

  /** ComputedStylesのエントリ取得 */
  get styleEntries(): Array<[string, string]> {
    if (!this.computedStyles) return [];
    return Object.entries(this.computedStyles);
  }

  /** CSSプロパティ名をケバブケースに変換 */
  toKebabCase(str: string): string {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
  }

  /** ポップアップのCSSクラス算出 */
  get popupClass(): string {
    const classes = ['agentation-popup'];
    if (this.lightMode) classes.push('agentation-popup--light');
    if (this.animState() === 'enter') classes.push('agentation-popup--enter');
    if (this.animState() === 'entered') classes.push('agentation-popup--entered');
    if (this.animState() === 'exit') classes.push('agentation-popup--exit');
    if (this.isShaking()) classes.push('agentation-popup--shake');
    return classes.join(' ');
  }
}
