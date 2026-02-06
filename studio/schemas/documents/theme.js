import { slugField } from "../../utils/fields"

export default {
    name: "theme",
    title: "Theme",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "subtitle",
            title: "Subtitle",
            type: "array",
            of: [{ type: "block" }],
        },
        slugField({ resource: "theme" }),
    ],
}
