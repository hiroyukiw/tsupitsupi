import type { PortableTextBlock } from "emdash";
import { extractText } from "./reading-time";

const DESCRIPTION_LENGTH = 120;
const WHITESPACE_RUN_REGEX = /\s+/g;

/**
 * 抜粋や SEO 欄が空のときに使う description を本文の先頭から作る
 */
export function descriptionFromContent(
	content: PortableTextBlock[] | undefined,
): string | undefined {
	const text = extractText(content).replace(WHITESPACE_RUN_REGEX, " ").trim();
	if (!text) return undefined;
	return text.length > DESCRIPTION_LENGTH ? `${text.slice(0, DESCRIPTION_LENGTH)}…` : text;
}
