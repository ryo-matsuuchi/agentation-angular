// =============================================================================
// Angularコンポーネント検出モジュール
// =============================================================================

// 検出設定
export interface DetectionConfig {
  /** 検出モード: auto（自動判定）, debug-api（ng.getComponent使用）, tag-name（タグ名ベース） */
  mode?: 'auto' | 'debug-api' | 'tag-name';
  /** 親要素の探索上限 */
  maxDepth?: number;
  /** 検出するコンポーネント数の上限 */
  maxComponents?: number;
}

// コンポーネント情報
export interface ComponentInfo {
  /** コンポーネントパス（例: "<AppComponent> <DashboardComponent> <ButtonComponent>"） */
  path: string | null;
  /** コンポーネント名の配列 */
  components: string[];
}

/**
 * HTMLElementに対応するAngularコンポーネント名を検出する
 */
export function getAngularComponentName(
  element: HTMLElement,
  config: DetectionConfig = {}
): ComponentInfo {
  const { mode = 'auto', maxDepth = 10, maxComponents = 5 } = config;

  // デバッグAPI利用可能か判定
  if (mode === 'auto' || mode === 'debug-api') {
    if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>)['ng']) {
      const ng = (window as unknown as Record<string, unknown>)['ng'] as Record<string, unknown>;
      if (typeof ng['getComponent'] === 'function') {
        return detectViaDebugAPI(element, maxDepth, maxComponents);
      }
    }
  }

  // フォールバック: タグ名ベース検出
  if (mode === 'auto' || mode === 'tag-name') {
    return detectViaTagName(element, maxDepth, maxComponents);
  }

  return { path: null, components: [] };
}

/**
 * Angular Debug API経由でコンポーネントを検出
 */
function detectViaDebugAPI(
  element: HTMLElement,
  maxDepth: number,
  maxComponents: number
): ComponentInfo {
  const ng = (window as unknown as Record<string, unknown>)['ng'] as Record<string, (...args: unknown[]) => unknown>;
  const components: string[] = [];
  let current: HTMLElement | null = element;
  let depth = 0;

  while (current && depth < maxDepth && components.length < maxComponents) {
    try {
      const component = ng['getComponent'](current) as Record<string, unknown> | null;
      if (component) {
        const name = (component.constructor as { name?: string })?.name || current.tagName.toLowerCase();
        components.unshift(name);
      }
    } catch {
      // コンポーネントが見つからない場合は無視
    }
    current = current.parentElement;
    depth++;
  }

  return {
    path: components.length > 0 ? components.map(c => `<${c}>`).join(' ') : null,
    components,
  };
}

/**
 * タグ名ベースでAngularコンポーネントを検出（常時利用可能）
 */
function detectViaTagName(
  element: HTMLElement,
  maxDepth: number,
  maxComponents: number
): ComponentInfo {
  const components: string[] = [];
  let current: HTMLElement | null = element;
  let depth = 0;

  while (current && depth < maxDepth && components.length < maxComponents) {
    const tagName = current.tagName?.toLowerCase();
    // カスタム要素（ハイフン含むタグ名）はAngularコンポーネントの可能性が高い
    if (tagName && tagName.includes('-') && !tagName.startsWith('ng-')) {
      // ケバブケースをPascalCaseに変換
      const pascalName = tagName
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      components.unshift(pascalName);
    }
    current = current.parentElement;
    depth++;
  }

  return {
    path: components.length > 0 ? components.map(c => `<${c}>`).join(' ') : null,
    components,
  };
}
