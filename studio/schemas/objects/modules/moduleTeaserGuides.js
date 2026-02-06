import { IoHelpCircleSharp } from "react-icons/io5"

export default {
    name: "moduleTeaserGuides",
    title: "Guides Teaser",
    type: "object",
    icon: IoHelpCircleSharp,
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
            title: "Guides",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "guide" }],
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
            mode: "mode",
            guides: "guides",
        },
        prepare({ mode, guides = [] }) {
            return {
                title: "Guides Teaser",
                subtitle:
                    mode == "latest"
                        ? "Latest 3 guides"
                        : guides.length + " guides selected",
            }
        },
    },
}
