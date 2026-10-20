import ArticleBalloon from "../../components/blog/ArticleBalloon.astro";
import ArticleBox from "../../components/blog/ArticleBox.astro";
import ArticleRanking from "../../components/blog/ArticleRanking.astro";
import ArticleCompare from "../../components/blog/ArticleCompare.astro";

// EmDash が本文の <PortableText> に自動で組み込む（この名前で export する決まり）
export const blockComponents = {
	"tsupitsupi-box": ArticleBox,
	"tsupitsupi-balloon": ArticleBalloon,
	"tsupitsupi-ranking": ArticleRanking,
	"tsupitsupi-compare": ArticleCompare,
};
