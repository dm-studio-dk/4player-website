// Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
const previewSecret = "j8heapkqy4rdz6kudrvsc7ywpvfhrv022abyx5zgmuwpc1xv"

// Replace `remoteUrl` with your deployed Next.js site
const devUrl = `https://spfodev.netlify.app`
const localUrl = `http://localhost:3000`
const prodUrl = `https://spfoprod.netlify.app`
// const prodUrl = `https://spfo.dk`

export default function resolveProductionUrl(doc) {
    // TODO: Also check if the doc has been published with a slug

    if (doc?.slug?.current) {
        let baseUrl

        if (window.location.hostname === "localhost") baseUrl = localUrl
        if (window.location.hostname === "spfo.sanity.studio") baseUrl = devUrl
        if (window.location.hostname === "spfocms.netlify.app")
            baseUrl = prodUrl

        const previewUrl = new URL(baseUrl)

        previewUrl.pathname = `/api/preview`
        previewUrl.searchParams.append(`secret`, previewSecret)
        previewUrl.searchParams.append(`slug`, doc.slug.current ?? `/`)

        return previewUrl.toString()
    } else {
        return ""
    }
}
