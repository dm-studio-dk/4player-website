import { moreEpisodesQuery } from "../../../lib/requestQuery"
import { getClient } from "../../../lib/sanity.server"

export default async function (req, res) {
    const {
        query: { page, size = 10 },
        method,
    } = req

    if (method != "GET" || !page) return res.status(400)

    const client = getClient()

    try {
        const episodes = await client.fetch(
            moreEpisodesQuery(page * size - size, page * size),
        )

        res.json(episodes)
    } catch (e) {
        console.log(e)
        res.status(400)
    }
}
