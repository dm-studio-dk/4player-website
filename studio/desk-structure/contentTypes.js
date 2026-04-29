import {
    IoPersonSharp,
    IoNewspaperSharp,
    IoPricetagSharp,
    IoHelpCircleSharp,
    IoStarSharp,
    IoTimerSharp,
} from "react-icons/io5"

const contentTypes = [
    {
        name: "person",
        icon: IoPersonSharp,
    },
    {
        name: "theme",
        icon: IoPricetagSharp,
    },
    {
        name: "article",
        previewable: true,
        icon: IoNewspaperSharp,
    },
    {
        name: "partner",
        previewable: true,
        icon: IoHelpCircleSharp,
    },
    {
        name: "initiative",
        previewable: true,
        icon: IoStarSharp,
    },
    {
        name: "history",
        icon: IoTimerSharp,
    },
]

export function getContentConfig(type) {
    return contentTypes.find((content) => content.name == type)
}

export default contentTypes
