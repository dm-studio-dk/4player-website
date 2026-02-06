import { IoCaretUpCircleSharp } from "react-icons/io5"

export default {
    name: "moduleHero",
    title: "Hero",
    type: "object",
    icon: IoCaretUpCircleSharp,
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
            of: [
                {
                    type: "block",
                    styles: [
                        {
                            value: "normal",
                            title: "Normal",
                        },
                    ],
                },
            ],
        },
        {
            name: "image",
            type: "image",
        },
        {
            name: "imageBackground",
            type: "boolean",
            initialValue: false,
            title: "Use the image as a background",
        },
    ],
}
