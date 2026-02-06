import { format } from "date-fns"
import { getClient } from "lib/sanity.server"
import { groq } from "next-sanity"

const createEntry = (entry) => `<url>
    <loc>http://${process.env.SITE_DOMAIN_NAME}/${entry.slug.current}</loc>
    <lastmod>${format(new Date(entry._updatedAt), "y-MM-dd")}</lastmod>
    <priority>0.7</priority>
</url>`

export default async function handler(req, res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/xml")

    // Instructing the Vercel edge to cache the file
    res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600")

    const client = getClient()
    const pages = await client.fetch(
        groq`*[defined(slug) && protected != true] { slug, _updatedAt }`,
    )

    // generate sitemap here
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
        <url>
            <loc>http://${process.env.SITE_DOMAIN_NAME}/</loc>
            <lastmod>${format(new Date(), "y-MM-dd")}</lastmod>
            <priority>0.7</priority>
        </url>
        ${pages.map(createEntry).join("\n")}
      </urlset>`

    res.end(xml)
}
