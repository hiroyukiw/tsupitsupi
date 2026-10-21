/**
 * アフィリエイトリンクの扱い。
 *
 * 管理画面の「アフィリエイトリンク」（links コレクション）に登録したリンクは、
 * サイト内の /go/<スラッグ> から本当のリンク先へ転送する。記事にはこの短い
 * アドレスを書いておけば、リンク先を変えるときに一か所直すだけで済む。
 */

const SLUG = /^[a-z0-9][a-z0-9-]*$/i;

/** スラッグから、記事に書く転送用のアドレスを作る */
export function affiliatePath(slug: string): string | null {
	const value = slug.trim();
	return SLUG.test(value) ? `/go/${value}` : null;
}

/** ボタンのリンク先として使ってよいもの（http(s) の外部リンクか、サイト内の /go/ など）だけを通す */
export function safeHref(value: unknown): string | null {
	if (typeof value !== "string") return null;
	const href = value.trim();
	if (/^https?:\/\//i.test(href)) return href;
	if (href.startsWith("/") && !href.startsWith("//")) return href;
	return null;
}

/** 転送先として使ってよい外部リンクか */
export function isExternalUrl(value: unknown): value is string {
	return typeof value === "string" && /^https?:\/\/[^\s]+$/i.test(value.trim());
}
