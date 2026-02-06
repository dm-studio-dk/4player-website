import gsap from "gsap"
import { useCallback, useEffect, useRef } from "react"
import useSlideIndicator from "../lib/useSlideIndicator"

export default function HeroSlideIndicator({
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
            className="flex flex-col items-center justify-end group text-white flex-1 cursor-pointer"
            onClick={handleClick}>
            <div className="title font-display text-lg lg:text-2xl leading-[1] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 ease-out text-center">
                {slide.title}
            </div>
            <div className="loader bg-white bg-opacity-50 h-[1px] mt-6 w-full group-hover:bg-opacity-100 transition-all duration-300 ease-out">
                <div
                    className="loader-progress w-1/2 bg-white h-full"
                    ref={progressRef}></div>
            </div>
        </div>
    )
}
