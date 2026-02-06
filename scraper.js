const cheerio = require("cheerio")
const fs = require("fs")
const path = require("path")
const BASE_URL = "https://spillerforeningen.dk/nyheder?postsperpage=200&page="
// const PAGES = 220
const PAGES = 12

const links = []

async function getPage(page) {
    const response = await fetch(BASE_URL + page)
    return response.text()
}

async function getArticles(document) {
    const $ = cheerio.load(document)
    const urls = []
    $(".row.post .col-sm-4 a").each((i, el) => urls.push($(el).attr("href")))

    return urls
}

async function main() {
    for (let i = 1; i <= PAGES; i++) {
        console.log("Fetching page " + i)
        const page = await getPage(i)
        const articleUrls = await getArticles(page)

        links.push(...articleUrls)
        console.log("Got links for page " + i)
    }

    console.log("Writing to file")
    fs.writeFileSync(
        path.resolve(__dirname, "old_article_links.txt"),
        links.join("\n"),
    )
    console.log("Finished writing links to file")
}

main()
