// =============================================================================
// AgentationService - Angular Signalsベースの状態管理サービス
// =============================================================================

import { Injectable, signal, computed } from '@angular/core';
import type { Annotation } from '../types';
import type { ToolbarSettings, MarkerClickBehavior } from '../constants';
import { DEFAULT_SETTINGS, OUTPUT_TO_ANGULAR_MODE } from '../constants';
import { loadAnnotations, saveAnnotations, saveAnnotationsWithSyncMarker } from '../utils/storage';
import { syncAnnotation, updateAnnotation as updateAnnotationOnServer, deleteAnnotation as deleteAnnotationFromServer, requestAction } from '../utils/sync';
import { generateOutput } from '../utils/output-generator';
import type { OutputDetailLevel, AngularComponentMode } from '../utils/output-generator';

// ツールバーUI状態
export interface ToolbarUIState {
  isActive: boolean;
  showMarkers: boolean;
  markersVisible: boolean;
  markersExiting: boolean;
  isDarkMode: boolean;
  showSettings: boolean;
  showSettingsVisible: boolean;
  settingsPage: 'main' | 'automations';
  toolbarPosition: { x: number; y: number } | null;
  isTransitioning: boolean;
  tooltipsHidden: boolean;
  mounted: boolean;
}

// アノテーション状態
export interface AnnotationState {
  annotations: Annotation[];
  pendingAnnotation: PendingAnnotation | null;
  editingAnnotation: Annotation | null;
  hoveredMarkerId: string | null;
  deletingMarkerId: string | null;
  exitingMarkers: Set<string>;
  renumberFrom: number | null;
}

// 保留中アノテーション
export interface PendingAnnotation {
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
  multiSelectElements?: HTMLElement[];
  targetElement?: HTMLElement;
}

// ホバー情報
export interface HoverInfo {
  element: string;
  elementName: string;
  elementPath: string;
  rect: DOMRect | null;
  angularComponents?: string | null;
}

// サーバー接続状態
export interface SyncState {
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
  currentSessionId: string | null;
}

// コピー/送信状態
export interface ActionUIState {
  copied: boolean;
  sendState: 'idle' | 'sending' | 'sent' | 'failed';
  cleared: boolean;
  isClearing: boolean;
}

