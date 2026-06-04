import {
    IoBrowsersSharp,
    IoChatboxEllipsesSharp,
    IoCheckboxSharp,
    IoImageSharp,
    IoLinkSharp,
    IoShareSharp,
} from "react-icons/io5"
import PodcastEpisodeSelect from "../../components/PodcastEpisodeSelect"
import {
    linkableReferenceTypes,
    metaFields,
    slugField,
} from "../../utils/fields"
import {
    capitalize,
    LINK_URL_SCHEMES,
    randomIntFromInterval,
} from "../../utils/helpers"

export default {
    name: "article",
    title: "Article",
    type: "document",
    groups: [
        {
            name: "general",
            title: "General",
        },
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
            name: "style",
            type: "object",
            hidden: true,
            fields: [
                {
                    name: "altSeed",
                    type: "number",
                    initialValue: () => randomIntFromInterval(0, 5),
                },
                {
                    name: "colorSeed",
                    type: "number",
                    initialValue: () => randomIntFromInterval(0, 4),
                },
                {
                    name: "stripeSeed",
                    type: "number",
                    initialValue: () => randomIntFromInterval(0, 4),
                },
            ],
        },
        {
            name: "type",
            title: "Type",
            type: "string",
            initialValue: "standard",
            group: "general",
            options: {
                layout: "radio",
                direction: "horizontal",
                list: [
                    { title: "Standard", value: "standard" },
                    { title: "Podcast", value: "podcast" },
                    { title: "Feature", value: "feature" },
                    { title: "Opinion", value: "opinion" },
                    { title: "Pressrelease", value: "pressrelease" },
                ],
            },
        },
        {
            name: "podcast",
            title: "Podcast Settings",
            type: "object",
            hidden: ({ document }) => document.type != "podcast",
            options: {
                collapsible: true,
            },
            group: "general",
            fields: [
                {
                    name: "episode",
                    title: "Episode",
                    type: "string",
                    components: {
                        input: PodcastEpisodeSelect,
                    },
                },
                {
                    name: "number",
                    title: "Number",
                    type: "number",
                    initialValue: 0,
                },
                {
                    name: "apple",
                    title: "Apple Podcast",
                    type: "url",
                },
                {
                    name: "spotify",
                    title: "Spotify",
                    type: "url",
                },
                {
                    name: "soundcloud",
                    title: "Soundcloud",
                    type: "url",
                },
            ],
        },
        {
            name: "shortName",
            title: "Short name",
            description: "Shows up in opinion articles",
            type: "string",
            group: "general",
            hidden: ({ document }) => document.type !== "opinion",
        },
        {
            name: "contact",
            title: "Contact",
            type: "reference",
            weak: true,
            group: "general",
            to: [{ type: "person" }],
            hidden: ({ document }) => document.type !== "pressrelease",
        },
        {
            name: "publishedAt",
            title: "Published at",
            type: "datetime",
            group: "general",
            initialValue: () => new Date().toISOString(),
        },
        {
            name: "author",
            title: "Author",
            type: "reference",
            weak: true,
            group: "general",
            to: [{ type: "person" }],
            validation: (Rule) => Rule.required(),
        },
        {
            name: "relatedArticles",
            title: "Related articles",
            type: "array",
            group: "general",
            validation: (Rule) => Rule.max(3),
            of: [
                {
                    type: "reference",
                    weak: true,
                    to: [{ type: "article" }],
                    options: {
                        disableNew: true,
                    },
                },
            ],
        },
        {
            name: "theme",
            title: "Theme",
            type: "reference",
            weak: true,
            group: "general",
            to: [{ type: "theme" }],
        },
        {
            name: "initiative",
            title: "Initiative",
            description:
                "If an initiative is chosen, this article will show up on the iniative's page",
            type: "reference",
            weak: true,
            group: "general",
            to: [{ type: "initiative" }],
            options: {
                disableNew: true,
            },
        },
        {
            name: "title",
            title: "Title",
            type: "string",
            group: "content",
            validation: (Rule) => Rule.required(),
        },
        slugField({ resource: "artikel", fieldOptions: { group: "content" } }),
        {
            name: "subtitle",
            title: "Subtitle",
            type: "text",
            rows: 3,
            group: "content",
            validation: (Rule) => Rule.required(),
        },

        {
            name: "image",
            title: "Image",
            type: "image",
            group: "content",
        },
        {
            name: "imageCaption",
            title: "Image Caption",
            type: "string",
            description: "Use this field for photo credits or other captions",
            group: "content",
        },
        {
            name: "body",
            title: "Body",
            type: "array",
            group: "content",
            of: [
                // todo: add contentReference
                // todo: add embed
                { type: "imageCaption", icon: IoImageSharp },
                { type: "blockQuote", icon: IoChatboxEllipsesSharp },
                { type: "referenceBlock", icon: IoLinkSharp },
                { type: "embed", icon: IoBrowsersSharp },
                { type: "factbox", icon: IoCheckboxSharp },
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "Heading", value: "h3" },
                        // { title: "Quote", value: "blockquote" },
                    ],
                    marks: {
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Link",
                                icon: IoShareSharp,
                                fields: [
                                    {
                                        name: "url",
                                        type: "url",
                                        validation: (Rule) =>
                                            Rule.uri({
                                                scheme: LINK_URL_SCHEMES,
                                            }),
                                    },
                                ],
                            },
                            {
                                name: "internalLink",
                                type: "object",
                                title: "Internal Link",
                                icon: IoLinkSharp,
                                fields: [
                                    {
                                        name: "reference",
                                        type: "reference",
                                        weak: true,
                                        options: {
                                            disableNew: true,
                                        },
                                        to: linkableReferenceTypes,
                                    },
                                ],
                            },
                        ],
                    },
                },
            ],
        },
        ...metaFields(),
        {
            name: "redirect",
            title: "Redirect URL",
            description:
                "Visiting this url will redirect the visitor to this article",
            type: "string",
            group: "seo",
        },
    ],

    preview: {
        select: {
            title: "title",
            subtitle: "author.name",
            media: "image",
            articleType: "type",
            episodeNumber: "podcast.number",
        },
        prepare({ title, subtitle, media, articleType, episodeNumber }) {
            const type = capitalize(articleType)
            const byline = subtitle ? `Written by ${subtitle}` : "No author"
            const titlePrefix =
                articleType == "podcast" ? `${episodeNumber}: ` : ""

            return {
                title: titlePrefix + title,
                subtitle: type + " — " + byline,
                media,
            }
        },
    },
}
