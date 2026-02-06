import { useCallback } from "react"
import usePagination from "../lib/usePagination"
import BannerTitle from "./BannerTItle"
import FeaturedArticleCard from "./FeaturedArticleCard"
import InViewTrigger from "./InViewTrigger"
import LoadingIndicator from "./LoadingIndicator"
import NewsTeaserCard from "./NewsTeaserCard"
import ThemeArticleSlider from "./ThemeArticleSlider"

export default function NewsGrid({ articles, featuredTheme }) {
    const firstArticle = articles[0]
    const filteredArticles = featuredTheme?.articles
        ? articles
        : articles.filter((a, i) => i !== 0)

    const onFetch = useCallback(async ({ currentPage, perPage, signal }) => {
        const request = await fetch(
            `/api/content/articles?page=${currentPage}&size=${perPage}`,
            { signal },
        )
        const results = await request.json()

        return results
    }, [])

    const { data, fetchNext, fetching } = usePagination({
        startingData: filteredArticles,
        onFetch,
    })

    return (
        <div className="mb-52">
            {featuredTheme?.articles ? (
                <ThemeArticleSlider theme={featuredTheme} />
            ) : (
                <FeaturedArticleCard article={firstArticle} />
            )}
            <BannerTitle title="Seneste nyt" />
            <div className="container mx-auto mt-20 site-grid gap-y-24">
                {data.map((article) => (
                    <NewsTeaserCard
                        className="col-span-full lg:col-span-4"
                        key={article._id}
                        article={article}
                    />
                ))}
                {fetching && <LoadingIndicator />}
                <InViewTrigger offset={200} onEnter={fetchNext} />
            </div>
        </div>
    )
}
