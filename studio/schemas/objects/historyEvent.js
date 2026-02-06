export default {
    name: "historyEvent",
    title: "History event",
    type: "object",
    fields: [
        {
            name: "title",
            type: "string",
        },
        {
            name: "body",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "Heading", value: "h3" },
                    ],
                },
            ],
        },
    ],
}
