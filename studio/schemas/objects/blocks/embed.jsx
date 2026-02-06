function Preview({ value }) {
    const { code } = value

    if (!code) return <div>Code pasted is not visible or invalid</div>

    try {
        const iframe = new DOMParser().parseFromString(code, "text/html")

        if (!iframe.body.firstChild)
            return <div>Code pasted is not visible or invalid</div>

        const width = iframe.body.firstChild.width || 1920
        const height = iframe.body.firstChild.height || 1080
        const ratio = (height / width) * 100
        return (
            <div
                style={{
                    width: "100%",
                    height: 0,
                    paddingBottom: `${ratio}%`,
                    overflow: "hidden",
                }}
                dangerouslySetInnerHTML={{ __html: code }}
            />
        )
    } catch {
        return <div>Code pasted is not visible or invalid</div>
    }
}

export default {
    name: "embed",
    title: "Embed",
    type: "object",
    fields: [
        {
            name: "code",
            type: "text",
            title: "Code",
            description:
                "Paste in your embed code. It needs to be a valid HTML Iframe.",
        },
    ],
    preview: {
        select: {
            code: "code",
        },
        component: Preview,
    },
}
