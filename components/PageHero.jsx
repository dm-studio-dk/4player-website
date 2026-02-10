import classNames from "classnames"
import Image from "next/legacy/image"
import Link from "next/link"
import PortableText from "react-portable-text"
import { path } from "../lib/helpers"
import { sanityLoader } from "../lib/imageLoader"
import Hero from "./Hero"

export default function PageHero({
    title,
    subtitle,
    image,
    imageBackground,
    addPadding,
    fullHeight = true,
}) {
    return (
        <Hero
            className={classNames({
                "pt-40 lg:pt-56": !imageBackground,
                "pb-40": addPadding,
                "relative overflow-hidden": imageBackground,
            })}>
            <div
                className={classNames("mx-auto container", {
                    "text-white h-screen flex flex-col items-center justify-center relative z-10 py-10":
                        imageBackground,
                    "h-[90vh]": !fullHeight,
                })}>
                {imageBackground && <div className="flex-grow spacer" />}
                <h1 className="text-5xl leading-[1] font-bold font-display lg:text-[160px] mt-10 text-center mx-auto max-w-[15ch] flex items-center justify-center">
                    {title}
                </h1>
                {imageBackground && <div className="flex-grow spacer" />}
                {subtitle?.length && (
                    <div
                        className={classNames("site-grid font-serif", {
                            "mt-7 mb-24": !imageBackground,
                        })}>
                        {typeof subtitle == "string" ? (
                            <p>{subtitle}</p>
                        ) : (
                            <PortableText
                                className="mx-auto space-y-6 text-lg text-center lg:col-span-6 col-span-full lg:col-start-4"
                                content={subtitle}
                                serializers={{
                                    normal: (props) => (
                                        <p
                                            className="leading-[1.4] text-lg mx-auto max-w-[60ch]"
                                            {...props}
                                        />
                                    ),
                                    // Annotations
                                    link: ({ children, href }) => (
                                        <a
                                            href={href}
                                            className="underline"
                                            target="_blank">
                                            {children}
                                        </a>
                                    ),
                                    internalLink: ({ slug, children }) => (
                                        <Link
                                            href={path(slug.current)}
                                            className="underline">
                                            {children}
                                        </Link>
                                    ),
                                }}
                            />
                        )}
                    </div>
                )}
            </div>
            {image && (
                <div
                    className={classNames({
                        "absolute top-0 left-0 w-full h-full": imageBackground,
                        "px-5": !imageBackground,
                    })}>
                    <div
                        style={{
                            aspectRatio:
                                !imageBackground &&
                                `${image.asset.metadata.dimensions.aspectRatio}`,
                        }}
                        className={classNames("w-full relative dynamic-img", {
                            "absolute left-0 top-0 w-full h-full":
                                imageBackground,
                        })}>
                        <Image
                            alt={title}
                                                                className="transition-all duration-500 ease-out bg-green-light"                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            loader={sanityLoader()}
                            src={image.asset._id}
                        />
                    </div>
                </div>
            )}
        </Hero>
    )
}
