import { classNames } from "lib/helpers"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import HeaderItem from "./HeaderItem"

export default function HeaderMobile({ navigation, invertedTop, showBg }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (open) document.body.style.overflow = "hidden"
            else document.body.style.overflow = "auto"
        }

        function handleRouteChangeStart() {
            setOpen(false)
        }

        router.events.on("routeChangeStart", handleRouteChangeStart)

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart)
        }
    }, [open])

    return (
        <>
            <div
                className={classNames(
                    "bar fixed left-0 top-0 font-serif z-50 w-screen transition-all duration-300 ease-in-out lg:hidden py-5",
                    {
                        "text-white": invertedTop && !open && !showBg,
                        "text-black-full": showBg || open,
                        "bg-white": showBg,
                    },
                )}>
                <div className="inner flex items-center justify-between w-screen container mx-auto">
                    <div className="logo">
                        <Link
                            href="/"
                            className="text-2xl font-bold font-display">
                            SPFO
                        </Link>
                    </div>
                    <div
                        className="menu-button relative w-[23px] h-[23px] overflow-hidden"
                        onClick={() => setOpen(!open)}>
                        <svg
                            className={classNames(
                                "absolute top-1/2 left-1/2 -translate-x-1/2 transition-all ease-out duration-500",
                                {
                                    "-translate-y-1/2": !open,
                                    "-translate-y-[200%]": open,
                                },
                            )}
                            width="23"
                            height="17"
                            viewBox="0 0 23 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect
                                width="23"
                                height="3"
                                fill={
                                    !invertedTop || showBg ? "black" : "white"
                                }
                            />
                            <rect
                                y="7"
                                width="23"
                                height="3"
                                fill={
                                    !invertedTop || showBg ? "black" : "white"
                                }
                            />
                            <rect
                                y="14"
                                width="23"
                                height="3"
                                fill={
                                    !invertedTop || showBg ? "black" : "white"
                                }
                            />
                        </svg>
                        <svg
                            className={classNames(
                                "absolute top-1/2 left-1/2 -translate-x-1/2  transition-all ease-out duration-500",
                                {
                                    "-translate-y-1/2": open,
                                    "translate-y-1/2": !open,
                                },
                            )}
                            width="23"
                            height="23"
                            viewBox="0 0 67 66"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M66.85 8.33L58.52 0L33.88 24.64L9.24003 0L0.910034 8.33L25.55 32.97L0.910034 57.61L9.24003 65.94L33.88 41.3L58.52 65.94L66.85 57.61L42.21 32.97L66.85 8.33Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div
                className={classNames(
                    "menu-content fixed top-0 left-1/2 -translate-x-1/2 h-full bg-white z-40 transition-all duration-500 ease-in-out text-black-full overflow-hidden flex flex-col justify-center items-center",
                    {
                        "w-screen pointer-events-auto": open,
                        "w-0 pointer-events-none": !open,
                    },
                )}>
                <div className="inner-content w-screen h-full relative">
                    <nav
                        className={classNames(
                            "space-y-4 text-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-all duration-500 flex flex-col",
                            {
                                "opacity-0": !open,
                            },
                        )}>
                        {navigation.map((item) => (
                            <HeaderItem mobile key={item.label} item={item} />
                        ))}
                    </nav>
                </div>
                <div className="emblem self-center absolute bottom-10 left-1/2 -translate-x-1/2">
                    <img
                        className=""
                        src="/assets/images/player_mark_black.svg"
                        alt=""
                        width="40"
                        height="40"
                    />
                </div>
            </div>
        </>
    )
}
