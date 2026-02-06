import { IoCaretUpCircleSharp } from "react-icons/io5"
import { linkableReferenceTypes } from "../../../utils/fields"

export default {
    name: "moduleHeroSlider",
    title: "Hero Slider",
    type: "object",
    icon: IoCaretUpCircleSharp,
    fields: [
        {
            name: "slides",
            title: "Slides",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "title",
                            title: "Title",
                            type: "string",
                        },
                        {
                            name: "subtitle",
                            title: "Subtitle",
                            type: "text",
                            rows: 4,
                        },
                        {
                            name: "image",
                            type: "image",
                        },
                        {
                            name: "referenceType",
                            title: "Reference Type",
                            type: "string",
                            initialValue: "none",
                            options: {
                                list: [
                                    { title: "None", value: "none" },
                                    { title: "Internal", value: "internal" },
                                    { title: "External", value: "external" },
                                ],
                            },
                        },
                        {
                            name: "label",
                            type: "string",
                            title: "Reference label",
                            description:
                                "The call to action for clicking into the reference",
                            initialValue: "Se mere",
                            hidden: ({ parent }) =>
                                parent.referenceType == "none",
                        },
                        {
                            name: "reference",
                            type: "reference",
                            weak: true,
                            options: {
                                disableNew: true,
                            },
                            to: linkableReferenceTypes,
                            hidden: ({ parent }) =>
                                parent.referenceType !== "internal",
                        },
                        {
                            name: "url",
                            title: "URL",
                            type: "url",
                            hidden: ({ parent }) =>
                                parent.referenceType !== "external",
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: {
            slides: "slides",
        },
        prepare({ slides = [] }) {
            return {
                title: "Hero Slider",
                subtitle: slides.length + " slides",
            }
        },
    },
}
