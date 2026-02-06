import { motion } from "framer-motion"
import Link from "next/link"
import { forwardRef } from "react"
import { ARTICLE_TYPE_LABELS } from "../config/const"
import { classNames, formatArticleDate, path } from "../lib/helpers"

function ArticleDateLine(
    {
        theme,
        type,
        publishedAt,
        dark = true,
        linkTheme = false,
        className,
        center = true,
        style,
    },
    ref,
) {
    return (
        <motion.div
            className={classNames("meta flex space-x-10", className)}
            style={style}
            ref={ref}>
            <p
                className={classNames("text-sm w-full flex items-center", {
                    "text-center justify-center": center,
                })}>
                {theme && linkTheme ? (
                    <Link
                        href={path(theme.slug.current)}
                        className="font-display">
                        {theme.title}
                    </Link>
                ) : (
                    <span className="font-display">
                        {ARTICLE_TYPE_LABELS[type] || type}
                    </span>
                )}

                <span
                    className={classNames(
                        "mx-1.5 inline-block h-[1px] w-2 -translate-y-[1px]",
                        {
                            "bg-black-full": dark,
                            "bg-white": !dark,
                        },
                    )}></span>
                <span className="font-serif">
                    {formatArticleDate(publishedAt)}
                </span>
            </p>
        </motion.div>
    )
}

export default forwardRef(ArticleDateLine)
