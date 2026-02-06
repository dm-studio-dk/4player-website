export default {
    name: "footer",
    title: "Footer",
    type: "document",

    fields: [
        {
            name: "newsletter",
            type: "object",
            options: { collapsible: true, collapsed: true },
            fields: [
                {
                    type: "string",
                    name: "title",
                },
                {
                    type: "text",
                    name: "description",
                },
            ],
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            rows: 4,
        },
        {
            name: "contact",
            title: "Contact",
            type: "object",
            options: { collapsible: true, collapsed: true },
            fields: [
                {
                    name: "address",
                    type: "text",
                    rows: 2,
                },
                {
                    name: "phone",
                    type: "string",
                },
                {
                    name: "email",
                    type: "string",
                },
            ],
        },
        {
            name: "social",
            type: "object",
            options: { collapsible: true, collapsed: true },
            fields: [
                {
                    name: "facebook",
                    type: "url",
                },
                {
                    name: "instagram",
                    type: "url",
                },
                {
                    name: "twitter",
                    type: "url",
                },
            ],
        },
        {
            name: "links",
            title: "Links",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "label",
                            type: "string",
                        },
                        {
                            name: "url",
                            title: "URL",
                            type: "url",
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        prepare: () => ({ title: "Footer Settings" }),
    },
}
