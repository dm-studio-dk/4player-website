import { linkableReferenceTypes } from "./../../utils/fields"

export default {
    name: "redirect",
    title: "Redirect",
    type: "document",
    fields: [
        {
            name: "from",
            description:
                "Example: /nyheder/2022/77-ni-minutter-med-jeppe-groenning-om-karriereskifteseminar/",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "to",
            type: "reference",
            to: linkableReferenceTypes,
        },
    ],
}
