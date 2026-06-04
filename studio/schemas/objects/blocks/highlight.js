import { IoLinkSharp, IoShareSharp } from "react-icons/io5"
import { linkableReferenceTypes } from "../../../utils/fields"
import { LINK_URL_SCHEMES } from "../../../utils/helpers"

export default {
    name: "highlight",
    title: "Highlight",
    type: "object",
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
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "Heading", value: "h3" },
                    ],
                    marks: {
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
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "body",
        },
    },
}
