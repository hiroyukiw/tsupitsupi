import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig, envField, fontProviders } from "astro/config";
import emdash from "emdash/astro";
import { tsupitsupiBlocks } from "./src/plugins/tsupitsupi-blocks/index.ts";

export default defineConfig({
	output: "server",
	// サイトの言語。日付の書式や <html lang> に使われる
	i18n: {
		defaultLocale: "ja",
		locales: ["ja"],
	},
	adapter: cloudflare(),
	env: {
		schema: {
			// Cloudflare Web Analytics のトークン。wrangler.jsonc の vars に入れると計測タグが入る
			CF_WEB_ANALYTICS_TOKEN: envField.string({ context: "server", access: "public", optional: true }),
		},
	},
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto", coalesce: true }),
			storage: r2({ binding: "MEDIA" }),
			// 記事用ブロック（ボックス・吹き出し）。本文エディターの「/」から使える
			plugins: [tsupitsupiBlocks()],
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Noto Sans JP",
			cssVariable: "--font-body",
			weights: [400, 500, 700, 900],
			fallbacks: ["Hiragino Sans", "Yu Gothic", "sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
	],
	devToolbar: { enabled: false },
});
