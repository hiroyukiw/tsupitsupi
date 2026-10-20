/** 記事用ブロックの表示コンポーネント。<PortableText> に自動で組み込まれる */
import Box from "./Box.astro";
import Talk from "./Talk.astro";

export const blockComponents = {
	"tsupitsupi-box": Box,
	"tsupitsupi-talk": Talk,
};
