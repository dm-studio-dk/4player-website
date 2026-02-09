import Link from "next/link"
import { classNames, path } from "../lib/helpers"
import ArticleDateLine from "./ArticleDateLine"

export default function PodcastListItem({ episode, className }) {
    const { title, podcast, slug, theme, publishedAt } = episode

    return (
        <Link
            href={path(slug?.current) || ""}
            className={classNames(
                "items-center jutify-center container mx-auto block group transition-all duration-500 ",
                className,
            )}>
            <div className="site-grid bg-yellow-base py-4 relative ">
                <div className="aspect-thumbnail col-span-full lg:col-span-3 flex items-center justify-center transition-all duration-500 ease-out">
                    <span className="font-display text-[154px] lg:pr-10">
                        {podcast.number}
                    </span>
                </div>
                <div className="meta flex flex-col items-center justify-center col-span-full lg:col-span-6">
                    <ArticleDateLine
                        type={"podcast"}
                        publishedAt={publishedAt}
                        theme={theme}
                    />
                    <h3 className="font-display text-2xl lg:text-4xl self-start text-center mx-auto mt-3 leading-[1.2]">
                        <span className="inline-block max-w-[32ch] px-4">
                            {title}
                        </span>
                    </h3>
                </div>
                <div className="icon-container hidden lg:flex justify-start items-center self-start h-full lg:col-span-1 lg:col-start-12">
                    <img
                        src="/assets/icons/play.svg"
                        className="w-auto h-10 block group-hover:translate-x-1/2 transition-all duration-500 ease-out"
                    />
                </div>
            </div>
        </Link>
    )
}
