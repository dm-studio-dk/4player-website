import { IoColorFilterOutline } from "react-icons/io5"
import { linkableReferenceTypes } from "../../../utils/fields"

export default {
    name: "moduleHighlightNumbers",
    title: "Highlight Numbers",
    type: "object",
    icon: IoColorFilterOutline,
    fields: [
        {
            name: "items",
            title: "Items",
            type: "array",
            preview: {
                select: {
                    title: "number",
                    subtitle: "title",
                },
            },
            of: [
                {
                    type: "object",
                    name: "numberHighlight",
                    title: "Number Highlight",
                    fields: [
                        {
                            name: "number",
                            title: "Number",
                            type: "number",
                        },
                        {
                            name: "title",
                            title: "Title",
                            type: "string",
                        },
                        {
                            name: "text",
                            title: "Text",
                            type: "text",
                            rows: 2,
                        },
                        {
                            name: "reference",
                            type: "reference",
                            weak: true,
                            options: {
                                disableNew: true,
                            },
                            to: linkableReferenceTypes,
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: {
            items: "items",
        },
        prepare({ items = [] }) {
            return {
                title: "Highlight Numbers",
                subtitle: items.length + " items",
            }
        },
    },
}
