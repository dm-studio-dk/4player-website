import SplitRow from "components/SplitRow"
import Button from "components/Button"
import { path } from "lib/helpers"
import { sanityLoader } from "lib/imageLoader"
import Image from "next/legacy/image"
import Link from "next/link"
import PortableText from "react-portable-text"

export default function ModuleImageList({ module }) {
    const { title, items } = module;
    const IMAGE_ASPECT = 2.6;

    return (
        <div>
            {title && (
                <div className="container mx-auto">
                    <h2 className="my-10 mt-20 text-2xl font-bold text-left lg:text-4xl font-display">
                        {title}
                    </h2>
                </div>
            )}
            <ul>
                {(items || []).map((item, index) => (
                    <li key={item._key}>
                        <SplitRow
                            topBorder={index == 0}
                            left={
                                <div className="flex items-center h-full pb-4 name-section lg:pb-0">
                                    {item.image && (
                                        <div
                                            className="relative h-16 lg:h-32"
                                            style={{
                                                aspectRatio: `${IMAGE_ASPECT}`,
                                            }}
                                        >
                                            <Image
                                                layout="fill"
                                                objectFit="contain"
                                                objectPosition="left center"
                                                loader={sanityLoader()}
                                                src={item.image.asset._id}
                                            />
                                        </div>
                                    )}
                                </div>
                            }
                            right={
                                <div className="text-lg info-section">
                                    <p className="font-display leading-[1.2]">
                                        {item.title}
                                    </p>
                                    {item.body && (
                                        <PortableText
                                            className="mt-3"
                                            content={item.body}
                                            serializers={{
                                                normal: (props) => (
                                                    <p
                                                        {...props}
                                                        className="mb-2"
                                                    />
                                                ),
                                                link: ({
                                                    children,
                                                    href,
                                                    url,
                                                }) => (
                                                    <a
                                                        href={url || href}
                                                        className="underline transition-all duration-300 hover:opacity-60"
                                                        target="_blank"
                                                    >
                                                        {children}
                                                    </a>
                                                ),
                                                internalLink: ({
                                                    slug,
                                                    children,
                                                }) => (
                                                    <Link
                                                        href={path(
                                                            slug.current,
                                                        )}
                                                        className="underline"
                                                    >
                                                        {children}
                                                    </Link>
                                                ),
                                            }}
                                        />
                                    )}
                                    {(item.readMore || []).map((cta) => {
                                        const href =
                                            cta.linkType === "internal"
                                                ? path(
                                                      cta.reference?.slug
                                                          ?.current,
                                                  ) || ""
                                                : cta.url || ""
                                        if (!href) return null
                                        return (
                                            <div
                                                key={cta._key}
                                                className="mt-4 cta"
                                            >
                                                <Button
                                                    href={href}
                                                    internal={
                                                        cta.linkType ===
                                                        "internal"
                                                    }
                                                    arrow="right"
                                                >
                                                    {cta.buttonLabel ||
                                                        "Læs mere"}
                                                </Button>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        ></SplitRow>
                    </li>
                ))}
            </ul>
        </div>
    );
}
