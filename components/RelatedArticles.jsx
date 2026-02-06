import ArticleListItem from "./ArticleListItem"
import BannerTitle from "./BannerTItle"
import PodcastListItem from "./PodcastListItem"

export default function RelatedArticles({ articles }) {
    return (
        <div className="">
            <div className="module-wrapper">
                <BannerTitle title="Relateret indhold" />
                {articles.map((article) => {
                    if (article.type == "standard")
                        return (
                            <ArticleListItem
                                article={article}
                                key={article._id}
                            />
                        )
                    if (article.type == "podcast")
                        return (
                            <PodcastListItem
                                className="mb-8"
                                episode={article}
                                key={article._id}
                            />
                        )

                    return null
                })}
            </div>
        </div>
    )
}
