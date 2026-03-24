import { IoLinkSharp } from "react-icons/io5"

export default {
    name: "moduleTeaserGuides",
    title: "Link teaser",
    type: "object",
    icon: IoLinkSharp,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "subtitle",
            title: "Subtitle",
            type: "text",
            rows: 4,
        },
        {
            name: "hasBackground",
            title: "Show background color",
            type: "boolean",
        },
        {
            name: "guides",
            title: "Pages",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "page" }],
                    weak: true,
                    options: {
                        disableNew: true,
                    },
                },
            ],
        },
    ],
    preview: {
        select: {
            guides: "guides",
        },
        prepare({ guides = [] }) {
            return {
                title: "Link teaser",
                subtitle:
                    guides.length === 1
                        ? "1 page selected"
                        : guides.length + " pages selected",
            }
        },
    },
}
