import templates from "../config/templates"

function usePage({ data, preview }) {
    const TemplateComponent = templates[data.page._type] || templates["page"]

    return {
        TemplateComponent,
        page: data.page,
        preview,
    }
}

export default usePage
