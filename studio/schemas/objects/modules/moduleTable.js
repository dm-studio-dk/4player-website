import { IoAppsSharp } from "react-icons/io5"

export default {
    name: "moduleTable",
    title: "Table",
    type: "object",
    icon: IoAppsSharp,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "notes",
            title: "Notes",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [{ title: "Normal", value: "normal" }],
                },
            ],
        },
        {
            name: "columns",
            title: "Columns",
            type: "array",
            validation: (Rule) => Rule.required(),
            of: [
                {
                    type: "object",
                    name: "column",
                    fields: [
                        {
                            name: "title",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "rows",
                            type: "array",
                            of: [
                                {
                                    type: "string",
                                    name: "content",
                                    validation: (Rule) => Rule.required(),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
