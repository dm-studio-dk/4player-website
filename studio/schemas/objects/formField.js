export default {
    name: "formField",
    title: "Form field",
    type: "object",
    fields: [
        {
            name: "name",
            title: "Name",
            description: "Only characters from A to Z are permitted.",
            type: "string",
        },
        {
            name: "label",
            title: "Label",
            description:
                "The label is what is shown in the email you receive after a user has submitted as well as what the user sees on the website.",
            type: "string",
        },
        {
            name: "required",
            title: "Required field",
            description:
                "Enable this to ensure the field is always present when submitting",
            type: "boolean",
            initialValue: true,
        },
    ],
    preview: {
        select: {
            title: "label",
            subtitle: "name",
        },
    },
}
