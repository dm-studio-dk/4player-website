import { IoLinkSharp } from "react-icons/io5"
import { linkableReferenceTypes } from "../../utils/fields"

export default {
    name: "ctaLink",
    title: "CTA link",
    type: "object",
    icon: IoLinkSharp,
    fields: [
        {
            name: "linkType",
            title: "Link type",
            type: "string",
            initialValue: "internal",
            options: {
                layout: "radio",
                list: [
                    { value: "internal", title: "Internal" },
                    { value: "external", title: "External" },
                ],
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: "buttonLabel",
            title: "Button label",
            type: "string",
            initialValue: "Læs mere",
        },
        {
            name: "reference",
            title: "Internal page",
            type: "reference",
            weak: true,
            options: {
                disableNew: true,
            },
            hidden: ({ parent }) => parent?.linkType !== "internal",
            to: linkableReferenceTypes,
            validation: (Rule) =>
                Rule.custom((ref, context) => {
                    const { parent } = context
                    if (parent?.linkType === "internal" && !ref) {
                        return "Choose an internal page"
                    }
                    return true
                }),
        },
        {
            name: "url",
            title: "URL",
            type: "url",
            hidden: ({ parent }) => parent?.linkType !== "external",
            validation: (Rule) =>
                Rule.custom((url, context) => {
                    const { parent } = context
                    if (parent?.linkType === "external" && !url) {
                        return "Enter a URL"
                    }
                    return true
                }),
        },
    ],
    preview: {
        select: {
            linkType: "linkType",
            buttonLabel: "buttonLabel",
            url: "url",
        },
        prepare({ linkType, buttonLabel, url }) {
            return {
                title: buttonLabel || "CTA",
                subtitle:
                    linkType === "external"
                        ? url || "External"
                        : "Internal",
            }
        },
    },
}
