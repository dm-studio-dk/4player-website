import gsap from "gsap"
import { useCallback, useState } from "react"

export default function useSlider(slides) {
    const [transitioning, setTransitioning] = useState(false)
    const [activeSlide, setActiveSlide] = useState(0)
    const onSlideClick = useCallback((slide) => {
        setActiveSlide(slide.index)
    }, [])

    const advance = useCallback(() => {
        setActiveSlide(
            gsap.utils.wrap(
                slides.map((slide) => slide.index),
                activeSlide + 1,
            ),
        )
    }, [activeSlide])

    return {
        advance,
        setActiveSlide,
        activeSlide,
        transitioning,
        setTransitioning,
        onSlideClick,
    }
}
