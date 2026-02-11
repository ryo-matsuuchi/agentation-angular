// =============================================================================
// 共有型定義
// =============================================================================

export type Annotation = {
  id: string;
  x: number; // ビューポート幅に対する%
  y: number; // ドキュメント上端からのpx（絶対値）、isFixedの場合はビューポート基準
  comment: string;
  element: string;
  elementPath: string;
  timestamp: number;
  selectedText?: string;
  boundingBox?: { x: number; y: number; width: number; height: number };
  nearbyText?: string;
  cssClasses?: string;
  nearbyElements?: string;
  computedStyles?: string;
  fullPath?: string;
  accessibility?: string;
  isMultiSelect?: boolean; // ドラッグ選択で作成された場合true
  isFixed?: boolean; // 要素がfixed/sticky配置の場合true（マーカーがfixedになる）
  angularComponents?: string; // Angularコンポーネント階層（例: "<AppComponent> <DashboardComponent> <ButtonComponent>"）
  elementBoundingBoxes?: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>; // マルチセレクト時のホバーハイライト用個別バウンディングボックス

  // プロトコルフィールド（サーバー同期時に追加）
  sessionId?: string;
  url?: string;
  intent?: AnnotationIntent;
  severity?: AnnotationSeverity;
  status?: AnnotationStatus;
  thread?: ThreadMessage[];
  createdAt?: string;
  updatedAt?: string;
  resolvedAt?: string;
  resolvedBy?: "human" | "agent";
  authorId?: string;

  // ローカル専用同期追跡（サーバーには送信しない）
  _syncedTo?: string; // この注釈が同期されたセッションID
};

// -----------------------------------------------------------------------------
// アノテーション列挙型
// -----------------------------------------------------------------------------

export type AnnotationIntent = "fix" | "change" | "question" | "approve";
export type AnnotationSeverity = "blocking" | "important" | "suggestion";
export type AnnotationStatus = "pending" | "acknowledged" | "resolved" | "dismissed";

// -----------------------------------------------------------------------------
// セッション
// -----------------------------------------------------------------------------

export type Session = {
  id: string;
  url: string;
  status: SessionStatus;
  createdAt: string;
  updatedAt?: string;
  projectId?: string;
  metadata?: Record<string, unknown>;
};

export type SessionStatus = "active" | "approved" | "closed";

export type SessionWithAnnotations = Session & {
  annotations: Annotation[];
};

// -----------------------------------------------------------------------------
// スレッドメッセージ
// -----------------------------------------------------------------------------

export type ThreadMessage = {
  id: string;
  role: "human" | "agent";
  content: string;
  timestamp: number;
};
