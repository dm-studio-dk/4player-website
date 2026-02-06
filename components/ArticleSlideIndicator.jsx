import gsap from "gsap"
import { useCallback, useEffect, useRef } from "react"
import useSlideIndicator from "../lib/useSlideIndicator"
import ArticleDateLine from "./ArticleDateLine"

export default function ArticleSlideIndicator({
    slide,
    onClick,
    onFinish,
    isActive,
    transitioning,
}) {
    const progressRef = useRef()
    const { cancelAnimation } = useSlideIndicator(
        progressRef,
        isActive,
        onFinish,
    )
    const handleClick = useCallback(() => {
        if (!isActive && !transitioning) {
            gsap.killTweensOf(progressRef.current)
            onClick(slide)
        }
    }, [isActive, onClick, progressRef, transitioning])

    useEffect(() => {
        return () => {
            cancelAnimation()
        }
    }, [progressRef])

    return (
        <div
            className="flex flex-col items-center justify-start group text-black-full flex-1 cursor-pointer col-span-4"
            onClick={handleClick}>
            <div className="loader bg-black-full bg-opacity-20 h-[1px] mt-6 w-full group-hover:bg-opacity-100 transition-all duration-300 ease-out">
                <div
                    className="loader-progress w-1/2 bg-black-full h-full"
                    ref={progressRef}></div>
            </div>
            <div className="title font-display text-lg lg:text-2xl transition-all duration-300 ease-out text-center mt-5 hidden lg:block">
                <ArticleDateLine {...slide} />
                <p className="mt-1">{slide.title}</p>
            </div>
        </div>
    )
}
