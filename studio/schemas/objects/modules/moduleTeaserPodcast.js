import { IoMusicalNoteSharp } from "react-icons/io5"

export default {
    name: "moduleTeaserPodcast",
    title: "Podcast Teaser",
    type: "object",
    icon: IoMusicalNoteSharp,
    fields: [
        {
            type: "string",
            name: "title",
            title: "Title",
        },
        {
            name: "mode",
            title: "Mode",
            type: "string",
            initialValue: "latest",
            options: {
                list: [
                    { title: "Latest Episode", value: "latest" },
                    { title: "Selected Episodes", value: "selected" },
                ],
            },
        },
        {
            name: "episodes",
            title: "Selected Episode",
            type: "reference",
            weak: true,
            to: [{ type: "article" }],
            hidden: ({ parent }) => parent.mode !== "selected",
            options: {
                filter: `type == 'podcast' && publishedAt < now()`,
                disableNew: true,
            },
        },
    ],
}
