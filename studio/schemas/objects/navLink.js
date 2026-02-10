import { IoLinkSharp } from "react-icons/io5"

export default {
    type: "object",
    name: "navLink",
    title: "Link",
    icon: IoLinkSharp,
    fields: [
        {
            name: "label",
            type: "string",
        },
        {
            name: "isButton",
            type: "boolean",
            title: "Style as Button?",
            initialValue: false,
            hidden: ({ parent }) => parent.hasSubmenu,
        },
        {
            name: "hasSubmenu",
            type: "boolean",
            title: "Has submenu?",
            initialValue: false,
        },
        {
            name: "external",
            type: "boolean",
            initialValue: false,
            hidden: ({ parent }) => parent.hasSubmenu,
        },
        {
            name: "url",
            type: "url",
            hidden: ({ parent }) => parent.hasSubmenu || !parent?.external,
        },
        {
            name: "linkTo",
            type: "reference",
            options: {
                disableNew: true,
            },
            to: [{ type: "page" }, { type: "initiative" }, { type: "theme" }],
            hidden: ({ parent }) => parent.external || parent.hasSubmenu,
        },
        {
            name: "subLinks",
            type: "array",
            of: [{ type: "navLink" }],
            hidden: ({ parent }) => !parent.hasSubmenu,
        },
    ],
}
