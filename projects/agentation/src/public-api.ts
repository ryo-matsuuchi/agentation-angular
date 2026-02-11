// =============================================================================
// @agentation/angular - 公開API
// =============================================================================

// メインコンポーネント
export { AgentationComponent } from './lib/components/agentation.component';

// サブコンポーネント（上級者向け）
export { MarkerComponent } from './lib/components/marker.component';
export { PopupComponent } from './lib/components/popup.component';
export { IconComponent } from './lib/icons/icon.component';

// サービス
export { AgentationService } from './lib/services/agentation.service';
export type {
  ToolbarUIState,
  AnnotationState,
  PendingAnnotation,
  HoverInfo,
  SyncState,
  ActionUIState,
} from './lib/services/agentation.service';
export { DOMEventService } from './lib/services/dom-event.service';
export type { MouseMoveResult, ClickResult } from './lib/services/dom-event.service';
export { ServerSyncService } from './lib/services/server-sync.service';
export type { ServerAnnotationEvent } from './lib/services/server-sync.service';

// Overlay
export { AgentationOverlayContainer } from './lib/components/overlay-container';

// 型定義
export type {
  Annotation,
  AnnotationIntent,
  AnnotationSeverity,
  AnnotationStatus,
  Session,
  SessionStatus,
  SessionWithAnnotations,
  ThreadMessage,
} from './lib/types';

// 定数・設定
export type { ToolbarSettings, MarkerClickBehavior } from './lib/constants';
export {
  DEFAULT_SETTINGS,
  OUTPUT_TO_ANGULAR_MODE,
  COLOR_OPTIONS,
  OUTPUT_DETAIL_OPTIONS,
  MARKER_CLICK_OPTIONS,
} from './lib/constants';

// ユーティリティ（上級者向け）
export {
  deepElementFromPoint,
  isElementFixed,
  hexToRgba,
  formatRelativeTime,
  truncateUrl,
  isValidUrl,
} from './lib/utils/helpers';
export { generateOutput } from './lib/utils/output-generator';
export type { OutputDetailLevel, AngularComponentMode } from './lib/utils/output-generator';

// アイコンデータ（tree-shakable）
export type { IconData, PathData, CircleData, AnimatedIconData } from './lib/icons/icon-data';
// 個別アイコンは icon-data.ts から直接インポートで利用可能

// 検出
export { getAngularComponentName } from './lib/detection/angular-detector';
export type { DetectionConfig, ComponentInfo } from './lib/detection/angular-detector';
