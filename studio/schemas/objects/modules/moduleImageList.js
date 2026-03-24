import {
    IoImageSharp,
    IoLinkSharp,
    IoMenuSharp,
    IoShareSharp,
} from "react-icons/io5"
import { linkableReferenceTypes } from "./../../../utils/fields"

export default {
    name: "moduleImageList",
    title: "Image List",
    type: "object",
    icon: IoMenuSharp,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "items",
            title: "Items",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "imageListItem",
                    icon: IoImageSharp,
                    fields: [
                        {
                            name: "image",
                            type: "image",
                        },
                        {
                            name: "title",
                            type: "string",
                        },
                        {
                            type: "array",
                            name: "body",
                            of: [
                                {
                                    type: "block",
                                    styles: [
                                        { title: "Normal", value: "normal" },
                                    ],
                                    lists: [],
                                    marks: {
                                        annotations: [
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
                                        ],
                                        decorators: [],
                                    },
                                },
                            ],
                        },
                        {
                            name: "readMore",
                            title: "Read more button",
                            description:
                                "Add an entry to show a button after the body text. Leave empty to hide.",
                            type: "array",
                            of: [{ type: "ctaLink" }],
                            validation: (Rule) => Rule.max(1),
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: {
            title: "title",
            items: "items",
        },
        prepare({ title, items }) {
            return {
                title: title || "Image List",
                subtitle: `${items?.length ? items.length : 0} items`,
            };
        },
    },
};
