import { IoHelpCircleSharp } from "react-icons/io5"

export default {
    name: "modulePartnerList",
    title: "Partner list",
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
                title: "Module Partner List",
                subtitle: "A list of all partners",
            }
        },
    },
}
