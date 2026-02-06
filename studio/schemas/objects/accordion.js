export default {
    name: "accordion",
    title: "Accordion",
    type: "object",
    fields: [
        {
            name: "title",
            type: "string",
        },
        {
            name: "items",
            title: "Items",
            type: "array",
            of: [{ type: "accordionItem" }],
        },
    ],
    preview: {
        select: {
            items: "items",
        },
        prepare({ items }) {
            return {
                title: "Accordion",
                subtitle: items.map((item) => item.title).join(", "),
            }
        },
    },
}
