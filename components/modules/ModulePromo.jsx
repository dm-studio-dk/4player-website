import Image from "next/legacy/image"
import Link from "next/link"
import PortableText from "react-portable-text"
import { classNames, externalLinkProps, path } from "../../lib/helpers"
import { sanityLoader } from "../../lib/imageLoader"
import Button from "./../Button"

export default function ModulePromo({ module }) {
    return module.imageBackground ? (
        <PromoFull {...module} />
    ) : (
        <PromoSplit {...module} />
    )
}

export function PromoFull({
    buttonLabel,
    linkType,
    reference,
    url,
    title,
    content,
    image,
}) {
    const href =
        linkType == "internal"
            ? path(reference?.slug?.current) || ""
            : url || ""
    const isInternal = linkType == "internal"
    const hasContent = Array.isArray(content)
        ? content.length > 0
        : Boolean(content)

    return (
        <div className="container pb-20 mx-auto lg:pb-32">
            <div className="module-divider"></div>
            <div className="pt-20 lg:pt-32"></div>
            <div className="relative flex items-center justify-center pt-32 bg-green-light py-28 lg:pb-44 lg:pt-60 group">
                {image?.asset && (
                    <AdaptableLink
                        href={href}
                        internal={isInternal}
                        fallback="div"
                        className="absolute inset-0"
                        aria-label={buttonLabel || title}>
                        <Image
                            alt={title || ""}
                            className={classNames(
                                "block w-full transition-all duration-500 ease-out",
                                { "group-hover:scale-110": href },
                            )}
                            layout="fill"
                            objectFit="cover"
                            loader={sanityLoader()}
                            src={image.asset._id}
                        />
                    </AdaptableLink>
                )}
                <div className="pointer-events-none gradient-overlay"></div>
                <div className="relative z-10 px-6 text-center text-white inner-content w-max">
                    {title && (
                        <h2 className="text-4xl leading-[1.1] lg:text-[96px] font-bold font-display">
                            <AdaptableLink href={href} internal={isInternal}>
                                {title}
                            </AdaptableLink>
                        </h2>
                    )}
                    {hasContent && (
                        <PortableText
                            className={classNames(
                                "space-y-10 max-w-[60ch] mx-auto text-lg leading-[1.4]",
                                { "mt-4 lg:mt-5": title },
                            )}
                            content={content}
                            serializers={promoContentSerializers}
                        />
                    )}
                    {buttonLabel && (
                        <div
                            className={classNames("cta", {
                                "mt-6": title || hasContent,
                            })}>
                            <Button
                                arrow="right"
                                inverted
                                href={href}
                                internal={isInternal}>
                                {buttonLabel}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export function PromoSplit({
    buttonLabel,
    linkType,
    reference,
    url,
    title,
    content,
    image,
    orientation,
    label,
}) {
    const href =
        linkType == "internal"
            ? path(reference?.slug?.current) || ""
            : url || ""
    const isInternal = linkType == "internal"
    const hasContent = Array.isArray(content)
        ? content.length > 0
        : Boolean(content)
    const hasHeading = Boolean(label || title)

    return (
        <div>
            <div className="container relative block mx-auto group">
                <div className="module-divider"></div>
                <div className="items-center mx-auto site-grid gap-y-0 module-wrapper">
                    <AdaptableLink
                        href={href}
                        internal={isInternal}
                        fallback="div"
                        className="mb-5 bg-green-light image-container col-span-full lg:col-span-6 lg:mb-0"
                        aria-label={buttonLabel || title}>
                        {image?.asset && (
                            <Image
                                alt={title || ""}
                                className={classNames(
                                    "block w-full transition-all duration-500 ease-out",
                                    { "group-hover:scale-110": href },
                                )}
                                layout="responsive"
                                loader={sanityLoader()}
                                width={800}
                                height={
                                    800 *
                                    (image.asset.metadata.dimensions.height /
                                        image.asset.metadata.dimensions.width)
                                }
                                src={image.asset._id}
                            />
                        )}
                    </AdaptableLink>
                    <div
                        className={classNames(
                            "col-span-full lg:col-span-6 text-center",
                            {
                                "lg:-order-1": orientation == "right",
                            },
                        )}>
                        {label && (
                            <p className="text-base font-display">{label}</p>
                        )}
                        {title && (
                            <h2
                                className={classNames(
                                    "text-3xl leading-[1.1] lg:text-4xl font-bold font-display",
                                    { "mt-3": label },
                                )}>
                                <AdaptableLink
                                    href={href}
                                    internal={isInternal}>
                                    {title}
                                </AdaptableLink>
                            </h2>
                        )}
                        {hasContent && typeof content == "string" && (
                            <p
                                className={classNames(
                                    "lg:max-w-[46ch] mx-auto text-lg leading-[1.4]",
                                    { "mt-4 lg:mt-5": hasHeading },
                                )}>
                                {content}
                            </p>
                        )}
                        {hasContent && typeof content == "object" && (
                            <PortableText
                                className={classNames(
                                    "space-y-10 lg:max-w-[46ch] mx-auto text-lg leading-[1.4]",
                                    { "mt-4 lg:mt-5": hasHeading },
                                )}
                                content={content}
                                serializers={promoContentSerializers}
                            />
                        )}
                        {buttonLabel && (
                            <div
                                className={classNames("cta", {
                                    "mt-6": hasHeading || hasContent,
                                })}>
                                <Button
                                    arrow="right"
                                    href={href}
                                    internal={isInternal}>
                                    {buttonLabel}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const AdaptableLink = ({
    href,
    internal,
    className,
    children,
    fallback: Fallback = "span",
    ...props
}) => {
    if (!href) return <Fallback className={className}>{children}</Fallback>

    if (internal) {
        return (
            <Link href={href} className={className} {...props}>
                {children}
            </Link>
        )
    }

    return (
        <a
            href={href}
            className={className}
            {...externalLinkProps(href)}
            {...props}>
            {children}
        </a>
    )
}

const promoContentSerializers = {
    link: ({ children, href, url }) => {
        const linkHref = url || href

        if (!linkHref) return children

        return (
            <a
                href={linkHref}
                className="underline"
                {...externalLinkProps(linkHref)}>
                {children}
            </a>
        )
    },
}
