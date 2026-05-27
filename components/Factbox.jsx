import { sanityLoader } from "lib/imageLoader"
import Image from "next/legacy/image"
import Link from "next/link"
import PortableText from "react-portable-text"
import { classNames, path } from "../lib/helpers"

const externalLinkProps = (url) =>
    /^https?:\/\//i.test(url)
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {}

export default function Factbox({ title, body, image, black = false }) {
    return (
        <div className="container w-full mx-auto mt-12 site-grid">
            <div
                className={classNames(
                    "py-8 px-6 lg:px-8 col-span-full lg:col-span-6 lg:col-start-4",
                    {
                        "bg-black-full text-white": black,
                        "bg-current-theme text-black-full": !black,
                    },
                )}>
                <h3
                    className={classNames("text-lg font-bold font-display", {
                        "text-green-light": black,
                    })}>
                    {title}
                </h3>
                {body?.length && (
                    <PortableText
                        className="mt-4 space-y-4 text-base"
                        content={body}
                        serializers={{
                            // Annotations
                            link: ({ children, url }) => (
                                <a
                                    href={url}
                                    className="underline text-green-dark"
                                    {...externalLinkProps(url)}>
                                    {children}
                                </a>
                            ),
                            internalLink: ({ slug, children }) => (
                                <Link
                                    href={path(slug?.current || "")}
                                    className="underline text-green-dark">
                                    {children}
                                </Link>
                            ),
                        }}
                    />
                )}
                {image?.asset && (
                    <div className="mt-16 md:w-3/5">
                        <div
                            className="relative w-full bg-green-light image-container"
                            style={{
                                aspectRatio: `${image.asset.metadata.dimensions.aspectRatio}`,
                            }}>
                            <Image
                                alt={title}
                                src={image.asset._id}
                                layout="fill"
                                objectFit="cover"
                                loader={sanityLoader()}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
