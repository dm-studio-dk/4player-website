export default {
    name: "siteSettings",
    title: "Site settings",
    type: "document",
    // __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
    groups: [
        {
            name: "general",
            title: "General",
            default: true,
        },
        {
            name: "advanced",
            title: "Advanced",
        },
    ],
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            group: "general",
        },
        {
            name: "homepage",
            title: "Homepage",
            type: "reference",
            to: [{ type: "page" }],
            options: {
                disableNew: true,
            },
            group: "general",
        },
        {
            name: "socialShareImage",
            title: "Social Share Image",
            type: "image",
            group: "general",
        },
        {
            name: "benefitsPage",
            type: "reference",
            to: [{ type: "page" }],
            group: "general",
            options: {
                disableNew: true,
            },
        },
        // {
        //     name: "redirects",
        //     title: "Redirects",
        //     type: "array",
        //     of: [
        //         {
        //             type: "object",
        //             fields: [
        //                 {
        //                     name: "from",
        //                     title: "From",
        //                     type: "string",
        //                 },
        //                 {
        //                     name: "to",
        //                     title: "To",
        //                     type: "reference",
        //                     weak: true,
        //                     to: [
        //                         { type: "article" },
        //                         { type: "page" },
        //                         { type: "guide" },
        //                         { type: "initiative" },
        //                         { type: "theme" },
        //                     ],
        //                 },
        //             ],
        //         },
        //     ],
        // },
    ],
    preview: {
        prepare: () => ({ title: "Site Settings" }),
    },
}
