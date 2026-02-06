import { IoPersonSharp } from "react-icons/io5"

export default {
    name: "moduleContactPerson",
    title: "Contact Person",
    type: "object",
    icon: IoPersonSharp,
    fields: [
        {
            name: "person",
            type: "reference",
            weak: true,
            options: { disableNew: true },
            to: [
                {
                    type: "person",
                },
            ],
        },
        {
            name: "teaser",
            title: "Teaser",
            type: "text",
            rows: 3,
        },
    ],
    preview: {
        select: {
            title: "person.name",
            subtitle: "teaser",
            media: "person.image",
        },
    },
}
