export default {
    name: "imageCaption",
    title: "Image caption",
    type: "object",
    fields: [
        {
            type: "image",
            title: "Image",
            name: "image",
        },
        {
            type: "text",
            title: "Caption",
            name: "caption",
            rows: 2,
        },
    ],
    preview: {
        select: {
            caption: "caption",
            media: "image",
        },
        prepare({ caption, media }) {
            return {
                title: caption ? "Image with caption" : "Image",
                subtitle: caption || "No caption",
                media,
            }
        },
    },
}
