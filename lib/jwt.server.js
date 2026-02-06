import jwt from "jsonwebtoken"

export const signToken = () => {
    const token = jwt.sign(
        { data: "SPFO" },
        process.env.SANITY_PREVIEW_SECRET,
        { algorithm: "HS256", expiresIn: "1h" },
    )

    return token
}

export const verify = (token) => {
    if (!token) return false

    try {
        jwt.verify(token, process.env.SANITY_PREVIEW_SECRET)
        return true
    } catch {
        return false
    }
}
