import { moreArticlesQuery } from "../../../lib/requestQuery"
import { getClient } from "../../../lib/sanity.server"

export default async function (req, res) {
    const {
        query: { page, size = 10 },
        method,
    } = req

    if (method != "GET" || !page) return res.status(400)

    const client = getClient()
    const articles = await client.fetch(
        moreArticlesQuery(page * size - size, page * size),
    )

    res.json(articles)
}
