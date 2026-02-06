import { IoNewspaperSharp } from "react-icons/io5"

export default {
    name: "moduleTeaserArticles",
    title: "Article Teaser",
    type: "object",
    icon: IoNewspaperSharp,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "mode",
            title: "Mode",
            type: "string",
            initialValue: "latest",
            options: {
                list: [
                    { title: "Latest 3", value: "latest" },
                    { title: "Selected", value: "selected" },
                ],
            },
        },
        {
            name: "articles",
            title: "Articles",
            type: "array",
            hidden: ({ parent }) => parent.mode !== "selected",
            validation: (Rule) => Rule.min(3).max(3),
            of: [
                {
                    type: "reference",
                    to: [{ type: "article" }],
                    weak: true,
                    options: {
                        disableNew: true,
                    },
                },
            ],
        },
    ],
    prepare({ mode, guides }) {
        return {
            title: "Articles Teaser",
            subtitle:
                mode == "latest"
                    ? "Latest 3 articles"
                    : guides.length + " articles selected",
        }
    },
}
