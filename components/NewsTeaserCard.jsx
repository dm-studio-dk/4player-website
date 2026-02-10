import Image from "next/legacy/image"
import Link from "next/link"
import { useRef } from "react"
import { ARTICLE_TYPE_LABELS } from "../config/const"
import { classNames, formatArticleDate, path } from "../lib/helpers"
import { sanityLoader } from "../lib/imageLoader"
import useZoomHover from "../lib/useZoomHover"
import PodcastNumberGraphic from "./PodcastNumberGraphic"

export default function NewsTeaserCard({ article, className = "" }) {
    const imageRef = useRef()
    const { animationStart: onEnter, animationStop: onLeave } =
        useZoomHover(imageRef)
    const { title, publishedAt, image, slug, type, podcast } = article
    const isPodcast = type == "podcast"

    if (!slug) return null

    return (
        <Link
            href={path(slug?.current)}
            className={classNames(
                "flex flex-col transition-all duration-500 group",
                className,
            )}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}>
            <div
                className="relative w-full overflow-hidden image-container"
                style={{
                    aspectRatio:
                        isPodcast || !image?.asset
                            ? "1/1"
                            : `${image.asset.metadata.dimensions.aspectRatio}`,
                }}>
                {image?.asset && (
                    <div
                        className="absolute top-0 left-0 w-full h-full bg-green-light"
                        ref={imageRef}>
                        <Image
                            itemRef=""
                            alt={title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-all duration-500 ease-out group-hover:scale-110"
                            loader={sanityLoader()}
                            src={image.asset._id}
                        />
                    </div>
                )}
                {isPodcast ? (
                    <PodcastNumberGraphic podcast={podcast} />
                ) : (
                    image?.asset && (
                        <div
                            className="absolute top-0 left-0 w-full h-full bg-green-light"
                            ref={imageRef}>
                            <Image
                                itemRef=""
                                alt={title}
                                layout="fill"
                                objectFit="cover"
                                className="transition-all duration-500 ease-out group-hover:scale-110"
                                loader={sanityLoader()}
                                src={image.asset._id}
                            />
                        </div>
                    )
                )}
            </div>
            <div className="text-center content">
                <p className="w-full mt-5 text-xs text-center">
                    <span className="font-display">
                        {ARTICLE_TYPE_LABELS[type]}
                    </span>{" "}
                    —{" "}
                    <span className="font-serif">
                        {formatArticleDate(publishedAt)}
                    </span>
                </p>
                <h2 className="text-2xl font-display uppercase leading-[1] mt-3 font-bold max-w-2xl px-4 mx-auto">
                    {/* {isPodcast && podcast.number + ": "} */}
                    {title}
                </h2>
            </div>
        </Link>
    )
}
