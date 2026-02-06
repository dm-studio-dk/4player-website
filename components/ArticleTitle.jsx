import { forwardRef } from "react"
import { classNames } from "../lib/helpers"

const ArticleTitle = function ({ children, className, prefix = null }, ref) {
    return (
        <h1
            ref={ref}
            className={classNames(
                "text-[43px] leading-[0.9] font-bold font-display lg:text-title-jumbo pt-6 break-words",
                className,
            )}>
            {prefix}
            {children}
        </h1>
    )
}

export default forwardRef(ArticleTitle)
