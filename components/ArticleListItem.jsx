import Image from "next/legacy/image"
import Link from "next/link"
import { classNames, path } from "../lib/helpers"
import { sanityLoader } from "../lib/imageLoader"
import ArticleDateLine from "./ArticleDateLine"

export default function ArticleListItem({ article, className }) {
    const { title, image, slug, theme, publishedAt, type } = article

    return (
        <Link
            href={path(slug.current)}
            className={classNames(
                "transition-all duration-500 items-center jutify-center container mx-auto block group",
                className,
            )}>
            <div className="relative py-10 border-t site-grid border-black-full border-opacity-10">
                <div className="image-container lg:pr-10 col-span-full lg:col-span-3">
                    <div className="relative flex items-center justify-center aspect-thumbnail bg-green-dusty">
                        {image?.asset && (
                            <Image
                                alt={title}
                                layout="fill"
                                objectFit="cover"
                                className="transition-all duration-500 ease-out group-hover:scale-110"
                                loader={sanityLoader(image)}
                                src={image.asset._id}
                            />
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center pt-4 meta col-span-full lg:col-span-6 lg:pt-0">
                    <ArticleDateLine
                        type={type}
                        publishedAt={publishedAt}
                        theme={theme}
                    />
                    <h3 className="font-display text-2xl lg:text-4xl self-start text-center mx-auto mt-3 leading-[1.2]">
                        <span className="inline-block max-w-[32ch] px-4">
                            {title}
                        </span>
                    </h3>
                </div>
                <div className="items-center self-start justify-start hidden h-full icon-container lg:flex lg:col-start-12">
                    <img
                        src="/assets/icons/arrow_right.svg"
                        alt=""
                        className="block w-8 h-8 transition-all duration-500 ease-out group-hover:translate-x-1/2"
                    />
                </div>
            </div>
        </Link>
    )
}
