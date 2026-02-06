import { groq } from "next-sanity"
import { signToken } from "./jwt.server"
import { getClient } from "./sanity.server"

export const createProtectedBenefitsUrl = async () => {
    // get the benefits slug from settings
    // concat with domain name
    // create token
    // send URL with token at the end
    const client = getClient()
    const slug = await client.fetch(
        groq`*[_type == 'siteSettings'][0].benefitsPage->slug.current`,
    )
    const url = `https://${process.env.SITE_DOMAIN_NAME}/${slug}`
    const token = signToken()

    return `${url}?at=${token}`
}
