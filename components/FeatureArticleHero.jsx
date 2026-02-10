import gsap from "gsap"
import Image from "next/legacy/image"
import { useCallback, useEffect, useRef } from "react"
import { sanityLoader } from "../lib/imageLoader"
import ArticleDateLine from "./ArticleDateLine"
import ArticleNumberCounter from "./ArticleNumberCounter"
import ArticleTitle from "./ArticleTitle"

export default function FeatureArticleHero({
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
                y: window.innerHeight * 0.8,
            })
        }
    }, [])
    return (
        <div className="relative overflow-hidden">
            <div className="relative flex items-center justify-center min-h-screen pt-32 text-white main-area lg:py-20 lg:pt-40">
                {image?.asset && (
                    <div className="absolute top-0 left-0 w-full h-full image-container">
                        <div className="absolute bottom-0 w-full h-full -translate-x-1/2 bg-green-light left-1/2">
                            <Image
                                alt={title}
                                loader={sanityLoader()}
                                layout="fill"
                                objectFit="cover"
                                src={image.asset._id}
                            />
                            <div className="absolute top-0 left-0 w-full h-full overlay bg-black-full opacity-20"></div>
                        </div>
                    </div>
                )}
                <ArticleNumberCounter
                    target={new Date(publishedAt).getDate()}
                    onComplete={onAnimationComplete}
                />
                <div
                    className="container relative z-10 flex flex-col items-center justify-center h-full mx-auto text-center"
                    ref={contentRef}>
                    <ArticleDateLine
                        dark={false}
                        type="Feature"
                        theme={theme}
                        publishedAt={publishedAt}
                    />
                    <ArticleTitle>{title}</ArticleTitle>
                    <div className="flex-grow"></div>
                    <h2 className="text-xl font-serif max-w-[65ch] mx-auto mt-20">
                        {subtitle}
                    </h2>
                </div>
            </div>
            {imageCaption && (
                <div className="mt-3 font-serif text-xs text-center opacity-50 credit">
                    {imageCaption}
                </div>
            )}
            <div className="font-serif text-center opacity-50 author-row">
                <p className="mt-16">Af {author?.name}</p>
            </div>
        </div>
    )
}
