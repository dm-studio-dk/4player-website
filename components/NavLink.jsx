import Link from "next/link"
import { classNames, path } from "../lib/helpers"

const NavLink = ({ item, isActive, className, onMouseLeave = () => {} }) =>
    item.linkTo ? (
        <Link
            href={path(item.linkTo.slug.current)}
            key={item.linkTo.slug.current}
            onMouseLeave={onMouseLeave}
            className={classNames(
                "tracking-wider hover:opacity-60 mix-blend-difference inline-block w-full lg:w-auto pointer-events-auto whitespace-nowrap",
                {
                    underline: isActive,
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
                "tracking-wider hover:opacity-60 mix-blend-difference inline-block w-full lg:w-auto pointer-events-auto whitespace-nowrap",
                {
                    underline: isActive,
                    ...className,
                },
            )}>
            {item.label}
        </a>
    ) : null

export default NavLink
