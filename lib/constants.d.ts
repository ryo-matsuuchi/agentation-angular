import type { OutputDetailLevel, AngularComponentMode } from './utils/output-generator';
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
export declare const DEFAULT_SETTINGS: ToolbarSettings;
export declare const OUTPUT_TO_ANGULAR_MODE: Record<OutputDetailLevel, AngularComponentMode>;
export declare const MARKER_CLICK_OPTIONS: {
    value: MarkerClickBehavior;
    label: string;
}[];
export declare const OUTPUT_DETAIL_OPTIONS: {
    value: OutputDetailLevel;
    label: string;
}[];
export declare const COLOR_OPTIONS: {
    value: string;
    label: string;
}[];
