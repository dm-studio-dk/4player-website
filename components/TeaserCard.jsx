import Link from "next/link"

export default function TeaserCard({
    title,
    subtitle,
    children,
    className,
    href,
}) {
    return (
        <Link href={href} className={className}>
            <div className="img-container">{children}</div>
            <div className="info">
                <h3>{title}</h3>
                {subtitle && <p>{subtitle}</p>}
            </div>
        </Link>
    )
}
