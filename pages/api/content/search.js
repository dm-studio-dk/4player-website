import { searchQuery } from "../../../lib/requestQuery"
import { getClient } from "../../../lib/sanity.server"

export default async function (req, res) {
    const {
        query: { page, size = 10, term = "" },
        method,
    } = req

    if (method != "GET" || term.length < 2) return res.status(400)

    const client = getClient()

    try {
        const results = await client.fetch(
            searchQuery(
                page ? page * size - size : undefined,
                page ? page * size : undefined,
            ),
            { term },
        )

        res.json(results)
    } catch (e) {
        console.log(e)
        res.json({ error: e })
    }
}
