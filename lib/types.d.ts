export type Annotation = {
    id: string;
    x: number;
    y: number;
    comment: string;
    element: string;
    elementPath: string;
    timestamp: number;
    selectedText?: string;
    boundingBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    nearbyText?: string;
    cssClasses?: string;
    nearbyElements?: string;
    computedStyles?: string;
    fullPath?: string;
    accessibility?: string;
    isMultiSelect?: boolean;
    isFixed?: boolean;
    angularComponents?: string;
    elementBoundingBoxes?: Array<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
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
    _syncedTo?: string;
};
export type AnnotationIntent = "fix" | "change" | "question" | "approve";
export type AnnotationSeverity = "blocking" | "important" | "suggestion";
export type AnnotationStatus = "pending" | "acknowledged" | "resolved" | "dismissed";
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
export type ThreadMessage = {
    id: string;
    role: "human" | "agent";
    content: string;
    timestamp: number;
};
