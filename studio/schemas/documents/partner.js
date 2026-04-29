import {
    IoAlertCircleSharp,
    IoBrowsersSharp,
    IoDownloadSharp,
    IoImageSharp,
    IoLinkSharp,
    IoListSharp,
    IoShareSharp,
} from "react-icons/io5"
import {
    linkableReferenceTypes,
    metaFields,
    slugField,
} from "../../utils/fields"

export default {
    name: "partner",
    title: "Partner",
    type: "document",
    groups: [
        {
            name: "content",
            title: "Content",
            default: true,
        },
        {
            name: "seo",
            title: "SEO",
        },
    ],
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            group: "content",
        },
        slugField({ resource: "partner", fieldOptions: { group: "content" } }),
        {
            name: "subtitle",
            title: "Subtitle",
            type: "text",
            rows: 3,
            group: "content",
        },
        {
            name: "body",
            title: "Body",
            type: "array",
            group: "content",
            of: [
                { type: "imageCaption", icon: IoImageSharp },
                { type: "accordion", icon: IoListSharp },
                { type: "downloadBlock", icon: IoDownloadSharp },
                { type: "highlight", icon: IoAlertCircleSharp },
                { type: "referenceBlock", icon: IoLinkSharp },
                { type: "embed", icon: IoBrowsersSharp },
                { type: "modulePersonList" },
                { type: "moduleTable" },
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
        // {
        //     name: "references",
        //     title: "References",
        //     type: "array",
        //     weak: true,
        //     group: 'content',
        //     options: {
        //         disableNew: true,
        //     },
        //     of: [{ type: "article" }],
        // },
        {
            name: "contact",
            title: "Contact",
            type: "object",
            group: "content",
            fields: [
                {
                    name: "person",
                    title: "Person",
                    type: "reference",
                    weak: true,
                    to: [{ type: "person" }],
                    options: {
                        disableNew: true,
                    },
                },
                {
                    name: "teaser",
                    title: "Teaser",
                    type: "text",
                    rows: 3,
                },
            ],
        },
        ...metaFields(),
    ],
}
