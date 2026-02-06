import gsap from "gsap"
import Image from "next/legacy/image"
import Link from "next/link"
import { forwardRef, useEffect, useMemo, useRef, useState } from "react"
import { classNames } from "../lib/helpers"
import { sanityLoader } from "../lib/imageLoader"

export default function Slide({
    slide,
    isActive,
    onTransitionStart,
    onTransitionEnd,
    animateChildren,
    children,
    className,
    href,
}) {
    const ref = useRef()
    const contentRef = useRef()
    const [visible, setVisible] = useState(false)
    const startsFull = useMemo(() => isActive, [])

    useEffect(() => {
        if (!ref.current) return

        if (isActive && !visible) {
            gsap.killTweensOf(ref.current)
            gsap.to(ref.current, {
                width: "100%",
                duration: 1,
                ease: "power3.inOut",
                onStart: onTransitionStart,
                onComplete: onTransitionEnd,
            })
            if (animateChildren) {
                gsap.fromTo(
                    contentRef.current.children,
                    {
                        x: 50,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        stagger: 0.1,
                        ease: "power3.out",
                        delay: 0.5,
                        duration: 1,
                    },
                )
            }

            setVisible(true)
        }

        if (!isActive && visible) {
            gsap.killTweensOf(ref.current)
            gsap.to(ref.current, {
                width: "0%",
                duration: 1,
                ease: "power3.inOut",
            })
            if (animateChildren) {
                gsap.to(contentRef.current.children, {
                    opacity: 0,
                    ease: "power3.inOut",
                })
            }
            setVisible(false)
        }
    }, [isActive, ref, onTransitionStart, onTransitionEnd, animateChildren])

    useEffect(() => {
        return () => {
            if (ref.current) {
                gsap.killTweensOf(ref.current)
                const children = [...contentRef.current.children]
                children.forEach((c) => gsap.killTweensOf(c))
            }
        }
    }, [ref])

    return (
        <SlideContainer
            ref={ref}
            href={href}
            className={classNames(
                className,
                "h-screen w-full  relative overflow-hidden",
                {
                    "w-0": !startsFull,
                },
            )}>
            <div className="absolute top-0 w-screen h-full -translate-x-1/2 bg-gray-400 image-container left-1/2">
                {slide.image.asset && (
                    <Image
                        alt={slide.title}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        loader={sanityLoader()}
                        src={slide.image.asset._id}
                    />
                )}
            </div>
            <div className="gradient-overlay"></div>
            <div
                className="container relative z-10 w-screen text-center text-white text-content"
                ref={contentRef}>
                {children}
            </div>
        </SlideContainer>
    )
}

const SlideContainer = forwardRef(({ href, className, children }, ref) => {
    if (href)
        return (
            <Link href={href} className={className} ref={ref}>
                {children}
            </Link>
        )

    return (
        <div className={className} ref={ref}>
            {children}
        </div>
    )
})
