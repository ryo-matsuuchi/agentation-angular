import { Component, signal, OnInit, OnDestroy } from '@angular/core';
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

      <!-- フリーズ検証セクション -->
      <div style="margin-top: 2rem;">
        <h2>フリーズ（一時停止）テスト</h2>
        <p style="color: #666; margin-bottom: 1rem;">
          ツールバーの一時停止ボタンを押すと、以下のアニメーションとタイマーが停止するか確認してください。
        </p>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
          <!-- CSSアニメーション: パルス -->
          <div style="padding: 1.5rem; background: #f0f4ff; border-radius: 8px; text-align: center;">
            <h4>CSS Pulse</h4>
            <div class="anim-pulse" style="width: 60px; height: 60px; background: #3c82f7; border-radius: 50%; margin: 1rem auto;"></div>
          </div>

          <!-- CSSアニメーション: スピン -->
          <div style="padding: 1.5rem; background: #fff0f0; border-radius: 8px; text-align: center;">
            <h4>CSS Spin</h4>
            <div class="anim-spin" style="width: 60px; height: 60px; border: 4px solid #eee; border-top-color: #ff3b30; border-radius: 50%; margin: 1rem auto;"></div>
          </div>

          <!-- CSSアニメーション: スライド -->
          <div style="padding: 1.5rem; background: #f0fff4; border-radius: 8px; text-align: center; overflow: hidden;">
            <h4>CSS Slide</h4>
            <div class="anim-slide" style="width: 40px; height: 40px; background: #34c759; border-radius: 8px; margin: 1rem 0;"></div>
          </div>

          <!-- CSSアニメーション: カラーシフト -->
          <div style="padding: 1.5rem; background: #f5f0ff; border-radius: 8px; text-align: center;">
            <h4>CSS Color</h4>
            <div class="anim-color" style="width: 60px; height: 60px; border-radius: 8px; margin: 1rem auto;"></div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
          <!-- setIntervalタイマー -->
          <div style="padding: 1.5rem; background: #fff8f0; border-radius: 8px; text-align: center;">
            <h4>setInterval カウンター</h4>
            <span style="font-size: 2em; font-weight: bold; color: #ff9500;">{{ timerCount() }}</span>
            <p style="color: #999; font-size: 0.85em; margin-top: 0.5rem;">1秒ごとに+1</p>
          </div>

          <!-- setTimeoutチェーン -->
          <div style="padding: 1.5rem; background: #f0f8ff; border-radius: 8px; text-align: center;">
            <h4>setTimeout チェーン</h4>
            <div style="display: flex; justify-content: center; gap: 8px; margin: 1rem 0;">
              <div class="anim-bounce" style="width: 16px; height: 16px; background: #007aff; border-radius: 50%;"></div>
              <div class="anim-bounce" style="width: 16px; height: 16px; background: #007aff; border-radius: 50%;"></div>
              <div class="anim-bounce" style="width: 16px; height: 16px; background: #007aff; border-radius: 50%;"></div>
            </div>
            <span style="font-size: 1.2em; font-weight: bold; color: #007aff;">{{ timeoutLabel() }}</span>
            <p style="color: #999; font-size: 0.85em; margin-top: 0.5rem;">500msごとに切り替え</p>
          </div>

          <!-- requestAnimationFrame -->
          <div style="padding: 1.5rem; background: #f5f0ff; border-radius: 8px; text-align: center;">
            <h4>requestAnimationFrame</h4>
            <div style="height: 60px; display: flex; align-items: center; justify-content: center;">
              <div
                style="width: 40px; height: 40px; background: #af52de; border-radius: 8px; transition: none;"
                [style.transform]="'rotate(' + rafAngle() + 'deg)'"
              ></div>
            </div>
            <p style="color: #999; font-size: 0.85em; margin-top: 0.5rem;">フレームごとに回転</p>
          </div>
        </div>
      </div>

      <!-- クリック伝播検証セクション -->
      <div style="margin-top: 2rem;">
        <h2>クリック伝播テスト</h2>
        <p style="color: #666; margin-bottom: 1rem;">
          ツールバー有効時にも以下の要素が操作可能か検証してください。
        </p>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
          <!-- ドロップダウン -->
          <div style="padding: 1.5rem; background: #f5f0ff; border-radius: 8px;">
            <h3>ドロップダウン</h3>
            <div style="position: relative;">
              <div
                (click)="dropdownOpen.set(!dropdownOpen())"
                style="padding: 0.5rem 1rem; background: white; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;"
              >
                {{ selectedItem() || '選択してください' }}
                <span>{{ dropdownOpen() ? '▲' : '▼' }}</span>
              </div>
              @if (dropdownOpen()) {
                <div style="position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ccc; border-radius: 4px; margin-top: 2px; z-index: 10; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                  @for (item of dropdownItems; track item) {
                    <div
                      (click)="selectItem(item)"
                      style="padding: 0.5rem 1rem; cursor: pointer; border-bottom: 1px solid #eee;"
                      (mouseenter)="$event.target && setHoverStyle($event.target)"
                      (mouseleave)="$event.target && clearHoverStyle($event.target)"
                    >
                      {{ item }}
                    </div>
                  }
                </div>
              }
            </div>
          </div>

          <!-- カウンター -->
          <div style="padding: 1.5rem; background: #fff8f0; border-radius: 8px;">
            <h3>カウンター</h3>
            <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem;">
              <div
                (click)="counter.set(counter() - 1)"
                style="width: 36px; height: 36px; background: #ff6b35; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.2em; user-select: none;"
              >
                −
              </div>
              <span style="font-size: 1.5em; font-weight: bold; min-width: 3ch; text-align: center;">
                {{ counter() }}
              </span>
              <div
                (click)="counter.set(counter() + 1)"
                style="width: 36px; height: 36px; background: #28a745; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.2em; user-select: none;"
              >
                +
              </div>
            </div>
          </div>

          <!-- アコーディオン -->
          <div style="padding: 1.5rem; background: #f0f8ff; border-radius: 8px;">
            <h3>アコーディオン</h3>
            @for (section of accordionSections; track section.title; let i = $index) {
              <div style="border: 1px solid #ddd; border-radius: 4px; margin-top: 0.5rem; overflow: hidden;">
                <div
                  (click)="toggleAccordion(i)"
                  style="padding: 0.5rem 1rem; background: white; cursor: pointer; display: flex; justify-content: space-between; align-items: center;"
                >
                  <span>{{ section.title }}</span>
                  <span>{{ accordionOpen()[i] ? '−' : '+' }}</span>
                </div>
                @if (accordionOpen()[i]) {
                  <div style="padding: 0.75rem 1rem; background: #fafafa; border-top: 1px solid #eee;">
                    {{ section.content }}
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <!-- タブ -->
        <div style="margin-top: 1.5rem; background: #f0fff8; border-radius: 8px; padding: 1.5rem;">
          <h3>タブ切り替え</h3>
          <div style="display: flex; border-bottom: 2px solid #eee; margin-top: 0.5rem;">
            @for (tab of tabs; track tab.id) {
              <div
                (click)="activeTab.set(tab.id)"
                style="padding: 0.5rem 1.5rem; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.2s;"
                [style.borderBottomColor]="activeTab() === tab.id ? '#3c82f7' : 'transparent'"
                [style.color]="activeTab() === tab.id ? '#3c82f7' : '#666'"
                [style.fontWeight]="activeTab() === tab.id ? 'bold' : 'normal'"
              >
                {{ tab.label }}
              </div>
            }
          </div>
          <div style="padding: 1rem 0;">
            @for (tab of tabs; track tab.id) {
              @if (activeTab() === tab.id) {
                <p>{{ tab.content }}</p>
              }
            }
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
export class AppComponent implements OnInit, OnDestroy {
  // フリーズ検証用タイマー
  readonly timerCount = signal(0);
  readonly timeoutLabel = signal('Tick');
  readonly rafAngle = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private rafId: number | null = null;

  ngOnInit(): void {
    // setIntervalカウンター
    this.intervalId = setInterval(() => {
      this.timerCount.update(v => v + 1);
    }, 1000);

    // setTimeoutチェーン
    const toggleLabel = (): void => {
      this.timeoutLabel.update(v => v === 'Tick' ? 'Tock' : 'Tick');
      this.timeoutId = setTimeout(toggleLabel, 500);
    };
    this.timeoutId = setTimeout(toggleLabel, 500);

    // requestAnimationFrameループ
    const animate = (): void => {
      this.rafAngle.update(v => (v + 1) % 360);
      this.rafId = requestAnimationFrame(animate);
    };
    this.rafId = requestAnimationFrame(animate);
  }

  ngOnDestroy(): void {
    if (this.intervalId !== null) clearInterval(this.intervalId);
    if (this.timeoutId !== null) clearTimeout(this.timeoutId);
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  // ドロップダウン
  readonly dropdownOpen = signal(false);
  readonly selectedItem = signal('');
  readonly dropdownItems = ['りんご', 'バナナ', 'みかん', 'ぶどう'];

  // カウンター
  readonly counter = signal(0);

  // アコーディオン
  readonly accordionSections = [
    { title: 'セクション A', content: 'セクションAの内容です。ここにテキストが入ります。' },
    { title: 'セクション B', content: 'セクションBの内容です。折りたたみが動作するか確認してください。' },
    { title: 'セクション C', content: 'セクションCの内容です。ツールバー有効時にも開閉できますか？' },
  ];
  readonly accordionOpen = signal<boolean[]>([false, false, false]);

  // タブ
  readonly tabs = [
    { id: 'tab1', label: 'タブ 1', content: 'タブ1のコンテンツです。クリックで切り替わるか検証してください。' },
    { id: 'tab2', label: 'タブ 2', content: 'タブ2のコンテンツです。ツールバー有効時にも切り替え可能ですか？' },
    { id: 'tab3', label: 'タブ 3', content: 'タブ3のコンテンツです。アノテーションと共存できていますか？' },
  ];
  readonly activeTab = signal('tab1');

  selectItem(item: string): void {
    this.selectedItem.set(item);
    this.dropdownOpen.set(false);
  }

  toggleAccordion(index: number): void {
    this.accordionOpen.update(arr => {
      const copy = [...arr];
      copy[index] = !copy[index];
      return copy;
    });
  }

  setHoverStyle(target: EventTarget): void {
    (target as HTMLElement).style.background = '#f0f0f0';
  }

  clearHoverStyle(target: EventTarget): void {
    (target as HTMLElement).style.background = '';
  }

  onAnnotationAdd(annotation: unknown): void {
    console.log('アノテーション追加:', annotation);
  }

  onCopy(output: string): void {
    console.log('コピー出力:', output);
  }
}
