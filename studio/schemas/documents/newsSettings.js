export default {
    name: "newsSettings",
    title: "News Settings",
    type: "document",
    fields: [
        {
            name: "featuredArticle",
            title: "Featured Article",
            type: "reference",
            weak: true,
            to: [{ type: "article" }],
            options: {
                disableNew: true,
            },
        },
        {
            name: "featuredTheme",
            title: "Featured Theme",
            type: "reference",
            weak: true,
            to: [{ type: "theme" }],
            options: {
                disableNew: true,
            },
        },
    ],
    preview: {
        prepare: () => ({ title: "News Settings" }),
    },
}
