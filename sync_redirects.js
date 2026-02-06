require("dotenv").config()
const fs = require("fs")
const { createClient, groq } = require("next-sanity")
const path = require("path")
const slugify = require("slugify")

const client = createClient({
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: "v2021-10-21",
})

async function createRedirectsForMissingArticles(missingPairs) {
    const [newsPage] = await client.fetch(
        groq`*[_type == 'page' && slug.current == 'nyheder'] { _id }`,
    )
    const transaction = client.transaction()

    for (let pair of missingPairs) {
        const doc = {
            _type: "redirect",
            _id: slugify(
                pair.originalLink
                    .replaceAll("/", "-")
                    .slice(1, pair.originalLink.length - 1),
                { lower: true, trim: true, strict: true },
            ).slice(0, 128),
            from: pair.originalLink,
            to: {
                _type: "reference",
                _ref: newsPage._id,
            },
        }

        transaction.createIfNotExists(doc)
    }

    const response = await transaction.commit()
    console.log(response)
}

async function main() {
    const rawContents = fs.readFileSync(
        path.resolve(__dirname, "redirects.json"),
    )
    const { linkPairs, missingPairs } = JSON.parse(rawContents)

    try {
        // await attachLinkPairsToArticles(linkPairs)
        await createRedirectsForMissingArticles(missingPairs)
    } catch (e) {
        console.log("Error", e)
    }

    console.log(linkPairs.length, missingPairs.length)
}

main()
