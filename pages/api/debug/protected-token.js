import { signToken } from "lib/jwt.server"

export default async function handler(req, res) {
    res.json({
        token: signToken(),
    })
}
