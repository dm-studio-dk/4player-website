import { metaFields, pageModules, slugField } from "../../utils/fields"

export default {
    name: "page",
    title: "Page",
    type: "document",
    groups: [
        {
            name: "general",
            title: "General",
            default: true,
        },
        {
            name: "content",
            title: "Content",
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
            group: "general",
        },
        slugField({ fieldOptions: { group: "general" } }),
        {
            name: "description",
            title: "Description",
            type: "text",
            rows: 5,
            group: "general",
        },
        {
            name: "redirectUrl",
            title: "Redirect URL",
            description: "Redirect this page to an external URL",
            type: "url",
            group: "general",
        },
        {
            name: "modules",
            title: "Modules",
            description:
                "Select and order the modules you want to show placed on the page.",
            type: "array",
            of: [
                ...pageModules,
                // {
                //   type: "reference",
                //   title: "Reusable Section",
                //   icon: IoMenuOutline,
                //   options: { disableNew: true },
                //   to: [{ type: "reusableModule" }],
                // },
            ],
            group: "content",
        },
        {
            name: "protected",
            title: "Protected",
            description:
                "If enabled, this page is only accessible by a link with a key in the URL",
            type: "boolean",
            initialValue: false,
            group: "general",
        },
        ...metaFields(),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "slug.current",
        },
        prepare: ({ title, subtitle }) => {
            const hasSpace = title.includes(" ")
            const splitText = hasSpace ? title.split(" ") : title.split("")
            const letters = hasSpace
                ? [splitText[0][0], splitText[1][0]]
                : [splitText[0], splitText[1]]

            const media = () => (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        textTransform: "uppercase",
                        padding: ".25rem",
                        borderRadius: "3px",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "500",
                    }}>
                    <span>{letters}</span>
                </div>
            )

            return {
                title,
                subtitle: `/${subtitle}`,
                media,
            }
        },
    },
}
