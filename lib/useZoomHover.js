import { useCallback } from "react"

export default function useZoomHover() {
    const animationStart = useCallback(() => {
        // if (ref.current) {
        //     gsap.killTweensOf(ref.current)
        //     gsap.fromTo(
        //         ref.current,
        //         {
        //             scale: 1,
        //         },
        //         {
        //             scale: 1.3,
        //             duration: 0.25,
        //             ease: "circ.out",
        //         }
        //     )
        // }
    }, [])

    const animationStop = useCallback(() => {
        // if (ref.current) {
        // gsap.killTweensOf(ref.current)
        // gsap.to(ref.current, {
        //     scale: 1,
        //     duration: 0.5,
        //     ease: "power4.out",
        // })
        // }
    }, [])

    return {
        animationStart,
        animationStop,
    }
}
