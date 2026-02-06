import { pageModules } from "../../utils/fields"

export default {
    name: "reusableModule",
    title: "Reusable Module",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "modules",
            title: "Modules",
            description:
                "Select and order the modules you want to show placed on the page.",
            type: "array",
            of: pageModules,
        },
    ],
    preview: {
        select: {
            title: "title",
            modules: "modules",
        },
        prepare({ modules = [], title }) {
            return {
                title,
                subtitle:
                    modules.length > 0
                        ? modules.length + " modules"
                        : "No modules",
            }
        },
    },
}
