import { IoHelpCircleSharp } from "react-icons/io5"

export default {
    name: "moduleGuideList",
    title: "Guide list",
    type: "object",
    icon: IoHelpCircleSharp,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
    ],
    preview: {
        prepare() {
            return {
                title: "Module Guide List",
                subtitle: "A list of all guides",
            }
        },
    },
}
