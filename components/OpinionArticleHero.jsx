import gsap from "gsap"
import { useCallback, useEffect, useRef } from "react"
import ArticleDateLine from "./ArticleDateLine"
import ArticleNumberCounter from "./ArticleNumberCounter"
import ArticleTitle from "./ArticleTitle"
import ShortNameImage from "./ShortNameImage"

export default function StandardArticleHero({
    title,
    subtitle,
    publishedAt,
    author,
    theme,
    type,
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
        <div className="theme-green-dark">
            <div className="main-area bg-current-theme flex items-center py-40 lg:pt-60 justify-center lg:h-screen">
                <div className="absolute top-0 left-0 w-full h-full diagonal-bg mix-blend-overlay opacity-50" />
                <ArticleNumberCounter
                    target={new Date(publishedAt).getDate()}
                    onComplete={onAnimationComplete}
                />
                <div
                    className="mx-auto text-center container relative z-10"
                    ref={contentRef}>
                    <ArticleDateLine
                        publishedAt={publishedAt}
                        type={type}
                        theme={theme}
                        linkTheme
                    />
                    <ArticleTitle
                        prefix={
                            <>
                                <ShortNameImage
                                    className="text-white"
                                    person={author}
                                />{" "}
                            </>
                        }>
                        {title}
                    </ArticleTitle>
                </div>
            </div>
            <div className="author-row text-center font-serif">
                <h4 className="mt-16 text-xs">Af {author?.name}</h4>
                <p className=" opacity-50 text-xs">
                    Dette er et debatindlæg. Indlægget er udtryk for skribentens
                    holdning.{" "}
                </p>

                <h2 className=" text-lg font-serif max-w-[65ch] mx-auto mt-11">
                    {subtitle}
                </h2>
            </div>
        </div>
    )
}
