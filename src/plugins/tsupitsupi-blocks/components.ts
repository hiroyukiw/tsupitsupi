import ArticleAd from "../../components/blog/ArticleAd.astro";
import ArticleBalloon from "../../components/blog/ArticleBalloon.astro";
import ArticleBox from "../../components/blog/ArticleBox.astro";
import ArticleButton from "../../components/blog/ArticleButton.astro";
import ArticleRanking from "../../components/blog/ArticleRanking.astro";
import ArticleCompare from "../../components/blog/ArticleCompare.astro";

// EmDash が本文の <PortableText> に自動で組み込む（この名前で export する決まり）
export const blockComponents = {
	"tsupitsupi-box": ArticleBox,
	"tsupitsupi-balloon": ArticleBalloon,
	"tsupitsupi-ranking": ArticleRanking,
	"tsupitsupi-compare": ArticleCompare,
	"tsupitsupi-button": ArticleButton,
	"tsupitsupi-ad": ArticleAd,
};
