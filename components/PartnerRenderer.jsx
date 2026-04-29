import Link from "next/link"
import PortableText from "react-portable-text"
import { fileUrl, path } from "../lib/helpers"
import Accordion from "./Accordion"
import DownloadBlock from "./DownloadBlock"
import Embed from "./Embed"
import Factbox from "./Factbox"
import ModulePersonList from "./modules/ModulePersonList"
import ModuleTable from "./modules/ModuleTable"
import ReferenceBlock from "./ReferenceBlock"

export default function PartnerRenderer({ body }) {
    return (
        <div className="font-serif portable-text-wrapper">
            {body && (
                <PortableText
                    className="-mt-4 col-span-full lg:col-start-4 lg:col-span-6"
                    content={body}
                    serializers={{
                        normal: (props) => (
                            <div className="container mx-auto mt-8 site-grid">
                                <p
                                    className="text-lg leading-6 col-span-full lg:col-span-6 lg:col-start-4"
                                    {...props}
                                />
                            </div>
                        ),
                        h3: (props) => (
                            <div className="container mx-auto mt-16 site-grid">
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

                        ol: (props) => (
                            <div className="container mx-auto mt-4 site-grid">
                                <ol
                                    className="col-span-full lg:col-span-6 lg:col-start-4 list-[disc] pl-4 text-lg space-y-2 mb-2 leading-[1.5] list-ordered"
                                    {...props}></ol>
                            </div>
                        ),
                        accordion: (props) => (
                            <Accordion className="my-10" {...props} />
                        ),
                        highlight: (props) => <Factbox {...props} black />,
                        referenceBlock: ReferenceBlock,
                        downloadBlock: DownloadBlock,
                        // Annotations
                        link: ({ children, url }) => (
                            <a href={url} className="underline" target="_blank">
                                {children}
                            </a>
                        ),
                        internalLink: ({ slug, children }) =>
                            slug ? (
                                <Link
                                    href={path(slug.current)}
                                    className="underline">
                                    {children}
                                </Link>
                            ) : null,
                        downloadLink: ({ children, file }) => (
                            <a
                                href={fileUrl(file)}
                                className="underline"
                                target="blank">
                                {children}
                            </a>
                        ),
                        moduleTable: (props) => (
                            <ModuleTable {...props} module={props} small />
                        ),
                        modulePersonList: (props) => (
                            <ModulePersonList {...props} module={props} />
                        ),
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
