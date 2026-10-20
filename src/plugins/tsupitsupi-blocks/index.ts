/**
 * ツピツピの記事用ブロック（ボックス・吹き出し）。
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
			],
		},
	});
}

export default createPlugin;
