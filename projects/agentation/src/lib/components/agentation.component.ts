// =============================================================================
// Agentationメインコンポーネント
// =============================================================================
//
// 公開APIの唯一のエントリポイント。
// React版のPageFeedbackToolbarCSSに相当するAngularコンポーネント。
// ツールバー、マーカー、ホバーハイライト、ポップアップを統合管理する。
//

import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  inject,
  effect,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MarkerComponent } from './marker.component';
import { PopupComponent } from './popup.component';
import { SettingsComponent } from './settings.component';
import { IconComponent } from '../icons/icon.component';
import { AgentationOverlayContainer } from './overlay-container';
import { AgentationService } from '../services/agentation.service';
import { DOMEventService } from '../services/dom-event.service';
import { ServerSyncService } from '../services/server-sync.service';
import {
  ICON_PLUS,
  ICON_EYE_ANIMATED,
  ICON_PAUSE_PLAY_ANIMATED,
  ICON_COPY_ANIMATED,
  ICON_SEND_ARROW,
  ICON_GEAR,
  ICON_TRASH_ALT,
  ICON_SUN,
  ICON_MOON,
  ICON_CHEVRON_LEFT,
  ICON_LIST_SPARKLE,
  ICON_ANIMATED_BUNNY,
} from '../icons/icon-data';
import { hexToRgba } from '../utils/helpers';
import { freeze as freezeAll, unfreeze as unfreezeAll } from '../utils/freeze-animations';
import type { Annotation } from '../types';

@Component({
  selector: 'agentation',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    MarkerComponent,
    PopupComponent,
    SettingsComponent,
    IconComponent,
  ],
  templateUrl: './agentation.component.html',
  styleUrl: './agentation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    AgentationService,
    DOMEventService,
    ServerSyncService,
    { provide: OverlayContainer, useClass: AgentationOverlayContainer },
  ],
})
export class AgentationComponent implements OnInit, OnDestroy {
  // ===== 入力プロパティ =====
  /** サーバーエンドポイントURL */
  @Input() endpoint?: string;
  /** 既存セッションID */
  @Input() sessionId?: string;
  /** コピー時にクリップボードに書き込むか */
  @Input() copyToClipboard = true;
  /** WebhookURL */
  @Input() webhookUrl?: string;

  // ===== 出力イベント =====
  @Output() annotationAdd = new EventEmitter<Annotation>();
  @Output() annotationDelete = new EventEmitter<Annotation>();
  @Output() annotationUpdate = new EventEmitter<Annotation>();
  @Output() annotationsClear = new EventEmitter<Annotation[]>();
  @Output() copyOutput = new EventEmitter<string>();
  @Output() sessionCreated = new EventEmitter<string>();

  // ===== サービス注入 =====
  readonly service = inject(AgentationService);
  private readonly domEvents = inject(DOMEventService);
  private readonly serverSync = inject(ServerSyncService);

  // ===== アイコンデータ =====
  readonly icons = {
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
  readonly hexToRgba = hexToRgba;

  // ポップアップ参照（shake用）
  @ViewChild('pendingPopup') pendingPopup?: PopupComponent;
  @ViewChild('editPopup') editPopup?: PopupComponent;

  // ドラッグ選択の状態
  readonly isDragging = signal(false);
  readonly dragRectStyle = signal<Record<string, string>>({});
  readonly dragHighlightRects = signal<DOMRect[]>([]);

  /** DOMRectをngStyleオブジェクトに変換 */
  rectToStyle(rect: DOMRect): Record<string, string> {
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
      } else {
        this.domEvents.detach();
      }
    });

    // フリーズ状態の変更を監視
    effect(() => {
      if (this.service.isFrozen()) {
        freezeAll();
      } else {
        unfreezeAll();
      }
    });
  }

  ngOnInit(): void {
    // サービス初期化
    this.service.copyToClipboardEnabled = this.copyToClipboard;
    this.service.configure({
      endpoint: this.endpoint,
      sessionId: this.sessionId,
      webhookUrl: this.webhookUrl,
    });

    // DOMイベント購読
    this.domEvents.mouseMove$.subscribe(result => {
      if (!this.service.isActive()) return;
      this.service.updateHover(
        result.element ? {
          element: result.element,
          elementName: result.elementName,
          elementPath: result.elementPath,
          rect: result.rect,
          angularComponents: result.angularComponents,
        } : null,
        result.position,
      );
    });

    this.domEvents.elementClick$.subscribe(result => {
      if (!this.service.isActive()) return;

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
      } else if (this.service.editingAnnotation()) {
        this.service.cancelEditing();
      } else if (this.service.isActive()) {
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
      if (!this.service.isActive()) return;

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
      } else {
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

  ngOnDestroy(): void {
    this.domEvents.destroy();
    this.serverSync.destroy();

    // フリーズ解除
    if (this.service.isFrozen()) {
      unfreezeAll();
    }
  }

  // ===== テンプレート用メソッド =====

  /** ツールバー活性化トグル */
  toggleActive(): void {
    if (this.service.isActive()) {
      this.service.deactivate();
    } else {
      this.service.activate();
    }
  }

  /** アノテーション送信 */
  onAnnotationSubmit(text: string): void {
    const annotation = this.service.addAnnotation(text);
    if (annotation) {
      this.annotationAdd.emit(annotation);
    }
  }

  /** アノテーション編集送信 */
  onAnnotationEditSubmit(text: string): void {
    const editing = this.service.editingAnnotation();
    if (!editing) return;
    const updated = this.service.updateAnnotation(editing.id, text);
    if (updated) {
      this.annotationUpdate.emit(updated);
    }
  }

  /** マーカークリック */
  onMarkerClick(id: string): void {
    const behavior = this.service.settings().markerClickBehavior;
    if (behavior === 'delete') {
      const deleted = this.service.deleteAnnotation(id);
      if (deleted) {
        this.annotationDelete.emit(deleted);
      }
    } else {
      const annotation = this.service.annotations().find(a => a.id === id);
      if (annotation) {
        this.service.startEditing(annotation);
      }
    }
  }

  /** 編集ポップアップからの削除（常に削除動作） */
  onDeleteFromPopup(id: string): void {
    const deleted = this.service.deleteAnnotation(id);
    if (deleted) {
      this.annotationDelete.emit(deleted);
    }
  }

  /** コピー */
  async onCopy(): Promise<void> {
    const output = await this.service.copyOutput();
    this.copyOutput.emit(output);
  }

  /** 全クリア */
  onClearAll(): void {
    const cleared = this.service.clearAll();
    this.annotationsClear.emit(cleared);
  }

  /** エージェントに送信 */
  async onSendToAgent(): Promise<void> {
    await this.service.sendToAgent();
  }
}
