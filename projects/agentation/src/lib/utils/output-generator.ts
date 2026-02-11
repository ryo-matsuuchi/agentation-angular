// =============================================================================
// 出力生成ユーティリティ
// =============================================================================

import type { Annotation } from '../types';

// 出力詳細レベル
export type OutputDetailLevel = 'compact' | 'standard' | 'detailed' | 'forensic';

// Angularコンポーネント検出モード（outputDetailから導出）
export type AngularComponentMode = 'smart' | 'filtered' | 'all' | 'off';

/**
 * アノテーション配列からMarkdown形式の出力テキストを生成
 */
export function generateOutput(
  annotations: Annotation[],
  pathname: string,
  detailLevel: OutputDetailLevel = 'standard',
  angularMode: AngularComponentMode = 'filtered',
): string {
  if (annotations.length === 0) return '';

  const viewport =
    typeof window !== 'undefined'
      ? `${window.innerWidth}×${window.innerHeight}`
      : 'unknown';

  let output = `## Page Feedback: ${pathname}\n`;

  if (detailLevel === 'forensic') {
    // フォレンジックモード用のフル環境情報
    output += `\n**Environment:**\n`;
    output += `- Viewport: ${viewport}\n`;
    if (typeof window !== 'undefined') {
      output += `- URL: ${window.location.href}\n`;
      output += `- User Agent: ${navigator.userAgent}\n`;
      output += `- Timestamp: ${new Date().toISOString()}\n`;
      output += `- Device Pixel Ratio: ${window.devicePixelRatio}\n`;
    }
    output += `\n---\n`;
  } else if (detailLevel !== 'compact') {
    output += `**Viewport:** ${viewport}\n`;
  }
  output += '\n';

  annotations.forEach((a, i) => {
    if (detailLevel === 'compact') {
      output += `${i + 1}. **${a.element}**: ${a.comment}`;
      if (a.selectedText) {
        output += ` (re: "${a.selectedText.slice(0, 30)}${a.selectedText.length > 30 ? '...' : ''}")`;
      }
      output += '\n';
    } else if (detailLevel === 'forensic') {
      // フォレンジックモード - 出力ページの例に合わせた順序
      output += `### ${i + 1}. ${a.element}\n`;
      if (a.isMultiSelect && a.fullPath) {
        output += `*Forensic data shown for first element of selection*\n`;
      }
      if (a.fullPath) {
        output += `**Full DOM Path:** ${a.fullPath}\n`;
      }
      if (a.cssClasses) {
        output += `**CSS Classes:** ${a.cssClasses}\n`;
      }
      if (a.boundingBox) {
        output += `**Position:** x:${Math.round(a.boundingBox.x)}, y:${Math.round(a.boundingBox.y)} (${Math.round(a.boundingBox.width)}×${Math.round(a.boundingBox.height)}px)\n`;
      }
      output += `**Annotation at:** ${a.x.toFixed(1)}% from left, ${Math.round(a.y)}px from top\n`;
      if (a.selectedText) {
        output += `**Selected text:** "${a.selectedText}"\n`;
      }
      if (a.nearbyText && !a.selectedText) {
        output += `**Context:** ${a.nearbyText.slice(0, 100)}\n`;
      }
      if (a.computedStyles) {
        output += `**Computed Styles:** ${a.computedStyles}\n`;
      }
      if (a.accessibility) {
        output += `**Accessibility:** ${a.accessibility}\n`;
      }
      if (a.nearbyElements) {
        output += `**Nearby Elements:** ${a.nearbyElements}\n`;
      }
      if (a.angularComponents) {
        output += `**Angular:** ${a.angularComponents}\n`;
      }
      output += `**Feedback:** ${a.comment}\n\n`;
    } else {
      // スタンダード・詳細モード
      output += `### ${i + 1}. ${a.element}\n`;
      output += `**Location:** ${a.elementPath}\n`;

      // Angularコンポーネント（スタンダード・詳細両方で表示）
      if (a.angularComponents) {
        output += `**Angular:** ${a.angularComponents}\n`;
      }

      if (detailLevel === 'detailed') {
        if (a.cssClasses) {
          output += `**Classes:** ${a.cssClasses}\n`;
        }

        if (a.boundingBox) {
          output += `**Position:** ${Math.round(a.boundingBox.x)}px, ${Math.round(a.boundingBox.y)}px (${Math.round(a.boundingBox.width)}×${Math.round(a.boundingBox.height)}px)\n`;
        }
      }

      if (a.selectedText) {
        output += `**Selected text:** "${a.selectedText}"\n`;
      }

      if (detailLevel === 'detailed' && a.nearbyText && !a.selectedText) {
        output += `**Context:** ${a.nearbyText.slice(0, 100)}\n`;
      }

      output += `**Feedback:** ${a.comment}\n\n`;
    }
  });

  return output.trim();
}
