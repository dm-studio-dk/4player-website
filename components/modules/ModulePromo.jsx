import Image from "next/legacy/image"
import Link from "next/link"
import PortableText from "react-portable-text"
import { classNames, path } from "../../lib/helpers"
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

    return (
        <div className="container pb-20 mx-auto lg:pb-32">
            <div className="module-divider"></div>
            <div className="pt-20 lg:pt-32"></div>
            <AdaptableLink
                className="relative flex items-center justify-center pt-32 bg-green-light py-28 lg:pb-44 lg:pt-60 group"
                href={href}>
                {image?.asset && (
                    <Image
                        alt={title}
                        className={classNames(
                            "block w-full transition-all duration-500 ease-out",
                            { "group-hover:scale-110": href },
                        )}
                        layout="fill"
                        objectFit="cover"
                        loader={sanityLoader()}
                        src={image.asset._id}
                    />
                )}
                <div className="gradient-overlay"></div>
                <div className="relative z-10 px-6 text-center text-white inner-content">
                    <h2 className="text-4xl leading-[1.1] lg:text-[96px] font-bold font-display">
                        {title}
                    </h2>
                    {content && (
                        <PortableText
                            className="space-y-10 mt-4 lg:mt-5 max-w-[60ch] mx-auto text-lg leading-[1.4]"
                            content={content}
                        />
                    )}
                    {buttonLabel && (
                        <div className="mt-6 cta">
                            <Button arrow="right" inverted>
                                {buttonLabel}
                            </Button>
                        </div>
                    )}
                </div>
            </AdaptableLink>
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
    return (
        <div>
            <AdaptableLink
                className="container block mx-auto group"
                href={href}>
                <div className="module-divider"></div>
                <div className="items-center mx-auto site-grid gap-y-0 module-wrapper">
                    <div className="mb-5 bg-green-light image-container col-span-full lg:col-span-6 lg:mb-0">
                        {image?.asset && (
                            <Image
                                alt={title}
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
                    </div>
                    <div
                        className={classNames(
                            "col-span-full lg:col-span-6 text-center",
                            {
                                "lg:-order-1": orientation == "right",
                            },
                        )}>
                        <p className="mb-3 text-base font-display">{label}</p>
                        <h2 className="text-3xl leading-[1.1] lg:text-4xl font-bold font-display">
                            {title}
                        </h2>
                        {typeof content == "string" && (
                            <p className="mt-4 lg:mt-5 lg:max-w-[46ch] mx-auto text-lg leading-[1.4]">
                                {content}
                            </p>
                        )}
                        {content && typeof content == "object" && (
                            <PortableText
                                className="space-y-10 mt-4 lg:mt-5 lg:max-w-[46ch] mx-auto text-lg leading-[1.4]"
                                content={content}
                            />
                        )}
                        {buttonLabel && (
                            <div className="mt-6 cta">
                                <Button arrow="right">{buttonLabel}</Button>
                            </div>
                        )}
                    </div>
                </div>
            </AdaptableLink>
        </div>
    )
}

const AdaptableLink = ({ href, children, className }) => {
    if (href) {
        return (
            <Link href={href} className={className}>
                {children}
            </Link>
        )
    }

    return <div className={className}>{children}</div>
}
