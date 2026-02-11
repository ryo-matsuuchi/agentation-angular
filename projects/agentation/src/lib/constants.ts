// =============================================================================
// ツールバー設定定数
// =============================================================================

import type { OutputDetailLevel, AngularComponentMode } from './utils/output-generator';

// ツールバー設定の型定義
export type MarkerClickBehavior = 'edit' | 'delete';

export interface ToolbarSettings {
  outputDetail: OutputDetailLevel;
  autoClearAfterCopy: boolean;
  annotationColor: string;
  blockInteractions: boolean;
  angularEnabled: boolean;
  markerClickBehavior: MarkerClickBehavior;
  webhookUrl: string;
  webhooksEnabled: boolean;
}

// デフォルト設定値
export const DEFAULT_SETTINGS: ToolbarSettings = {
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
export const OUTPUT_TO_ANGULAR_MODE: Record<OutputDetailLevel, AngularComponentMode> = {
  compact: 'off',
  standard: 'filtered',
  detailed: 'smart',
  forensic: 'all',
};

// マーカークリック動作の選択肢
export const MARKER_CLICK_OPTIONS: { value: MarkerClickBehavior; label: string }[] = [
  { value: 'edit', label: 'Edit' },
  { value: 'delete', label: 'Delete' },
];

// 出力詳細レベルの選択肢
export const OUTPUT_DETAIL_OPTIONS: { value: OutputDetailLevel; label: string }[] = [
  { value: 'compact', label: 'Compact' },
  { value: 'standard', label: 'Standard' },
  { value: 'detailed', label: 'Detailed' },
  { value: 'forensic', label: 'Forensic' },
];

// アノテーションカラーの選択肢
export const COLOR_OPTIONS = [
  { value: '#AF52DE', label: 'Purple' },
  { value: '#3c82f7', label: 'Blue' },
  { value: '#5AC8FA', label: 'Cyan' },
  { value: '#34C759', label: 'Green' },
  { value: '#FFD60A', label: 'Yellow' },
  { value: '#FF9500', label: 'Orange' },
  { value: '#FF3B30', label: 'Red' },
];
