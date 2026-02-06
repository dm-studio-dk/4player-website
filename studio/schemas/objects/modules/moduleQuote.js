import { IoChatboxEllipsesSharp } from "react-icons/io5"

export default {
    name: "moduleQuote",
    title: "Quote",
    type: "object",
    icon: IoChatboxEllipsesSharp,
    fields: [
        {
            name: "quote",
            title: "Quote",
            type: "text",
            rows: 5,
        },
        {
            name: "source",
            title: "Source",
            type: "string",
        },
        {
            name: "hasBackground",
            title: "Show background",
            type: "boolean",
            initalValue: false,
        },
    ],
    preview: {
        select: {
            title: "quote",
            subtitle: "source",
        },
    },
}
