import Link from "next/link"
import PortableText from "react-portable-text"
import { path } from "../lib/helpers"
import BlockQuote from "./BlockQuote"
import Embed from "./Embed"
import Factbox from "./Factbox"
import ImageCaption from "./ImageCaption"
import ReferenceBlock from "./ReferenceBlock"

export default function ArticleRenderer({ theme, body }) {
    return body ? (
        <div className={theme}>
            <PortableText
                className="col-span-full lg:col-start-4 lg:col-span-6"
                content={body}
                serializers={{
                    normal: (props) => (
                        <div className="site-grid container mx-auto mt-4">
                            <p
                                className="text-lg col-span-full lg:col-span-6 lg:col-start-4 mb-2 leading-[1.5]"
                                {...props}
                            />
                        </div>
                    ),
                    h3: (props) => (
                        <div className="site-grid container mx-auto -mb-2 mt-12">
                            <h3
                                className="font-display text-xl lg:text-2xl col-span-full lg:col-span-6 lg:col-start-4"
                                {...props}
                            />
                        </div>
                    ),
                    ul: (props) => (
                        <div className="site-grid container mx-auto mt-4">
                            <ul
                                className="col-span-full lg:col-span-6 lg:col-start-4 list-[disc] pl-4 text-lg space-y-2 mb-2 leading-[1.5] list"
                                {...props}></ul>
                        </div>
                    ),
                    ol: (props) => (
                        <div className="site-grid container mx-auto mt-4">
                            <ol
                                className="col-span-full lg:col-span-6 lg:col-start-4 list-[disc] pl-4 text-lg space-y-2 mb-2 leading-[1.5] list"
                                {...props}></ol>
                        </div>
                    ),
                    // Annotations
                    link: ({ children, href, url }) => (
                        <a
                            href={url || href}
                            className="underline"
                            target="_blank">
                            {children}
                        </a>
                    ),
                    internalLink: ({ slug, children }) => (
                        <Link href={path(slug.current)} className="underline">
                            {children}
                        </Link>
                    ),
                    factbox: (props) => <Factbox {...props} />,
                    embed: (props) => (
                        <div className="container mx-auto site-grid my-10">
                            <Embed
                                className=" col-span-full lg:col-span-8 lg:col-start-3"
                                {...props}
                            />
                        </div>
                    ),
                    imageCaption: (props) => (
                        <div className="container mx-auto site-grid">
                            <ImageCaption
                                className="col-span-full lg:col-span-8 lg:col-start-3"
                                {...props}
                            />
                        </div>
                    ),
                    blockQuote: BlockQuote,
                    referenceBlock: ReferenceBlock,
                }}
            />
        </div>
    ) : null
}
