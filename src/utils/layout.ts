/**
 * レイアウトの選択肢。管理画面の選択肢がそのまま値になるため日本語。
 * seed/seed.json の posts.layout / pages.page_layout と揃えること。
 */
export type ColumnLayout = "2カラム" | "1カラム";
export type PageLayout = ColumnLayout | "フルワイド";

const COLUMN_LAYOUTS: readonly string[] = ["2カラム", "1カラム"];
const PAGE_LAYOUTS: readonly string[] = ["2カラム", "1カラム", "フルワイド"];

/** 未設定や不明な値は 2カラム として扱う */
export function normalizeLayout(value: unknown): ColumnLayout {
	return typeof value === "string" && COLUMN_LAYOUTS.includes(value)
		? (value as ColumnLayout)
		: "2カラム";
}

export function normalizePageLayout(value: unknown): PageLayout {
	return typeof value === "string" && PAGE_LAYOUTS.includes(value)
		? (value as PageLayout)
		: "2カラム";
}
