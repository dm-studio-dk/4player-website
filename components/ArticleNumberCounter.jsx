import gsap from "gsap"
import { useEffect, useMemo, useRef, useState } from "react"

export default function ArticleNumberCounter({
    target,
    onComplete = () => {},
}) {
    const ref = useRef()
    const [isClient, setIsClient] = useState(false)

    const style = useMemo(
        () => (isClient ? gsap.utils.random(1, 4, 1) : 1),
        [isClient],
    )

    useEffect(() => {
        setIsClient(true)

        if (ref.current) {
            // const { chars } = new SplitText(ref.current)

            gsap.set(ref.current, {
                y: "100%",
            })
            gsap.to(ref.current, {
                y: "0%",
                ease: "expo.inOut",
                duration: 1,
                stagger: 0.05,
                onComplete: () => {
                    onComplete()
                    gsap.to(ref.current, {
                        y: "-100%",
                        ease: "power3.inOut",
                        duration: 0.8,
                    })
                },
            })
        }
    }, [ref, onComplete])

    return (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-screen overflow-hidden pointer-events-none">
            <p
                className={
                    "font-display text-[300px] lg:text-[600px] leading-[1] overflow-hidden"
                }
                style={{ fontFeatureSettings: `"ss0${style}"` }}>
                <span className="block" ref={ref}>
                    {target}
                </span>
            </p>
        </div>
    )
}
