/** ブロック部品に共通で渡す props */
export interface BlockProps {
	value: Record<string, unknown>;
	/** full: 画面幅いっぱい / main: メインカラムの中 */
	area: "full" | "main";
	/** ページ内の最初のブロックか（画像を優先読み込みする） */
	first?: boolean;
}

export function str(value: unknown): string {
	return typeof value === "string" ? value.trim() : "";
}

export function num(value: unknown, fallback: number): number {
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : fallback;
}

/** 画像フィールドが値を持っているか */
export function hasImage(value: unknown): value is { id: string; src?: string } {
	return !!value && typeof value === "object" && ("id" in value || "src" in value);
}
