import ArticleListItem from "components/ArticleListItem"
import { Fragment } from "react"

export default function ModuleArticleList({ module }) {
    const { title, articles } = module

    return (
        <div className="module-wrapper">
            <div className="container mx-auto">
                <div className="title-section relative">
                    <h2 className="text-4xl lg:text-[56px] font-display text-center">
                        {title}
                    </h2>
                </div>
            </div>
            <div className="episode-container mt-12">
                {articles.map((article) => (
                    <Fragment key={article._id}>
                        <ArticleListItem article={article} />
                        <div className="container mx-auto">
                            <div className="module-divider"></div>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}
