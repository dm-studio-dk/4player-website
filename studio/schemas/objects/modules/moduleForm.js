import { IoMenuSharp } from "react-icons/io5";

export default {
    name: "moduleForm",
    title: "Form",
    type: "object",
    icon: IoMenuSharp,
    fields: [
        {
            name: "title",
            type: "string",
        },
        {
            name: "description",
            type: "text",
            rows: 3,
        },
        {
            name: "formType",
            title: "Select a form",
            type: "string",
            options: {
                list: [
                    // {
                    //     title: "ProTreatment Signup",
                    //     value: "protreatment",
                    // },
                    // {
                    //     title: "Membership Interest",
                    //     value: "membership",
                    // },
                    {
                        title: "General Contact",
                        value: "general",
                    },
                ],
            },
            validation: (Rule) => Rule.required(),
            hidden: true,
            initialValue: "general",
        },
        {
            name: "subject",
            title: "Subject",
            type: "string",
            description: "This determines the subject area for the email.",
        },
        {
            name: "english",
            title: "English",
            description: "Enable this to turn the form into english",
            type: "boolean",
            hidden: ({ parent }) => parent.formType !== "membership",
        },
        {
            name: "customFields",
            type: "array",
            of: [{ type: "formField" }],
            description:
                "Add custom fields you want to collect from the user. Name and Email fields already show up",
            hidden: ({ parent }) => parent.formType !== "general",
        },
    ],
};
