export interface PathData {
    d: string;
    stroke?: string;
    strokeWidth?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    fill?: string;
    className?: string;
    style?: Record<string, string>;
}
export interface CircleData {
    cx: string;
    cy: string;
    r: string;
    stroke?: string;
    strokeWidth?: string;
    fill?: string;
    className?: string;
}
export interface RectData {
    x?: string;
    y?: string;
    width: string;
    height: string;
    fill?: string;
}
export interface TextData {
    x: string;
    y: string;
    textAnchor?: string;
    fontSize?: string;
    fontWeight?: string;
    fill?: string;
    fontFamily?: string;
    className?: string;
    content: string;
}
export interface IconData {
    viewBox: string;
    paths: PathData[];
    circles?: CircleData[];
    rects?: RectData[];
    texts?: TextData[];
    defs?: string;
    cssAnimations?: string;
}
export interface AnimatedIconData extends IconData {
    cssAnimations?: string;
    variants?: Record<string, {
        paths: PathData[];
        circles?: CircleData[];
    }>;
}
export declare const ICON_CLOSE: IconData;
export declare const ICON_PLUS: IconData;
export declare const ICON_CHECK: IconData;
export declare const ICON_CHECK_SMALL: IconData;
export declare const ICON_LIST_SPARKLE: IconData;
export declare const ICON_HELP: IconData;
export declare const ICON_COPY_ALT: IconData;
export declare const ICON_EYE: IconData;
export declare const ICON_EYE_ALT: IconData;
export declare const ICON_EYE_CLOSED: IconData;
export declare const ICON_EYE_MINUS: IconData;
export declare const ICON_GEAR: IconData;
export declare const ICON_PAUSE_ALT: IconData;
export declare const ICON_PAUSE: IconData;
export declare const ICON_PLAY_ALT: IconData;
export declare const ICON_TRASH_ALT: IconData;
export declare const ICON_CHAT_ELLIPSIS: IconData;
export declare const ICON_CHECKMARK: IconData;
export declare const ICON_CHECKMARK_LARGE: IconData;
export declare const ICON_CHECKMARK_CIRCLE: IconData;
export declare const ICON_XMARK: IconData;
export declare const ICON_XMARK_LARGE: IconData;
export declare const ICON_SUN: IconData;
export declare const ICON_MOON: IconData;
export declare const ICON_EDIT: IconData;
export declare const ICON_TRASH: IconData;
export declare const ICON_CHEVRON_LEFT: IconData;
export declare const ICON_CHEVRON_RIGHT: IconData;
export declare const ICON_CHECK_SMALL_ANIMATED: AnimatedIconData;
export declare const ICON_COPY_ANIMATED: AnimatedIconData;
export declare const ICON_SEND_ARROW: AnimatedIconData;
export declare const ICON_SEND_ANIMATED: AnimatedIconData;
export declare const ICON_EYE_ANIMATED: AnimatedIconData;
export declare const ICON_PAUSE_PLAY_ANIMATED: AnimatedIconData;
export declare const ICON_ANIMATED_BUNNY: AnimatedIconData;
