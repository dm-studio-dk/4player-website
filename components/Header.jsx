import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import HeaderDesktop from "./HeaderDesktop"
import HeaderMobile from "./HeaderMobile"

export default function Header({ navigation, moduleContext }) {
    const [visible, setVisible] = useState(true)
    const [showBg, setShowBg] = useState(false)
    const { asPath } = useRouter()
    const invertedTop = moduleContext.startsWithHero
        ? moduleContext.modules[0].imageBackground
        : ["moduleHeroSlider"].includes(moduleContext.startsWith) ||
          asPath.startsWith("/guide") ||
          asPath.startsWith("/initiativ")

    useEffect(() => {
        if (typeof window !== "undefined") {
            let currentScroll = Math.max(0, window.scrollY)
            function handleScroll() {
                const scroll = Math.max(0, window.scrollY)
                if (scroll > currentScroll) {
                    if (invertedTop) {
                        if (scroll > window.innerHeight) setVisible(false)
                    } else {
                        setVisible(false)
                    }
                }

                if (scroll < currentScroll) setVisible(true)

                if (scroll > window.innerHeight * 0.25) setShowBg(true)
                else setShowBg(false)

                currentScroll = scroll
            }

            handleScroll()

            window.addEventListener("scroll", handleScroll)

            return () => {
                handleScroll()
                window.removeEventListener("scroll", handleScroll)
            }
        }
    }, [asPath])

    return (
        <>
            <HeaderDesktop
                navigation={navigation}
                showBg={showBg}
                invertedTop={invertedTop}
                visible={visible}
            />
            <HeaderMobile
                navigation={navigation}
                showBg={showBg}
                invertedTop={invertedTop}
                visible={visible}
            />
        </>
    )
}
