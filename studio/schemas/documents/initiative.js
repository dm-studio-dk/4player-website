import { metaFields, pageModules, slugField } from "../../utils/fields"

const initiativeModules = ["modulePromo", "moduleText"]

export default {
    name: "initiative",
    title: "Initiative",
    type: "document",
    groups: [
        {
            name: "content",
            title: "Content",
            default: true,
        },
        {
            name: "seo",
            title: "SEO",
        },
    ],
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            group: "content",
        },
        slugField({
            resource: "initiativ",
            fieldOptions: { group: "content" },
        }),
        {
            name: "description",
            type: "text",
            group: "content",
            rows: 4,
        },
        {
            name: "about",
            type: "object",
            group: "content",
            fields: [
                {
                    type: "string",
                    name: "headline",
                },
                {
                    type: "text",
                    name: "body",
                    rows: 8,
                },
            ],
        },
        {
            name: "image",
            type: "image",
            group: "content",
        },
        {
            name: "projects",
            type: "array",
            group: "content",
            of: [
                {
                    type: "object",
                    name: "initiativeProject",
                    fields: [
                        {
                            name: "title",
                            type: "string",
                            validaton: (Rule) => Rule.required(),
                        },
                        {
                            name: "description",
                            type: "text",
                            rows: 3,
                            validaton: (Rule) => Rule.required(),
                        },
                        {
                            name: "image",
                            type: "image",
                            validaton: (Rule) => Rule.required(),
                        },
                        {
                            name: "linkType",
                            type: "string",
                            options: {
                                list: [
                                    { value: "none", title: "None" },
                                    { value: "internal", title: "Internal" },
                                    { value: "external", title: "External" },
                                ],
                            },
                        },
                        {
                            name: "reference",
                            type: "reference",
                            weak: true,
                            options: { disableNew: true },
                            to: [{ type: "page" }],
                            hidden: ({ parent }) =>
                                parent.linkType !== "internal",
                        },
                        {
                            name: "url",
                            type: "url",
                            title: "URL",
                            hidden: ({ parent }) =>
                                parent.linkType !== "external",
                        },
                    ],
                },
            ],
        },
        {
            name: "modules",
            title: "Modules",
            description:
                "Select and order the modules you want to show placed on the page.",
            type: "array",
            of: pageModules.filter((module) =>
                initiativeModules.includes(module.type),
            ),
            group: "content",
        },
        ...metaFields(),
    ],
}
