export default {
    name: "header",
    title: "Header",
    type: "document",
    fields: [
        {
            name: "navigation",
            title: "Navigation",
            type: "array",
            of: [{ type: "navLink" }],
        },
    ],
    preview: {
        prepare: () => ({ title: "Header Settings" }),
    },
}
