import classNames from "classnames"

export default function Hero({ children, className }) {
    return (
        <div className={classNames("hero overflow-hidden w-full", className)}>
            {children}
        </div>
    )
}
