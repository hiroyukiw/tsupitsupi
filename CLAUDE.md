# ツピツピ テーマ開発ガイド（AI 向け）

このリポジトリは EmDash 用ブログテーマ「ツピツピ（tsupitsupi）」の本体です。
EmDash の基本ルール・コマンド・スキルは @AGENTS.md を参照してください。ここではツピツピ固有の約束事だけを書きます。

## 前提

- ターゲットは AI ツールを使って発信する日本語の収益ブロガー。表示・管理画面の文言・デモ記事は日本語が基本。
- テーマは一本だけ。業種別の見た目（コーポレート、クリニックなど）は「新テーマ」ではなく、スタイルと拡張で足す。
- このリポジトリは MIT で、テーマの機能は **全部無料** で提供する（有料版・Pro 拡張は作らない）。収益化ブロック（吹き出し、ボックス、ランキング、比較表、広告枠、アフィリエイトリンク管理）や追加スタイルもこのリポジトリに入れる。有料なのは導入・移行などの代行サービスだけ。
- Cloudflare Workers の **無料プランで動くこと** を守る。`wrangler.jsonc` の `worker_loaders`（サンドボックス型プラグイン用、有料プラン必須）は有効にしない。機能追加はテーマ内のブロック定義（`seed.json` の blockTypes）か、`astro.config.mjs` に組み込む信頼済みプラグインで行う。
- 名前やドメインに「EmDash」を含めない（商標配慮）。説明文で「EmDash 用」と書くのは可。

## 構成のルール

| 場所 | 置くもの |
| --- | --- |
| `src/components/core/` | 用途を問わず使う部品（ヘッダー、フッター、スマホメニュー、2カラム枠、パンくず、ページ送り、固定ページ表示）。ブログ固有の前提（posts コレクション、著者など）に依存させない |
| `src/components/blog/` | ブログ固有の部品（記事カード、目次、シェアボタン、記事一覧ブロックなど） |
| `src/components/blocks/` | 固定ページのブロック（メインビジュアル、強み・バナー、CTA、自由入力）と、それを並べる `BlockList` |
| `src/plugins/tsupitsupi-blocks/` | 記事本文（Portable Text）に入れるブロックの定義。テーマ組み込みの信頼済みプラグインとして `astro.config.mjs` で読み込む。表示は `src/components/blog/Article*.astro` |
| `src/components/widgets/` | ウィジェットエリアの描画。標準ウィジェットとテーマ独自ウィジェット（`tsupitsupi:popular-posts`） |
| `src/styles/tokens.css` | デザイントークンの既定値（`@layer base`）。見た目の変更では編集しない |
| `src/styles/site.css` | 全ページ共通の土台と部品（`.container` `.btn` `.chip` `.layout` `.widget` など） |
| `src/styles/forms.css` | EmDash 公式のフォームプラグイン（`.ec-form`）をテーマの見た目に合わせるスタイル |
| `src/styles/theme.css` | ツピツピとしてのトークン上書き（配色など）。色や数値はトークン経由で使う |
| `src/utils/` | 表示ロジックの小さな関数（読了時間、日付書式、レイアウト値の正規化など） |

## ページの組み立て

- トップページは固定ページ「home」（スラッグ `home`）を表示する。`pages` コレクションの `top_blocks`（全幅）→ メイン（`main_blocks`、2カラムならサイドバー付き）→ `bottom_blocks`（全幅）の順。`src/components/core/PageView.astro`
- ブロックの種類は `seed/seed.json` の `blockTypes`（hero / features / post_list / cta / rich_text）。追加するときは seed と `BlockList.astro` の両方に足す
- 記事本文のブロック（ボックス `tsupitsupi-box`、吹き出し `tsupitsupi-balloon`、ランキング `tsupitsupi-ranking`）は `src/plugins/tsupitsupi-blocks/index.ts` の `portableTextBlocks` で定義し、表示部品を `components.ts` の `blockComponents` に登録する。収益化ブロック（比較表など）もここに足す
- レイアウトの選択肢は管理画面の表示名がそのまま値になるため日本語（`2カラム` `1カラム` `フルワイド`）。値の扱いは `src/utils/layout.ts` に集める
- メニュー: `primary`（PC ナビ、子メニューはドロップダウン）、`mobile`（スマホのサイドメニュー。空なら primary）、`cta`（目立つボタン）、`mobile-bar`（スマホ下部、4つまで）、`footer`
- ウィジェットエリア: `sidebar`、`main-top` / `main-bottom`（メインの上下・全幅）、`home-after-posts`、`post-bottom`、`drawer`（スマホメニュー内）、`footer`
- 「人気の投稿」は閲覧数ではなくタグ `popular` が付いた記事を出す（EmDash に閲覧数の集計がないため）。独自ウィジェットは管理画面の追加候補に出ないので、seed で配置している

- 新しい部品を作るときは、まず core か blog かを判断する。迷ったら blog に置き、別用途でも必要になった時点で core に昇格させる。
- 将来のスタイル（例: コーポレート、クリニック）は、`theme.css` 相当のトークン上書きと用途別コンポーネントで実現する。ページ構造を複製しない。

## 日本語まわり

- `astro.config.mjs` で `i18n.defaultLocale` は `ja`。日付表示は `src/utils/locale.ts` を通す。
- 本文フォントは Noto Sans JP（`--font-body`）、ラベル・コードは JetBrains Mono（`--font-mono`）。
- 読了時間は日本語を1分500文字で計算する（`src/utils/reading-time.ts`）。
- 画面の文言（ボタン、見出し、aria-label、EmDash 部品の labels）は日本語で書く。

## バージョン

- 「メジャー.マイナー.パッチ」で管理する。機能の追加はマイナー、修正はパッチを上げる
- 変更を main に入れたら、`CHANGELOG.md` に日本語で追記し、`package.json` の `version` を上げる。公開する版には `v1.1.0` の形でタグを付ける
- 公式サイトでは、マイナー以上の版ごとに「ver.1.1 公開」のような更新記事を書く

## 作業の確認

```bash
pnpm install
pnpm build        # 変更後は必ずビルドが通ることを確認
pnpm typecheck
```

API や設定項目に自信がないときは、`.mcp.json` の EmDash ドキュメント MCP（`search_docs`）で最新仕様を確認してから書く。
