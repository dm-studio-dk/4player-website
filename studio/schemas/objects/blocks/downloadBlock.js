export default {
    name: "downloadBlock",
    title: "Download Block",
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
            type: "text",
            rows: 3,
        },
        {
            name: "file",
            title: "File",
            type: "file",
        },
        {
            name: "label",
            title: "Label",
            type: "string",
            initialValue: "Download",
        },
        {
            name: "small",
            title: "Small",
            type: "boolean",
            hidden: ({ document }) => document._type != "guide",
            initialValue: false,
        },
    ],
}
