import { useEffect, useState } from "react"
import { urlFor } from "../lib/sanity"
import FeatureArticleHero from "./FeatureArticleHero"
import OpinionArticleHero from "./OpinionArticleHero"
import PodcastArticleHero from "./PodcastArticleHero"
import PressArticleHero from "./PressArticleHero"
import StandardArticleHero from "./StandardArticleHero"

export default function ArticleHero({ article }) {
    const { type, image } = article
    const [_imageUrl, setImageUrl] = useState(null)

    useEffect(() => {
        if (typeof window !== "undefined" && image?.asset?._ref) {
            setImageUrl(urlFor(image).width(window.innerWidth).url())
        }
    }, [])

    if (type == "podcast") return <PodcastArticleHero {...article} />
    if (type == "feature") return <FeatureArticleHero {...article} />
    if (type == "opinion") return <OpinionArticleHero {...article} />
    if (type == "pressrelease") return <PressArticleHero {...article} />

    return <StandardArticleHero {...article} />
}
