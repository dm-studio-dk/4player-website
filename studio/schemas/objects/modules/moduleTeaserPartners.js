import { IoLinkSharp } from "react-icons/io5"

export default {
    name: "moduleTeaserPartners",
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
            name: "partners",
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
            partners: "partners",
        },
        prepare({ partners = [] }) {
            return {
                title: "Link teaser",
                subtitle:
                    partners.length === 1
                        ? "1 page selected"
                        : partners.length + " pages selected",
            }
        },
    },
}
