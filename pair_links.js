require("dotenv").config()
const fs = require("fs")
const { createClient, groq } = require("next-sanity")
const path = require("path")
const { default: Trigram } = require("trigram-search")
console.log(Trigram)

const prefixes = ["presse", "nyheder"]

async function fetchLatestArticles() {
    const client = createClient({
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        apiVersion: "v2021-10-21",
    })
    const articles = await client.fetch(
        groq`*[_type == 'article'] | order(publishedAt desc) { _id, title, publishedAt, slug }`,
    )
    // console.log(articles.map((article) => article.title))

    return articles.map((article) => ({
        ...article,
        slug: { current: article.slug.current.replace("artikel", "") },
    }))
}

async function loadLinks() {
    const contents = fs.readFileSync(
        path.resolve(__dirname, "old_article_links.txt"),
        { encoding: "utf-8" },
    )
    const list = contents.split("\n")

    return list.map((link) => {
        const originalLink = link.replace("https://spillerforeningen.dk", "")
        let cleanLink = link

        for (let i = 0; i < prefixes.length; i++) {
            cleanLink = cleanLink.replace(
                "https://spillerforeningen.dk/" + prefixes[i],
                "",
            )
        }

        return {
            originalLink,
            cleanLink: cleanLink.replace(/^\/20\d\d/, ""),
        }
    })
}

async function main() {
    const oldLinks = await loadLinks()
    const newArticles = await fetchLatestArticles()

    const usedLinks = []
    const searcher = new Trigram(
        oldLinks.map((link, id) => ({ id, title: link.originalLink })),
    )
    const linkPairs = newArticles.map((article) => {
        const { value } = searcher.find(article.slug.current)[0]
        const match = oldLinks.find((link) => link.originalLink == value.title)

        usedLinks.push(match)

        return {
            _id: article._id,
            slug: article.slug.current,
            publishedAt: article.publishedAt,
            match: oldLinks.find((link) => link.originalLink == value.title),
        }
    })
    const missingPairs = oldLinks.filter(
        (link) =>
            !usedLinks.some(
                (usedLink) => usedLink.originalLink == link.originalLink,
            ),
    )
    const fileOutput = JSON.stringify(
        {
            linkPairs,
            missingPairs,
        },
        null,
        4,
    )

    fs.writeFileSync(path.resolve(__dirname, "redirects.json"), fileOutput)
}

main()
