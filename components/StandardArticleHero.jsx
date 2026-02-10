import { motion } from "framer-motion"
import gsap from "gsap"
import { classNames } from "lib/helpers"
import { useScreen } from "lib/useMedia"
import useScrollOffset from "lib/useScrollOffset"
import Image from "next/legacy/image"
import { useCallback, useEffect, useRef } from "react"
import { sanityLoader } from "../lib/imageLoader"
import ArticleDateLine from "./ArticleDateLine"
import ArticleNumberCounter from "./ArticleNumberCounter"
import ArticleTitle from "./ArticleTitle"
import LinesVertical from "./LinesVertical"

export default function StandardArticleHero({
    title,
    subtitle,
    publishedAt,
    author,
    image,
    imageCaption,
    theme,
    type,
}) {
    const contentRef = useRef()
    const offsetRef = useRef()
    const { yOffset } = useScrollOffset({
        target: offsetRef,
        offset: ["start start", "center start"],
    })
    const { isMobile } = useScreen()
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
        <div className="theme-green-dusty">
            <div
                ref={offsetRef}
                className="relative flex items-center justify-center pt-32 pb-16 main-area bg-current-theme lg:pt-36"
                style={{ minHeight: "100vh" }}>
                <LinesVertical useTheme />
                <ArticleNumberCounter
                    target={new Date(publishedAt).getDate()}
                    onComplete={onAnimationComplete}
                />
                <div
                    className="container relative z-10 mx-auto text-center"
                    ref={contentRef}>
                    <ArticleDateLine
                        linkTheme
                        theme={theme}
                        publishedAt={publishedAt}
                        type={type}
                        style={{ y: isMobile ? 0 : yOffset }}
                    />
                    <ArticleTitle
                        className={classNames(
                            "mb-3",
                            image?.asset && "lg:-mb-16",
                        )}>
                        <motion.span
                            className="block"
                            style={{ y: isMobile ? 0 : yOffset }}>
                            {title}
                        </motion.span>
                    </ArticleTitle>
                    {image?.asset && (
                        <div className="relative w-full">
                            <div className="w-full site-grid">
                                <motion.div
                                    className="relative bg-green-light lg:col-span-6 lg:col-start-4 col-span-full"
                                    style={{
                                        aspectRatio: `${image.asset.metadata.dimensions.aspectRatio}`,
                                    }}>
                                    <Image
                                        layout="fill"
                                        objectFit="cover"
                                        loader={sanityLoader()}
                                        src={image.asset._id}
                                    />
                                </motion.div>
                            </div>
                            {imageCaption && (
                                <div className="mt-3 font-serif text-xs text-center opacity-50 credit">
                                    {imageCaption}
                                </div>
                            )}
                        </div>
                    )}
                    <h2
                        className={classNames(
                            "text-xl font-serif max-w-[65ch] mx-auto mt-10 text-black-almost leading-[1.3]",
                        )}>
                        {subtitle}
                    </h2>
                </div>
            </div>
            <div className="font-serif text-center opacity-50 author-row">
                <h4 className="mt-16 text-xs">Af {author?.name}</h4>
            </div>
        </div>
    )
}
