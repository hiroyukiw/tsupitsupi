/**
 * ツピツピの記事用ブロック
 *
 * 記事の本文（Portable Text）に「/」で差し込めるブロックを追加する、テーマ同梱の信頼済みプラグイン。
 * サンドボックスを使わないので、Cloudflare Workers の無料プランで動く。
 * 表示用のコンポーネントは ./astro から自動で読み込まれる。
 */

import type { PluginDescriptor, ResolvedPlugin } from "emdash";
import { definePlugin } from "emdash";

const PLUGIN_ID = "tsupitsupi-blocks";
const VERSION = "0.1.0";

export function tsupitsupiBlocks(): PluginDescriptor {
	return {
		id: PLUGIN_ID,
		version: VERSION,
		entrypoint: "@tsupitsupi/blocks",
		componentsEntry: "@tsupitsupi/blocks/astro",
		options: {},
	};
}

export function createPlugin(): ResolvedPlugin {
	return definePlugin({
		id: PLUGIN_ID,
		version: VERSION,
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
								{ label: "ヒント", value: "tip" },
								{ label: "注意", value: "warning" },
								{ label: "メモ", value: "memo" },
							],
						},
						{ type: "text_input", action_id: "title", label: "見出し（任意）" },
						{ type: "text_input", action_id: "text", label: "本文", multiline: true },
					],
				},
				{
					type: "tsupitsupi-talk",
					label: "吹き出し",
					description: "アイコン付きの会話で見せる",
					fields: [
						{ type: "media_picker", action_id: "icon", label: "アイコン画像" },
						{ type: "text_input", action_id: "name", label: "名前" },
						{
							type: "select",
							action_id: "side",
							label: "向き",
							options: [
								{ label: "左（アイコンが左）", value: "left" },
								{ label: "右（アイコンが右）", value: "right" },
							],
						},
						{ type: "text_input", action_id: "text", label: "セリフ", multiline: true },
					],
				},
			],
		},
	});
}

export default createPlugin;
