import { getTermsForEntries, type ContentEntry, type InferCollectionData } from "emdash";

export type PostEntry = ContentEntry<InferCollectionData<"posts">>;
export type TermLink = { slug: string; label: string };

/** 記事ごとの最初のカテゴリーを1回のクエリでまとめて取る */
export async function getPrimaryCategories(posts: PostEntry[]): Promise<Map<string, TermLink>> {
	const result = new Map<string, TermLink>();
	if (posts.length === 0) return result;
	const byEntry = await getTermsForEntries(
		"posts",
		posts.map((post) => post.data.id),
		"category",
	);
	for (const post of posts) {
		const term = byEntry.get(post.data.id)?.[0];
		if (term) result.set(post.data.id, { slug: term.slug, label: term.label });
	}
	return result;
}
