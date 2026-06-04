import {
    IoBrowsersSharp,
    IoCheckboxSharp,
    IoDownloadSharp,
    IoLinkSharp,
    IoShareSharp,
    IoTextSharp,
} from "react-icons/io5"
import { blocksToPlainText, LINK_URL_SCHEMES } from "../../../utils/helpers"
import { linkableReferenceTypes } from "../../../utils/fields"

export default {
    name: "moduleText",
    title: "Text",
    type: "object",
    icon: IoTextSharp,
    fields: [
        {
            name: "title",
            type: "string",
        },
        {
            name: "body",
            type: "array",
            of: [
                {
                    type: "blockQuote",
                },
                { type: "downloadBlock", icon: IoDownloadSharp },
                { type: "factbox", icon: IoCheckboxSharp },
                { type: "embed", icon: IoBrowsersSharp },
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "Heading", value: "h3" },
                    ],
                    marks: {
                        annotations: [
                            {
                                name: "downloadLink",
                                type: "object",
                                title: "Download Link",
                                icon: IoDownloadSharp,
                                fields: [
                                    {
                                        name: "file",
                                        title: "File",
                                        type: "file",
                                        validation: (Rule) => Rule.required(),
                                    },
                                ],
                            },
                            {
                                name: "link",
                                type: "object",
                                title: "Link",
                                icon: IoShareSharp,
                                fields: [
                                    {
                                        name: "url",
                                        type: "url",
                                        validation: (Rule) =>
                                            Rule.required().uri({
                                                scheme: LINK_URL_SCHEMES,
                                            }),
                                    },
                                ],
                            },
                            {
                                name: "internalLink",
                                type: "object",
                                title: "Internal Link",
                                icon: IoLinkSharp,
                                fields: [
                                    {
                                        name: "reference",
                                        type: "reference",
                                        weak: true,
                                        options: {
                                            disableNew: true,
                                        },
                                        to: linkableReferenceTypes,
                                        validation: (Rule) => Rule.required(),
                                    },
                                ],
                            },
                        ],
                    },
                },
            ],
        },
    ],
    preview: {
        select: {
            title: "title",
            body: "body",
        },
        prepare({ title, body }) {
            if (!title) {
                return {
                    title: blocksToPlainText(body),
                }
            }

            return {
                title,
                body,
            }
        },
    },
}
