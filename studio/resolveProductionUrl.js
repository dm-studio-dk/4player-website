// Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET || ""

// Replace `remoteUrl` with your deployed Next.js site
const devUrl = `https://4player-website.netlify.app`
const localUrl = `http://localhost:3000`
const prodUrl = `https://4player-website.netlify.app`

export default function resolveProductionUrl(doc) {
    if (doc?.slug?.current) {
        let baseUrl

        if (window.location.hostname === "localhost") baseUrl = localUrl
        if (window.location.hostname === "website-4player.sanity.studio")
            baseUrl = prodUrl

        const previewUrl = new URL(baseUrl)
        let slug = doc.slug.current

        // Add prefixes based on document type
        if (doc._type === 'article') slug = `nyheder/${slug}`
        if (doc._type === 'guide') slug = `guides/${slug}`
        if (slug === '/') slug = ''

        previewUrl.pathname = `/api/preview`
        previewUrl.searchParams.append(`secret`, previewSecret)
        previewUrl.searchParams.append(`slug`, slug)

        return previewUrl.toString()
    } else {
        return ""
    }
}
