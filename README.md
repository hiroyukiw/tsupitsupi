# ツピツピ（tsupitsupi）

EmDash 用のブログテーマです。AI ツールを使って発信する収益ブロガー向けに作っています。

- 公式サイト: https://tsupitsupi.com （準備中）
- ライセンス: MIT（無料コア）
- 動作環境: EmDash 1.x / Astro / Cloudflare Workers（無料プランで動作）

## かんたん導入（Claude Code におまかせ）

ツピツピは「Claude Code などの AI に導入を任せる」ことを前提にしています。
[docs/ai-setup.md](docs/ai-setup.md) のプロンプトを Claude Code に貼り付けるだけで、
インストールから Cloudflare への公開まで進められます。

## 手動で始める場合

```bash
pnpm install
pnpm dev         # http://localhost:4321
```

初回に管理画面を開くとセットアップ画面が出ます。そこで `seed/seed.json` のデモ記事・メニューを入れられます。

管理画面は `http://localhost:4321/_emdash/admin` です。

Cloudflare へ公開するときは `pnpm wrangler login` のあと `pnpm run deploy` を実行します。初回の公開で `wrangler.jsonc` に書かれた名前の D1（データベース）と R2（画像保存）が作られます。R2 の利用には Cloudflare にカード登録が必要です。

## 無料コアに入っているもの

- トップ（注目記事＋新着一覧）、記事一覧、記事詳細、カテゴリー・タグ一覧、検索、固定ページ、RSS
- 目次、読了時間、著者表示、サイドバーウィジェット
- SEO メタ情報・構造化データ（JSON-LD）
- ダーク／ライトモード

今後、関連記事・人気記事などを順次追加します。
吹き出し・ボックス・ランキング・比較表・広告枠などの収益化ブロックは、有料の Pro 拡張として提供予定です。

## フォルダ構成

```
src/
  components/
    core/     どの用途でも使う共通部品（ページ送りなど）
    blog/     ブログ固有の部品（記事カード、著者表示など）
  layouts/    全ページ共通のレイアウト
  pages/      各ページ
  styles/     デザイントークン（tokens.css）とテーマ（theme.css）
seed/seed.json  コンテンツの型・メニュー・初期データ
docs/           導入手順・AI 向け資料
```

将来コーポレートなど別の用途を足すときは、`core` を共有し、用途ごとの部品とスタイルを追加する形で広げます。

## クレジット

[EmDash 公式ブログテンプレート](https://github.com/emdash-cms/templates)（MIT）をもとにしています。
