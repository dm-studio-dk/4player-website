import { IoWalletSharp } from "react-icons/io5"

export default {
    name: "moduleBenefitsRequest",
    title: "Benefits Request Form",
    type: "document",
    icon: IoWalletSharp,
    fields: [
        {
            name: "title",
            type: "string",
        },
        {
            name: "description",
            type: "text",
            rows: 3,
        },
        {
            name: "page",
            type: "reference",
            weak: true,
            options: {
                disableNew: true,
            },
            to: [{ type: "page" }],
        },
    ],
    preview: {
        select: {
            pageTitle: "page.title",
        },
        prepare: ({ pageTitle }) => {
            return {
                title: "Benefits Request Form",
                subtitle: pageTitle
                    ? "Links to " + pageTitle
                    : "Not linking to anything",
            }
        },
    },
}
