import BlockQuote from "components/BlockQuote"
import DownloadBlock from "components/DownloadBlock"
import Embed from "components/Embed"
import Factbox from "components/Factbox"
import classNames from "classnames"
import Link from "next/link"
import PortableText from "react-portable-text"
import { externalLinkProps, fileUrl, path } from "../../lib/helpers"

export default function ModuleText({ module, previousModule }) {
    const followsPromo = previousModule?._type === "modulePromo"

    return (
        <div
            className={classNames("theme-green-light mb-20 lg:mb-32", {
                "mt-20 lg:mt-32": !followsPromo,
            })}>
            {module.title && (
                <div className="container mx-auto title-container site-grid">
                    <h2 className="text-center uppercase font-display text-4xl leading-[1.1] lg:text-[80px] col-span-full lg:col-span-8 lg:col-start-3 ">
                        {module.title}
                    </h2>
                </div>
            )}
            {module.body && (
                <PortableText
                    content={module.body}
                    serializers={{
                        normal: (props) => (
                            <div className="container mx-auto mt-4 site-grid">
                                <p
                                    className="text-lg col-span-full lg:col-span-6 lg:col-start-4 mb-2 leading-[1.5]"
                                    {...props}
                                />
                            </div>
                        ),
                        h3: (props) => (
                            <div className="container mx-auto mt-12 -mb-2 site-grid">
                                <h3
                                    className="text-xl font-display lg:text-2xl col-span-full lg:col-span-6 lg:col-start-4"
                                    {...props}
                                />
                            </div>
                        ),
                        ul: (props) => (
                            <div className="container mx-auto mt-4 site-grid">
                                <ul
                                    className="col-span-full lg:col-span-6 lg:col-start-4 list-[disc] pl-4 text-lg space-y-2 mb-2 leading-[1.5] list"
                                    {...props}></ul>
                            </div>
                        ),
                        // Annotations
                        link: ({ children, url }) => (
                            <a
                                href={url}
                                className="underline"
                                {...externalLinkProps(url)}>
                                {children}
                            </a>
                        ),
                        internalLink: ({ slug, children }) => (
                            <Link
                                href={path(slug?.current || "")}
                                className="underline">
                                {children}
                            </Link>
                        ),
                        downloadLink: ({ children, file }) => (
                            <a
                                href={fileUrl(file)}
                                className="underline"
                                target="blank">
                                {children}
                            </a>
                        ),
                        blockQuote: BlockQuote,
                        downloadBlock: DownloadBlock,
                        factbox: Factbox,
                        embed: (props) => (
                            <div className="container mx-auto my-10 site-grid">
                                <Embed
                                    className=" col-span-full lg:col-span-8 lg:col-start-3"
                                    {...props}
                                />
                            </div>
                        ),
                    }}
                />
            )}
        </div>
    )
}
