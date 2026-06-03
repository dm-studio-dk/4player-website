import React from "react"
import { IoCheckboxSharp, IoLinkSharp, IoShareSharp } from "react-icons/io5"
import { linkableReferenceTypes } from "../../../utils/fields"
import { blocksToPlainText, LINK_URL_SCHEMES } from "../../../utils/helpers"

export default {
    name: "factbox",
    title: "Factbox",
    type: "object",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "body",
            title: "Body",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [{ title: "Normal", value: "normal" }],
                    marks: {
                        decorators: [],
                        annotations: [
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
                                            Rule.uri({
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
                                    },
                                ],
                            },
                        ],
                    },
                },
            ],
        },
        {
            name: "source",
            title: "Source",
            type: "string",
        },
        {
            name: "sourceUrl",
            title: "URL",
            type: "url",
        },
        {
            name: "image",
            type: "image",
        },
    ],
    preview: {
        select: {
            title: "title",
            body: "body",
        },
        prepare({ title, body }) {
            return {
                title,
                subtitle: blocksToPlainText(body),
                media: () => <IoCheckboxSharp />,
            }
        },
    },
}
