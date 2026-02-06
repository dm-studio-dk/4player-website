export default {
    name: "accordionItem",
    title: "Accordion item",
    type: "object",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "body",
            title: "Body",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [{ title: "Normal", value: "normal" }],
                },
            ],
        },
    ],
}
