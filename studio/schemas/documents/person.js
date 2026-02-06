import { PERSON_DEPARTMENTS } from "../../utils/const"

export default {
    name: "person",
    title: "Person",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "shortName",
            title: "Short Name",
            type: "string",
            description:
                "Typically just the last name or the nickname. Used in people lists and in opinion articles.",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "bio",
            title: "Bio",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [{ title: "Normal", value: "normal" }],
                    lists: [],
                    marks: {
                        annotations: [],
                        decorators: [],
                    },
                },
            ],
        },
        {
            name: "history",
            title: "History",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [{ title: "Normal", value: "normal" }],
                    lists: [],
                    marks: {
                        annotations: [],
                        decorators: [],
                    },
                },
            ],
        },
        // slugField({ resource: "person", source: "name" }),
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        // {
        //   name: "bio",
        //   title: "Bio",
        //   type: "text",
        // },
        {
            name: "department",
            title: "Department",
            type: "string",
            initialValue: "none",
            options: {
                list: [
                    {
                        title: "None (not a part of Spillerforeningen)",
                        value: "none",
                    },
                    ...PERSON_DEPARTMENTS,
                ],
            },
        },
        {
            name: "email",
            title: "Email",
            type: "string",
        },
        {
            name: "phone",
            title: "Phone Number",
            type: "string",
        },
        {
            name: "secondPhone",
            title: "Secondary Phone Number",
            type: "string",
        },
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "department",
            media: "image",
        },
    },
}
