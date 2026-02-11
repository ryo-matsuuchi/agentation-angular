# Agentation Angular

[![Angular](https://img.shields.io/badge/Angular-19+-dd0031)](https://angular.dev)

**Agentation Angular** は、AIコーディングエージェント向けのビジュアルフィードバックツール [Agentation](https://agentation.dev) の Angular 版です。

ページ上の要素をクリックしてアノテーションを追加し、構造化された出力をコピーすることで、AIエージェントが参照すべきコードを正確に特定できます。

## インストール

```bash
npm install @agentation/angular
```

## 使い方

```typescript
import { Component } from '@angular/core';
import { AgentationComponent } from '@agentation/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgentationComponent],
  template: `
    <app-your-content />
    <agentation />
  `,
})
export class AppComponent {}
```

ツールバーが右下に表示されます。クリックして有効化し、任意の要素をクリックしてアノテーションを追加できます。

## 機能

- **クリックでアノテーション** - 要素をクリックしてセレクター自動識別
- **テキスト選択** - テキストを選択して特定のコンテンツにアノテーション
- **アニメーション一時停止** - CSS/JS/動画のアニメーションをフリーズ
- **構造化出力** - セレクター・位置情報・コンテキスト付きのマークダウンをコピー
- **ダーク/ライトモード** - 手動切替対応
- **サーバー同期** - MCP サーバー経由でリアルタイム同期（SSE + 指数バックオフ再接続）
- **Angularコンポーネント検出** - 開発モードでコンポーネント階層を出力に含む

## API

### 入力プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `endpoint` | `string` | - | サーバーエンドポイントURL |
| `sessionId` | `string` | - | 既存セッションID |
| `copyToClipboard` | `boolean` | `true` | コピー時にクリップボードに書き込むか |
| `webhookUrl` | `string` | - | Webhook URL |

### 出力イベント

| イベント | 型 | 説明 |
|---------|-----|------|
| `annotationAdd` | `Annotation` | アノテーション追加時 |
| `annotationDelete` | `Annotation` | アノテーション削除時 |
| `annotationUpdate` | `Annotation` | アノテーション編集時 |
| `annotationsClear` | `Annotation[]` | 全クリア時 |
| `copyOutput` | `string` | コピーボタン押下時 |
| `sessionCreated` | `string` | セッション作成時 |

## 動作環境

- Angular 19+
- デスクトップブラウザ（モバイル非対応）

## 開発

```bash
pnpm install          # 依存関係インストール
ng build agentation   # ライブラリビルド
ng serve demo         # デモアプリ起動
```

## 謝辞

このプロジェクトは [Benji Taylor](https://github.com/benjitaylor) 氏による [Agentation](https://github.com/benjitaylor/agentation)（React版）をベースに、Angular ネイティブライブラリとして再実装したものです。オリジナルの優れた設計とアイデアに感謝します。

## ライセンス

オリジナルの Agentation は PolyForm Shield 1.0.0 ライセンスの下で公開されています。
