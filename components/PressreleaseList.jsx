import { useCallback } from "react"
import usePagination from "../lib/usePagination"
import ArticleListItem from "./ArticleListItem"
import InViewTrigger from "./InViewTrigger"
import LoadingIndicator from "./LoadingIndicator"
import PageHero from "./PageHero"

export default function PressreleaseList({
    pressreleases = [],
    title,
    signal,
}) {
    const onFetch = useCallback(async ({ currentPage, perPage }) => {
        const request = await fetch(
            `/api/content/pressreleases?page=${currentPage}&size=${perPage}`,
            { signal },
        )
        const results = await request.json()

        return results
    }, [])

    const { fetchNext, data, fetching } = usePagination({
        onFetch,
        startingData: pressreleases,
    })

    return (
        <div className="mb-10 lg:mb-20">
            {title && <PageHero addPadding title={title} />}
            <div className="episode-list space-y-[24px]">
                {data.map((article) => (
                    <ArticleListItem article={article} key={article.title} />
                ))}
            </div>
            {fetching && <LoadingIndicator />}
            <InViewTrigger offset={200} onEnter={fetchNext} />
        </div>
    )
}
