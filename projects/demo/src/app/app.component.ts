import { Component } from '@angular/core';
import { AgentationComponent } from '@agentation/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgentationComponent],
  template: `
    <div style="padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <h1>Agentation Angular Demo</h1>
      <p>ページ上の要素をクリックしてアノテーションを追加してみてください。</p>

      <div style="margin-top: 2rem;">
        <h2>サンプルコンテンツ</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
          <div style="padding: 1.5rem; background: #f0f4ff; border-radius: 8px;">
            <h3>カード 1</h3>
            <p>このカードにアノテーションを追加できます。</p>
            <button style="padding: 0.5rem 1rem; background: #3c82f7; color: white; border: none; border-radius: 4px; cursor: pointer;">
              ボタン
            </button>
          </div>
          <div style="padding: 1.5rem; background: #f0fff4; border-radius: 8px;">
            <h3>カード 2</h3>
            <p>Agentationはページ上の任意の要素にフィードバックを付与できます。</p>
            <input type="text" placeholder="テキスト入力" style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; width: 100%;" />
          </div>
          <div style="padding: 1.5rem; background: #fff0f0; border-radius: 8px;">
            <h3>カード 3</h3>
            <p>アノテーションはマークダウン形式でコピーできます。</p>
            <a href="#" style="color: #3c82f7;">リンクの例</a>
          </div>
        </div>
      </div>

      <agentation
        (annotationAdd)="onAnnotationAdd($event)"
        (copyOutput)="onCopy($event)"
      />
    </div>
  `,
})
export class AppComponent {
  onAnnotationAdd(annotation: unknown): void {
    console.log('アノテーション追加:', annotation);
  }

  onCopy(output: string): void {
    console.log('コピー出力:', output);
  }
}
