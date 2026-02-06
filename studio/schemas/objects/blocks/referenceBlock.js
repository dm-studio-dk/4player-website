import { linkableReferenceTypes } from "../../../utils/fields"

export default {
    name: "referenceBlock",
    title: "Reference Block",
    type: "object",
    fields: [
        {
            type: "string",
            name: "title",
            title: "Title",
            description: "Leave blank to use the title of the page",
        },
        {
            type: "reference",
            name: "reference",
            title: "Reference",
            weak: true,
            to: linkableReferenceTypes,
            options: {
                disableNew: true,
            },
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "reference.image",
            altTitle: "reference.title",
        },
        prepare({ title, media, altTitle }) {
            return {
                title: "Reference",
                subtitle: title || altTitle,
                media,
            }
        },
    },
}
