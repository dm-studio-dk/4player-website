import gsap from "gsap"
import { useEffect } from "react"

export default function useSlideIndicator(ref, isActive, onFinish) {
    useEffect(() => {
        if (isActive) {
            if (ref.current) {
                gsap.fromTo(
                    ref.current,
                    {
                        width: "0%",
                    },
                    {
                        width: "100%",
                        ease: "none",
                        duration: 8,
                        onStart: () => gsap.set(ref.current, { opacity: 1 }),
                        onComplete: onFinish,
                    },
                )
            }
        }

        if (!isActive) {
            if (ref.current) {
                gsap.killTweensOf(ref.current)
                gsap.to(ref.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "sine.out",
                })
            }
        }
    }, [isActive])

    return {
        cancelAnimation: () => {
            if (ref.current) gsap.killTweensOf(ref.current)
        },
    }
}
