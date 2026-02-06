import gsap from "gsap"
import { useEffect, useRef } from "react"

export default function LoadingIndicator() {
    const ref = useRef()
    const containerRef = useRef()
    useEffect(() => {
        if (ref.current) {
            const tl = new gsap.timeline({
                paused: true,
                repeat: -1,
                repeatDelay: 0.25,
            })
            tl.fromTo(
                ref.current,
                {
                    y: containerRef.current.offsetHeight,
                },
                {
                    y: 0,
                    duration: 0.75,
                    ease: "expo.out",
                },
            )
                .to(ref.current, {
                    y: -containerRef.current.offsetHeight,
                    ease: "expo.in",
                    delay: 0.25,
                    duration: 0.5,
                })
                .play()
            return () => {
                tl.kill()
            }
        }
    }, [ref])

    return (
        <div
            className="w-full mt-12 overflow-hidden scale-y-50 bg-white lg:mt-32 col-span-full"
            ref={containerRef}>
            <div
                className="w-full mx-auto overflow-hidden text-center bg-black text-9xl font-display"
                ref={ref}>
                |||
            </div>
        </div>
    )
}
