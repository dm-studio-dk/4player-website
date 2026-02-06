import { IoTimerSharp } from "react-icons/io5"

export default {
    name: "moduleHistoryList",
    title: "History List",
    type: "object",
    icon: IoTimerSharp,
    fields: [
        {
            name: "mode",
            title: "Mode",
            type: "string",
            initialValue: "show-all",
            hidden: true,
            options: {
                list: [
                    { title: "Show all", value: "show-all" },
                    { title: "Selected", value: "selected" },
                ],
            },
        },
    ],
    preview: {
        prepare() {
            return {
                title: "History List",
                subtitle: "Showing all years of history",
            }
        },
    },
}
