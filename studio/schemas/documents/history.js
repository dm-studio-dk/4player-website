export default {
    name: "history",
    title: "History",
    type: "document",
    fields: [
        {
            name: "year",
            type: "number",
            initialValue: new Date().getFullYear(),
        },
        {
            name: "image",
            type: "image",
        },
        {
            name: "events",
            type: "array",
            of: [{ type: "historyEvent" }],
        },
    ],
    preview: {
        select: {
            title: "year",
        },
    },
}
