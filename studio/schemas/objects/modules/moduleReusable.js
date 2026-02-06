import { IoMenuOutline } from "react-icons/io5"

export default {
    name: "moduleReusable",
    title: "Reusable Module",
    type: "object",
    icon: IoMenuOutline,
    fields: [
        {
            name: "module",
            title: "Module",
            type: "reference",
            to: [{ type: "reusableModule" }],
        },
    ],
    preview: {
        select: {
            title: "module.title",
        },
        prepare({ title }) {
            return {
                title,
                subtitle: "Reusable module",
            }
        },
    },
}
