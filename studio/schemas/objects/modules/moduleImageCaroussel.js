import { IoTrainSharp } from "react-icons/io5"

export default {
    name: "moduleImageCaroussel",
    title: "Image Caroussel",
    type: "object",
    icon: IoTrainSharp,
    fields: [
        {
            name: "images",
            type: "array",
            of: [{ type: "image" }],
        },
    ],
    preview: {
        select: { images: "images" },
        prepare({ images = [] }) {
            return {
                title: "Image Caroussel",
                subtitle: images.length + " images",
            }
        },
    },
}
