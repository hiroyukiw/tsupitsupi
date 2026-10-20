/**
 * ツピツピの記事用ブロック（ボックス・吹き出し・ランキング・比較表）。
 *
 * 本文（Portable Text）のエディターで「/」を押すと候補に出る。表示は
 * components.ts の Astro 部品が担当する。テーマに組み込む信頼済みの
 * プラグインなので、Workers の無料プランでそのまま動く。
 */
import { definePlugin } from "emdash";
import type { PluginDescriptor, ResolvedPlugin } from "emdash";

const id = "tsupitsupi-blocks";
const version = "0.1.0";

export function tsupitsupiBlocks(): PluginDescriptor {
	return {
		id,
		version,
		// Vite がプロジェクトのルートから解決するパス
		entrypoint: "/src/plugins/tsupitsupi-blocks/index.ts",
		componentsEntry: "/src/plugins/tsupitsupi-blocks/components.ts",
		options: {},
	};
}

export function createPlugin(): ResolvedPlugin {
	return definePlugin({
		id,
		version,
		admin: {
			portableTextBlocks: [
				{
					type: "tsupitsupi-box",
					label: "ボックス",
					description: "ポイントや注意を枠で囲んで目立たせる",
					fields: [
						{
							type: "select",
							action_id: "style",
							label: "種類",
							options: [
								{ label: "ポイント", value: "point" },
								{ label: "注意", value: "caution" },
								{ label: "警告", value: "warning" },
								{ label: "メモ", value: "memo" },
								{ label: "良い点", value: "good" },
								{ label: "悪い点", value: "bad" },
							],
						},
						{ type: "text_input", action_id: "title", label: "見出し（空なら種類の名前）" },
						{ type: "text_input", action_id: "text", label: "本文", multiline: true },
					],
				},
				{
					type: "tsupitsupi-balloon",
					label: "吹き出し",
					description: "アイコン付きの会話で見せる",
					fields: [
						{ type: "text_input", action_id: "name", label: "名前" },
						{ type: "media_picker", action_id: "icon", label: "アイコン画像", mime_type_filter: "image/" },
						{
							type: "select",
							action_id: "position",
							label: "アイコンの位置",
							options: [
								{ label: "左", value: "left" },
								{ label: "右", value: "right" },
							],
						},
						{ type: "text_input", action_id: "text", label: "セリフ", multiline: true },
					],
				},
				{
					type: "tsupitsupi-ranking",
					label: "ランキング",
					description: "順位・画像・評価・購入ボタン付きで商品を紹介する（1位ずつ入れて並べる）",
					fields: [
						{ type: "number_input", action_id: "rank", label: "順位", min: 1, max: 99 },
						{ type: "text_input", action_id: "name", label: "商品名" },
						{ type: "media_picker", action_id: "image", label: "画像", mime_type_filter: "image/" },
						{
							type: "select",
							action_id: "rating",
							label: "評価",
							options: [
								{ label: "なし", value: "" },
								{ label: "★5.0", value: "5" },
								{ label: "★4.5", value: "4.5" },
								{ label: "★4.0", value: "4" },
								{ label: "★3.5", value: "3.5" },
								{ label: "★3.0", value: "3" },
								{ label: "★2.5", value: "2.5" },
								{ label: "★2.0", value: "2" },
								{ label: "★1.5", value: "1.5" },
								{ label: "★1.0", value: "1" },
							],
						},
						{ type: "text_input", action_id: "text", label: "説明", multiline: true },
						{ type: "text_input", action_id: "button_label", label: "ボタンの文字（例：公式サイトを見る）" },
						{ type: "text_input", action_id: "button_url", label: "ボタンのリンク先（アフィリエイトリンクも可）", placeholder: "https://..." },
					],
				},
				{
					type: "tsupitsupi-compare",
					label: "比較表",
					description: "商品やサービスを ◎○△× や価格で並べて比べる",
					fields: [
						{ type: "text_input", action_id: "title", label: "表の見出し（任意）" },
						{ type: "text_input", action_id: "name1", label: "1列目の名前" },
						{ type: "text_input", action_id: "name2", label: "2列目の名前" },
						{ type: "text_input", action_id: "name3", label: "3列目の名前（任意）" },
						{ type: "text_input", action_id: "name4", label: "4列目の名前（任意）" },
						{
							type: "select",
							action_id: "highlight",
							label: "おすすめの列",
							options: [
								{ label: "なし", value: "0" },
								{ label: "1列目", value: "1" },
								{ label: "2列目", value: "2" },
								{ label: "3列目", value: "3" },
								{ label: "4列目", value: "4" },
							],
						},
						{
							type: "repeater",
							action_id: "rows",
							label: "比べる項目",
							item_label: "項目",
							min_items: 1,
							max_items: 20,
							fields: [
								{ type: "text_input", action_id: "label", label: "項目名（例: 価格）" },
								{ type: "text_input", action_id: "v1", label: "1列目" },
								{ type: "text_input", action_id: "v2", label: "2列目" },
								{ type: "text_input", action_id: "v3", label: "3列目" },
								{ type: "text_input", action_id: "v4", label: "4列目" },
							],
						},
						{ type: "text_input", action_id: "note", label: "表の下の注記（任意）" },
					],
				},
			],
		},
	});
}

export default createPlugin;
