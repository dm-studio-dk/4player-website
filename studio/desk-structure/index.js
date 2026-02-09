import {
    IoCog,
    IoDocumentSharp,
    IoFolderSharp,
    IoGlobeOutline,
    IoLinkSharp,
    IoMenuSharp,
    IoNewspaperSharp,
} from "react-icons/io5"
import { Iframe } from "sanity-plugin-iframe-pane"
import resolveProductionUrl from "./../resolveProductionUrl"
import contentTypes, { getContentConfig } from "./contentTypes"

export default (S) =>
    S.list()
        .title("Website")
        .items([
            S.documentTypeListItem("page").title("Pages").icon(IoDocumentSharp),
            S.listItem()
                .title("Content")
                .icon(IoFolderSharp)
                .child(
                    S.list()
                        .title("Content Types")
                        .items(
                            S.documentTypeListItems()
                                .filter((d) =>
                                    contentTypes.some(
                                        (c) => c.name == d.getId(),
                                    ),
                                )
                                .map((item) =>
                                    item.icon(
                                        contentTypes.find(
                                            (c) => c.name == item.getId(),
                                        ).icon,
                                    ),
                                ),
                        ),
                ),

            // S.documentTypeListItem("reusableModule")
            //   .title("Reusable Modules")
            //   .icon(IoMenuOutline),
            S.divider(),
            S.listItem()
                .title("Settings")
                .icon(IoCog)
                .child(
                    S.list()
                        .title("Website settings")
                        .items([
                            S.listItem()
                                .title("Site")
                                .icon(IoGlobeOutline)
                                .child(
                                    S.document()
                                        .schemaType("siteSettings")
                                        .documentId("siteSettings"),
                                ),

                            S.listItem()
                                .title("Header")
                                .icon(IoMenuSharp)
                                .child(
                                    S.document()
                                        .schemaType("header")
                                        .documentId("header"),
                                ),
                            S.listItem()
                                .title("Footer")
                                .icon(IoMenuSharp)
                                .child(
                                    S.document()
                                        .schemaType("footer")
                                        .documentId("footer"),
                                ),
                            S.listItem()
                                .title("News")
                                .icon(IoNewspaperSharp)
                                .child(
                                    S.document()
                                        .schemaType("newsSettings")
                                        .documentId("newsSettings"),
                                ),
                            S.documentTypeListItem("redirect")
                                .title("Redirects")
                                .icon(IoLinkSharp),
                        ]),
                ),
        ])

export const getDefaultDocumentNode = (S, { schemaType }) => {
    if (getContentConfig(schemaType)?.previewable || schemaType == "page") {
        return S.document().views([
            S.view.form(),
            S.view
                .component(Iframe)
                .options({
                    url: (doc) => resolveProductionUrl(doc),
                    reload: {
                        button: true,
                    },
                })
                .title("Live Preview"),
        ])
    }
}
