import { IoStarSharp } from "react-icons/io5"

export default {
    name: "moduleTeaserInitiatives",
    title: "Initiatives Teaser",
    type: "object",
    icon: IoStarSharp,
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
            name: "initiatives",
            title: "Initiatives",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "initiative" }],
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
            initiatives: "initiatives",
        },
        prepare({ mode, initiatives }) {
            return {
                title: "Initatives Teaser",
                subtitle:
                    mode == "latest"
                        ? "Latest 3 initiatives"
                        : initiatives.length + " initiatives selected",
            }
        },
    },
}
