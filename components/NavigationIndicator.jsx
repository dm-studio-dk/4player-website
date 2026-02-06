import gsap from "gsap"
import { useRouter } from "next/router"
import { useRef, useEffect } from "react"

export default function NavigationIndicator() {
    const ref = useRef()
    const router = useRouter()

    useEffect(() => {
        const onNavStart = () => {
            if (ref.current) {
                gsap.set(ref.current, { scaleX: 0, opacity: 1 })
                gsap.to(ref.current, {
                    duration: 4,
                    ease: "power3.out",
                    keyframes: {
                        scaleX: [0, 0.1, 0.35, 0.8, 0.95],
                    },
                })
            }
        }
        const onNavEnd = () => {
            if (ref.current) {
                gsap.killTweensOf(ref.current)
                gsap.to(ref.current, {
                    scaleX: 1,
                    opacity: 0,
                })
            }
        }

        router.events.on("routeChangeStart", onNavStart)
        router.events.on("routeChangeComplete", onNavEnd)

        return () => {
            router.events.off("routeChangeStart", onNavStart)
            router.events.off("routeChangeComplete", onNavEnd)
        }
    }, [])

    return (
        <div className="fixed  top-0 left-0 w-full h-0.5 z-50">
            <div
                ref={ref}
                className="progress absolute top-0 left-0 w-full h-full bg-black-almost scale-x-0 origin-left"
            />
        </div>
    )
}
