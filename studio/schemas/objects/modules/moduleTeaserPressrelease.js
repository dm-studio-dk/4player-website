import { IoMegaphoneSharp } from "react-icons/io5"

export default {
    name: "moduleTeaserPressrelease",
    title: "Pressrelease Teaser",
    type: "object",
    icon: IoMegaphoneSharp,
    fields: [
        {
            type: "string",
            name: "title",
            title: "Title",
        },
        {
            name: "mode",
            title: "Mode",
            type: "string",
            initialValue: "latest",
            options: {
                list: [
                    { title: "Latest Pressrelease", value: "latest" },
                    { title: "Selected Pressrelease", value: "selected" },
                ],
            },
        },
        {
            name: "pressrelease",
            title: "Selected Pressrelease",
            type: "reference",
            weak: true,
            to: [{ type: "article" }],
            hidden: ({ parent }) => parent.mode !== "selected",
            options: {
                filter: `type == 'pressrelease' && publishedAt < now()`,
                disableNew: true,
            },
        },
    ],
}
