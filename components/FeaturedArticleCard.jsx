import Image from "next/legacy/image"
import Link from "next/link"
import { path } from "../lib/helpers"
import { sanityLoader } from "../lib/imageLoader"
import ArticleDateLine from "./ArticleDateLine"

export default function FeaturedArticleCard({ article }) {
    const { image, title, publishedAt, theme, type, slug } = article

    return (
        <Link
            href={path(slug.current)}
            className="container mx-auto mt-40 transition-all duration-300 site-grid mb-28 hover:opacity-80">
            <div className="mb-5 bg-green-light image-container col-span-full lg:col-span-6 lg:mb-0">
                {image?.asset && (
                    <Image
                        alt={title}
                        className="block w-full"
                        layout="responsive"
                        loader={sanityLoader()}
                        width={800}
                        height={
                            800 *
                            (image.asset.metadata.dimensions.height /
                                image.asset.metadata.dimensions.width)
                        }
                        src={image.asset._id}
                    />
                )}
            </div>
            <div className="flex flex-col items-center justify-center text-center col-span-full lg:col-span-6">
                <ArticleDateLine
                    publishedAt={publishedAt}
                    type={type}
                    theme={theme}
                />
                <h2 className="text-3xl lg:text-[40px] leading-[1] mt-6 font-display lg:max-w-[25ch]">
                    {title}
                </h2>
            </div>
        </Link>
    )
}
