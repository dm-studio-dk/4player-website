import Link from "next/link"
import { classNames, path } from "../lib/helpers"

const NavLink = ({ item, isActive, className, onMouseLeave = () => {} }) =>
    item.linkTo ? (
        <Link
            href={path(item.linkTo.slug.current)}
            key={item.linkTo.slug.current}
            onMouseLeave={onMouseLeave}
            className={classNames(
                "tracking-wider hover:opacity-60 inline-block w-full lg:w-auto pointer-events-auto whitespace-nowrap transition-all duration-300",
                {
                    "mix-blend-difference": !item.isButton,
                    "bg-green-light text-black-full px-4 py-2":
                        item.isButton,
                    underline: isActive && !item.isButton,
                    ...className,
                },
            )}>
            {item.label}
        </Link>
    ) : item.url ? (
        <a
            href={item.url}
            target="_blank"
            key={item.url}
            onMouseLeave={onMouseLeave}
            className={classNames(
                "tracking-wider hover:opacity-60 inline-block w-full lg:w-auto pointer-events-auto whitespace-nowrap transition-all duration-300",
                {
                    "mix-blend-difference": !item.isButton,
                    "bg-green-light text-black-full px-4 py-2":
                        item.isButton,
                    underline: isActive && !item.isButton,
                    ...className,
                },
            )}>
            {item.label}
        </a>
    ) : null

export default NavLink
