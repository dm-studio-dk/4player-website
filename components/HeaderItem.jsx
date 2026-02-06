import classNames from "classnames"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef, useState } from "react"
import { path } from "../lib/helpers"
import NavLink from "./NavLink"

const HeaderItem = ({ item, mobile, onSubmenuShow, onSubmenuHide }) => {
    const submenuRef = useRef()
    const { events, asPath } = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const onMouseEnter = useCallback(
        (event) => {
            if (mobile) return

            setIsOpen(true)
            onSubmenuShow?.(event.currentTarget)
        },
        [onSubmenuShow],
    )
    const onMouseLeave = useCallback(() => {
        if (mobile) return

        setIsOpen(false)
        onSubmenuHide?.()
    }, [onSubmenuHide])

    useEffect(() => {
        const handleRouteChangeStart = () => setIsOpen(false)
        return events.off("routeChangeStart", handleRouteChangeStart)
    }, [])

    // useEffect(() => {
    //     if (isOpen) {
    //         onSubmenuShow?.(submenuRef.current)
    //     }
    // }, [isOpen])

    if (!item) return <></>

    if (item.external)
        return (
            <a
                href={item.url}
                target="_blank"
                className="inline-block"
                key={item.url}>
                {item.label}
            </a>
        )

    if (item.linkTo)
        return (
            <NavLink
                item={item}
                isActive={asPath == `/${item.linkTo.slug.current}`}
            />
        )

    if (item.hasSubmenu) {
        return (
            <div
                className="relative cursor-default hover:underline lg:pr-4 menu-with-submenu inline-block"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={() => {
                    if (mobile) setIsOpen(!isOpen)
                }}>
                <h3
                    className={classNames(
                        "relative inline-block whitespace-nowrap",
                        item.subLinks.some(
                            (subLink) =>
                                asPath == path(subLink.linkTo?.slug.current),
                        )
                            ? "underline mix-blend-difference"
                            : "mix-blend-difference",
                    )}>
                    {item.label} <ArrowDown flip={isOpen} />
                </h3>
                <div
                    ref={submenuRef}
                    onMouseLeave={onMouseLeave}
                    className={
                        "submenu-container sub-links flex flex-col" +
                        (mobile
                            ? isOpen
                                ? " block"
                                : " hidden"
                            : " absolute top-full left-0 pt-4 space-y-2 no-underline")
                    }>
                    {item.subLinks.map((subLink) => (
                        <NavLink
                            key={subLink.label}
                            item={subLink}
                            isActive={
                                asPath == path(subLink.linkTo?.slug.current)
                            }
                        />
                    ))}
                </div>
            </div>
        )
    }
}

const ArrowDown = ({ flip }) => (
    <motion.svg
        viewBox="0 0 67 77"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="origin-center w-2 ml-2 fill-current block absolute left-full top-1/2 -translate-y-1/2">
        <motion.path
            d="M66.585 43.5351L58.255 35.2051L39.605 53.8551L39.605 0.965087L27.825 0.965086L27.825 53.8551L9.17496 35.2051L0.844954 43.5351L33.715 76.3951L66.585 43.5351Z"
            style={{ originX: 0.5, originY: 0.5 }}
            animate={{ rotate: flip ? -180 : 0 }}
            transition={{ duration: 0.25 }}
        />
    </motion.svg>
)

export default HeaderItem
