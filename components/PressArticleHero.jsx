import gsap from "gsap"
import Image from "next/legacy/image"
import { useCallback, useEffect, useRef } from "react"
import { sanityLoader } from "../lib/imageLoader"
import ArticleDateLine from "./ArticleDateLine"
import ArticleNumberCounter from "./ArticleNumberCounter"
import ArticleTitle from "./ArticleTitle"

export default function PressArticleHero({
    title,
    subtitle,
    publishedAt,
    author,
    image,
    imageCaption,
    theme,
}) {
    const contentRef = useRef()
    const onAnimationComplete = useCallback(() => {
        gsap.to(contentRef.current, {
            y: 0,
            ease: "power3.inOut",
            duration: 1,
        })
        document.body.style.overflow = "auto"
    }, [])

    useEffect(() => {
        if (contentRef.current) {
            document.body.style.overflow = "hidden"
            gsap.set(contentRef.current, {
                y: window.innerHeight,
            })
        }
    }, [])

    return (
        <div>
            <ArticleNumberCounter
                target={new Date(publishedAt).getDate()}
                onComplete={onAnimationComplete}
            />
            <div
                className="pt-32 overflow-hidden main-area lg:pt-36"
                ref={contentRef}>
                <div className="container mx-auto text-center">
                    <ArticleDateLine
                        type="Presse"
                        theme={theme}
                        publishedAt={publishedAt}
                    />
                    <ArticleTitle>{title}</ArticleTitle>
                    <h2 className=" text-xl font-serif max-w-[65ch] mx-auto mt-20">
                        {subtitle}
                    </h2>
                </div>

                {image?.asset && (
                    <div className="relative w-full mt-20">
                        <div className="w-full site-grid">
                            <div
                                className="relative bg-green-light lg:col-span-8 lg:col-start-3 col-span-full"
                                style={{
                                    aspectRatio: `${image.asset.metadata.dimensions.aspectRatio}`,
                                }}>
                                <Image
                                    alt={title}
                                    layout="fill"
                                    objectFit="cover"
                                    loader={sanityLoader()}
                                    src={image.asset._id}
                                />
                            </div>
                        </div>
                        {imageCaption && (
                            <div className="mt-3 font-serif text-xs text-center opacity-50 credit">
                                {imageCaption}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="font-serif text-center opacity-50 author-row">
                <h4 className="text-xs mt-14">Af {author?.name}</h4>
            </div>
        </div>
    )
}
