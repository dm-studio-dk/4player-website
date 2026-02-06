import { IoNewspaperSharp } from "react-icons/io5"

export default {
    name: "moduleArticleList",
    title: "Article List",
    type: "object",
    icon: IoNewspaperSharp,
    fields: [
        {
            name: "title",
            type: "string",
        },
        {
            name: "articles",
            type: "array",
            of: [
                {
                    type: "reference",
                    weak: true,
                    options: { disableNew: true },
                    to: [{ type: "article" }],
                },
            ],
            validation: (Rule) => [
                Rule.required()
                    .min(1)
                    .error("Required field with at least 1 entry."),
                Rule.unique(),
            ],
        },
    ],
}
