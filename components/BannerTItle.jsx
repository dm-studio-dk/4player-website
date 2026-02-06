import classNames from "classnames"
import gsap from "gsap"
import { useEffect, useRef } from "react"

export default function BannerTitle({ title, children, className, snug }) {
    const measureRef = useRef(null)
    const titleRef = useRef(null)

    useEffect(() => {
        let tween = null
        async function startTween() {
            await document.fonts.ready
            const width = measureRef?.current?.offsetWidth
            if (!width) return

            const duration = width / 50

            tween = gsap.to(titleRef.current, {
                x: "-=" + measureRef.current.offsetWidth,
                ease: "none",
                duration,
                repeat: -1,
            })
        }
        if (measureRef.current && titleRef.current) {
            startTween()

            return () => tween?.kill?.()
        }
    }, [])

    return (
        <div
            className={classNames(
                "font-display overflow-hidden pointer-events-none select-none",
                className,
            )}>
            <div
                className={
                    "whitespace-nowrap w-auto font-display " +
                    (title ? "text-[180px] lg:text-[300px] leading-[1]" : "")
                }
                ref={titleRef}>
                <div
                    className={"inline-block " + (snug ? "" : "pr-20")}
                    ref={measureRef}>
                    {title || children}
                </div>
                <div className={"inline-block " + (snug ? "" : "pr-20")}>
                    {title || children}
                </div>
                <div className={"inline-block " + (snug ? "" : "pr-20")}>
                    {title || children}
                </div>
                <div className={"inline-block " + (snug ? "" : "pr-20")}>
                    {title || children}
                </div>
                <div className={"inline-block " + (snug ? "" : "pr-20")}>
                    {title || children}
                </div>
            </div>
        </div>
    )
}
