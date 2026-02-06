import ContactPersonCard from "components/ContactPersonCard"
import { ARTICLE_COLOR_THEMES } from "config/const"
import ArticleHero from "../ArticleHero"
import ArticleRenderer from "../ArticleRenderer"
import MoreArticles from "../MoreArticles"

export default function ArticleTemplate({ page, preview, children }) {
    const colorTheme = ARTICLE_COLOR_THEMES[page.type]

    return (
        <>
            <ArticleHero theme={colorTheme} article={page} />
            {children ||
                (page.body && (
                    <ArticleRenderer
                        theme={colorTheme}
                        body={page.body}
                        preview={preview}
                    />
                ))}
            {page.type == "pressrelease" && page.contact && (
                <div className="mt-10 lg:mt-16">
                    <ContactPersonCard person={page.contact} />
                </div>
            )}
            <MoreArticles
                articles={
                    page.relatedArticles?.length > 0
                        ? page.relatedArticles
                        : page.themeArticles?.length > 0
                          ? page.themeArticles
                          : page.latestArticles
                }
            />
        </>
    )
}
