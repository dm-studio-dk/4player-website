export default {
    name: "blockQuote",
    title: "Block quote",
    type: "object",
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
            name: "small",
            title: "Small",
            type: "boolean",
            initalValue: true,
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
