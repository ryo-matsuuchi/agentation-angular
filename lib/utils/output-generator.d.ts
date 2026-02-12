import type { Annotation } from '../types';
export type OutputDetailLevel = 'compact' | 'standard' | 'detailed' | 'forensic';
export type AngularComponentMode = 'smart' | 'filtered' | 'all' | 'off';
/**
 * アノテーション配列からMarkdown形式の出力テキストを生成
 */
export declare function generateOutput(annotations: Annotation[], pathname: string, detailLevel?: OutputDetailLevel, angularMode?: AngularComponentMode): string;
