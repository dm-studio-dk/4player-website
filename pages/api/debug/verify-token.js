import { verify } from "lib/jwt.server"

export default async function handler(req, res) {
    const { token } = req.query

    if (token) {
        const verified = verify(token)
        res.json({
            verified,
        })
    } else {
        res.json({ error: "No token provided" })
    }
}
