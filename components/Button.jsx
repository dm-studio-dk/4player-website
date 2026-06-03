import Link from "next/link"
import { externalLinkProps } from "../lib/helpers"

export default function Button({
    onClick,
    href,
    internal,
    children,
    arrow,
    inverted,
}) {
    const Arrow = getArrow(arrow, inverted)

    if (href) {
        if (internal) {
            return (
                <Link
                    href={href}
                    className="font-display inline-flex items-center group">
                    {children}
                    <Arrow></Arrow>
                </Link>
            )
        } else {
            return (
                <a
                    href={href}
                    {...externalLinkProps(href)}
                    className="font-display inline-flex items-center group">
                    {children}
                    <Arrow></Arrow>
                </a>
            )
        }
    }

        return (
        <button
            onClick={onClick}
            className="font-display inline-flex items-center group">
                {children}
                <Arrow></Arrow>
            </button>
    )
}

function getArrow(arrow, inverted) {
    if (arrow == "right")
        return () => (
            <img
                src={`/assets/icons/arrow_right${inverted ? "_white" : ""}.svg`}
                alt=""
                className="w-3 block ml-[10px] -mt-0.5 group-hover:translate-x-1/4 duration-200 ease-out transition-all"
            />
        )

    if (arrow == "down")
        return () => (
            <img
                src={`/assets/icons/arrow_down${inverted ? "_white" : ""}.svg`}
                alt=""
                className="w-3 block ml-[10px] -mt-0.5 group-hover:translate-y-1/4 duration-200 ease-out transition-all"
            />
        )

    return () => null
}
