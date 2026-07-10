import { IoStarSharp } from "react-icons/io5"
import { linkableReferenceTypes } from "../../../utils/fields"
import { LINK_URL_SCHEMES } from "../../../utils/helpers"

export default {
    name: "modulePromo",
    title: "Promo",
    type: "object",
    icon: IoStarSharp,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            description: "Optional when the image is used as the heading.",
        },
        {
            name: "content",
            title: "Content",
            type: "array",
            validation: (Rule) => Rule.required(),
            of: [
                {
                    type: "block",
                    styles: [{ title: "Normal", value: "normal" }],
                },
            ],
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "linkType",
            title: "Link Type",
            description: "If there is no link, the button will not be shown",
            type: "string",
            initialValue: "none",
            options: {
                layout: "dropdown",
                list: [
                    { value: "none", title: "No Link" },
                    { value: "internal", title: "Internal" },
                    { value: "external", title: "External" },
                ],
            },
        },
        {
            name: "buttonLabel",
            title: "Button Text",
            type: "string",
            hidden: ({ parent }) => parent.linkType == "none",
        },
        {
            name: "reference",
            title: "Reference",
            type: "reference",
            weak: true,
            options: {
                disableNew: true,
            },
            hidden: ({ parent }) => parent.linkType !== "internal",
            to: linkableReferenceTypes,
        },
        {
            name: "url",
            title: "URL",
            type: "url",
            hidden: ({ parent }) => parent.linkType !== "external",
            validation: (Rule) => Rule.uri({ scheme: LINK_URL_SCHEMES }),
        },
        {
            name: "imageBackground",
            title: "Use image as background?",
            type: "boolean",
            initialValue: false,
        },
        {
            name: "orientation",
            title: "Orientation",
            type: "string",
            initialValue: "left",
            options: {
                list: [
                    { title: "Left", value: "left" },
                    { title: "Right", value: "right" },
                ],
                layout: "radio",
            },
            hidden: ({ parent }) => parent.imageBackground,
        },
    ],
}
