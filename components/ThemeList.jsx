import ArticleListItem from "./ArticleListItem"
import PageHero from "./PageHero"
import PodcastListItem from "./PodcastListItem"

export default function ThemeList({ articles = [], title }) {
    return (
        <div>
            <PageHero title={title} addPadding />
            <div className="article-list">
                {articles.map((article) =>
                    article.type == "podcast" ? (
                        <PodcastListItem
                            className="my-3"
                            key={article.slug.current}
                            episode={article}
                        />
                    ) : (
                        <ArticleListItem
                            key={article.slug.current}
                            article={article}
                        />
                    ),
                )}
            </div>
        </div>
    )
}
