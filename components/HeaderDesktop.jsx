import gsap from "gsap"
import { classNames } from "lib/helpers"
import Link from "next/link"
import { useCallback, useRef, useState } from "react"
import HeaderItem from "./HeaderItem"

export default function HeaderDesktop({
    navigation,
    visible,
    invertedTop,
    showBg,
}) {
    const height = useRef(64)
    const [showingDropdown, setShowingDropdown] = useState()
    const ref = useRef()
    const delayedCall = useRef()
    const expand = useCallback((node) => {
        if (!node) return

        setTimeout(() => {
            const submenu = node.querySelector(".submenu-container")
            if (!submenu) return
            gsap.killTweensOf(ref.current)
            const submenuBounds = submenu.getBoundingClientRect()
            if (delayedCall.current) {
                delayedCall.current.kill()
                delayedCall.current = undefined
            }
            setShowingDropdown(true)
            gsap.set(ref.current, {
                height: submenuBounds.bottom + height.current * 0.5,
            })
        })
    }, [])
    const contract = useCallback(() => {
        delayedCall.current = gsap.delayedCall(0.3, () => {
            setShowingDropdown(false)
        })
        gsap.set(ref.current, {
            height: height.current,
            transition: null,
        })
    }, [])

    return (
        <div
            ref={ref}
            className={classNames(
                "fixed left-0 top-0 font-serif z-50 w-screen hidden lg:block transition-all duration-300 ease-out overflow-hidden",
                "bg-green-dark text-white py-4", // Fixed py-4 as requested
                {
                    "translate-y-0": visible,
                    "-translate-y-full": !visible,
                },
            )}>
            <div className="inner flex items-center justify-between w-full container mx-auto relative">
                <div className="logo">
                    <Link href="/">
                        <img 
                            src="/assets/images/4player-logo.svg" 
                            alt="4player logo" 
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>
                <nav className="hidden lg:flex items-center space-x-8 text-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {navigation.map((item) => (
                        <HeaderItem
                            key={item.label}
                            item={item}
                            onSubmenuShow={expand}
                            onSubmenuHide={contract}
                        />
                    ))}
                </nav>
                <div className="flex items-center space-x-4">
                    <Link href="/" className="emblem self-center relative">
                        {/* Removed old SPFO marks */}
                    </Link>
                </div>
            </div>
        </div>
    )
}