/** UUID生成（crypto.randomUUID非対応ブラウザ用フォールバック） */
function generateId(): string {
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

@Injectable()
export class AgentationService {
  // ツールバーUI状態
  readonly toolbarState = signal<ToolbarUIState>({
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
  readonly annotationState = signal<AnnotationState>({
    annotations: [],
    pendingAnnotation: null,
    editingAnnotation: null,
    hoveredMarkerId: null,
    deletingMarkerId: null,
    exitingMarkers: new Set(),
    renumberFrom: null,
  });

  // ホバー情報
  readonly hoverInfo = signal<HoverInfo | null>(null);
  readonly hoverPosition = signal<{ x: number; y: number }>({ x: 0, y: 0 });

  // サーバー接続状態
  readonly syncState = signal<SyncState>({
    connectionStatus: 'disconnected',
    currentSessionId: null,
  });

  // アクションUI状態
  readonly actionState = signal<ActionUIState>({
    copied: false,
    sendState: 'idle',
    cleared: false,
    isClearing: false,
  });

  // フリーズ状態
  readonly isFrozen = signal(false);

  // スクロール状態
  readonly scrollY = signal(0);
  readonly isScrolling = signal(false);

  // 設定
  readonly settings = signal<ToolbarSettings>(DEFAULT_SETTINGS);

  // ===== 算出状態 =====
  readonly annotations = computed(() => this.annotationState().annotations);
  readonly hasAnnotations = computed(() => this.annotations().length > 0);
  readonly isActive = computed(() => this.toolbarState().isActive);
  readonly pendingAnnotation = computed(() => this.annotationState().pendingAnnotation);
  readonly editingAnnotation = computed(() => this.annotationState().editingAnnotation);
  readonly showMarkers = computed(() => this.toolbarState().showMarkers);
  readonly markersVisible = computed(() => this.toolbarState().markersVisible);
  readonly connectionStatus = computed(() => this.syncState().connectionStatus);
  readonly currentSessionId = computed(() => this.syncState().currentSessionId);

  // Angular検出モード（設定の出力詳細レベルから導出）
  readonly angularMode = computed<AngularComponentMode>(() => {
    const s = this.settings();
    if (!s.angularEnabled) return 'off';
    return OUTPUT_TO_ANGULAR_MODE[s.outputDetail];
  });

  // エンドポイントとパス名（コンポーネントから設定される）
  private endpoint: string | undefined;
  private pathname = '';
  private webhookUrl: string | undefined;
  /** クリップボード書き込みフラグ（コンポーネントから設定） */
  copyToClipboardEnabled = true;

  // ===== 初期化 =====

  /** コンポーネントからの設定注入 */
  configure(config: {
    endpoint?: string;
    sessionId?: string;
    webhookUrl?: string;
  }): void {
    this.endpoint = config.endpoint;
    this.webhookUrl = config.webhookUrl;
    this.pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

    if (config.sessionId) {
      this.syncState.update(s => ({ ...s, currentSessionId: config.sessionId! }));
    }

    // localStorageからアノテーション読み込み
    const stored = loadAnnotations<Annotation>(this.pathname);
    if (stored.length > 0) {
      this.annotationState.update(s => ({ ...s, annotations: stored }));
    }

    this.toolbarState.update(s => ({ ...s, mounted: true }));
  }

  // ===== ツールバーアクション =====

  activate(): void {
    this.toolbarState.update(s => ({ ...s, isActive: true }));
  }

  deactivate(): void {
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

  toggleMarkers(): void {
    this.toolbarState.update(s => ({ ...s, showMarkers: !s.showMarkers }));
  }

  toggleSettings(): void {
    this.toolbarState.update(s => ({
      ...s,
      showSettings: !s.showSettings,
      showSettingsVisible: !s.showSettings,
      settingsPage: 'main',
    }));
  }

  toggleDarkMode(): void {
    this.toolbarState.update(s => ({ ...s, isDarkMode: !s.isDarkMode }));
  }

  updateSettings(partial: Partial<ToolbarSettings>): void {
    this.settings.update(s => ({ ...s, ...partial }));
  }

  setToolbarPosition(pos: { x: number; y: number } | null): void {
    this.toolbarState.update(s => ({ ...s, toolbarPosition: pos }));
  }

  // ===== アノテーション操作 =====

  /** 新しいアノテーション要素の選択を開始 */
  startAnnotation(pending: PendingAnnotation): void {
    this.annotationState.update(s => ({
      ...s,
      pendingAnnotation: pending,
      editingAnnotation: null,
    }));
  }

  /** アノテーション追加（テキスト入力完了後） */
  addAnnotation(comment: string): Annotation | null {
    const pending = this.annotationState().pendingAnnotation;
    if (!pending) return null;

    const annotation: Annotation = {
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
  deleteAnnotation(id: string): Annotation | undefined {
    const annotation = this.annotations().find(a => a.id === id);
    if (!annotation) return undefined;

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
      deleteAnnotationFromServer(this.endpoint, id).catch(() => {});
    }

    return annotation;
  }

  /** アノテーション更新（コメント編集） */
  updateAnnotation(id: string, comment: string): Annotation | undefined {
    let updated: Annotation | undefined;

    this.annotationState.update(s => {
      const idx = s.annotations.findIndex(a => a.id === id);
      if (idx === -1) return s;
      const newAnnotations = [...s.annotations];
      newAnnotations[idx] = { ...newAnnotations[idx], comment };
      updated = newAnnotations[idx];
      return { ...s, annotations: newAnnotations, editingAnnotation: null };
    });

    this.persistAnnotations();

    // サーバー更新
    if (updated && this.endpoint && this.syncState().currentSessionId) {
      updateAnnotationOnServer(this.endpoint, id, { comment }).catch(() => {});
    }

    return updated;
  }

  /** 全アノテーション削除 */
  clearAll(): Annotation[] {
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
        deleteAnnotationFromServer(this.endpoint, annotation.id).catch(() => {});
      }
    }

    return cleared;
  }

  /** アノテーション編集モード開始 */
  startEditing(annotation: Annotation): void {
    this.annotationState.update(s => ({
      ...s,
      editingAnnotation: annotation,
      pendingAnnotation: null,
    }));
  }

  /** アノテーション編集モードキャンセル */
  cancelEditing(): void {
    this.annotationState.update(s => ({ ...s, editingAnnotation: null }));
  }

  /** 保留中アノテーションのキャンセル */
  cancelPending(): void {
    this.annotationState.update(s => ({ ...s, pendingAnnotation: null }));
  }

  // ===== ホバー状態 =====

  updateHover(info: HoverInfo | null, position?: { x: number; y: number }): void {
    this.hoverInfo.set(info);
    if (position) {
      this.hoverPosition.set(position);
    }
  }

  setHoveredMarker(id: string | null): void {
    this.annotationState.update(s => ({ ...s, hoveredMarkerId: id }));
  }

  // ===== 出力・コピー =====

  async copyOutput(): Promise<string> {
    const output = generateOutput(
      this.annotations(),
      this.pathname,
      this.settings().outputDetail,
      this.angularMode(),
    );

    if (this.copyToClipboardEnabled) {
      try {
        await navigator.clipboard.writeText(output);
        this.actionState.update(s => ({ ...s, copied: true }));
        setTimeout(() => {
          this.actionState.update(s => ({ ...s, copied: false }));
        }, 2000);
      } catch {
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
  async sendToAgent(): Promise<void> {
    if (!this.endpoint || !this.syncState().currentSessionId) return;

    this.actionState.update(s => ({ ...s, sendState: 'sending' }));

    const output = generateOutput(
      this.annotations(),
      this.pathname,
      this.settings().outputDetail,
      this.angularMode(),
    );

    try {
      await requestAction(this.endpoint, this.syncState().currentSessionId!, output);
      this.actionState.update(s => ({ ...s, sendState: 'sent' }));
      setTimeout(() => {
        this.actionState.update(s => ({ ...s, sendState: 'idle' }));
      }, 2000);
    } catch {
      this.actionState.update(s => ({ ...s, sendState: 'failed' }));
      setTimeout(() => {
        this.actionState.update(s => ({ ...s, sendState: 'idle' }));
      }, 2000);
    }
  }

  // ===== フリーズ制御 =====

  toggleFreeze(): void {
    // freeze/unfreezeはfreeze-animations.tsから呼び出し
    this.isFrozen.update(v => !v);
  }

  // ===== スクロール状態 =====

  updateScrollY(y: number): void {
    this.scrollY.set(y);
  }

  setScrolling(isScrolling: boolean): void {
    this.isScrolling.set(isScrolling);
  }

  // ===== プライベート =====

  /** localStorageへの永続化 */
  private persistAnnotations(): void {
    const sessionId = this.syncState().currentSessionId;
    if (sessionId) {
      saveAnnotationsWithSyncMarker(this.pathname, this.annotations(), sessionId);
    } else {
      saveAnnotations(this.pathname, this.annotations());
    }
  }

  /** サーバーへの同期 */
  private async syncToServer(annotation: Annotation): Promise<void> {
    if (!this.endpoint) return;

    const sessionId = this.syncState().currentSessionId;
    if (!sessionId) return;

    const url = typeof window !== 'undefined' ? window.location.href : '';

    try {
      await syncAnnotation(this.endpoint, sessionId, {
        ...annotation,
        sessionId,
        url,
      });
    } catch {
      // 同期失敗時は無視（localStorageにはすでに保存済み）
    }
  }
}
