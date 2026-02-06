import { useCallback } from "react"
import usePagination from "../lib/usePagination"
import InViewTrigger from "./InViewTrigger"
import LoadingIndicator from "./LoadingIndicator"
import PageHero from "./PageHero"
import PodcastListItem from "./PodcastListItem"

export default function PodcastList({ episodes = [], title, signal }) {
    const onFetch = useCallback(async ({ currentPage, perPage }) => {
        const request = await fetch(
            `/api/content/episodes?page=${currentPage}&size=${perPage}`,
            { signal },
        )
        const results = await request.json()

        return results
    }, [])

    const { fetchNext, data, fetching } = usePagination({
        onFetch,
        startingData: episodes,
    })

    return (
        <div className="mb-10 lg:mb-20">
            {title && <PageHero addPadding title={title} />}
            <div className="episode-list space-y-[24px]">
                {data.map((episode) => (
                    <PodcastListItem episode={episode} key={episode.title} />
                ))}
            </div>
            {fetching && <LoadingIndicator />}
            <InViewTrigger offset={200} onEnter={fetchNext} />
        </div>
    )
}
