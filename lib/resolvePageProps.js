import { getClient } from "lib/sanity.server"
import { groq } from "next-sanity"
import UrlPattern from "url-pattern"
import { signToken, verify } from "./jwt.server"
import { contentBySlugQuery, draftQuery, queryMap } from "./requestQuery"

export default async function resolvePageProps({ preview, params, query }) {
    let token = query.at

    if (!token && process.env.NODE_ENV == "development") token = signToken()
    let skipProtection = token ? verify(token) : false

    const queryParams = {
        preview,
        skipProtection, // determine this value by checking the JWT in the URL
        isHomeRoute: !params.slug,
        slug:
            params.slug && !params.slug.includes("__webpack_hmr")
                ? params.slug.join("/")
                : "/",
    }
    const { match, query: optimizedQuery, type } = getQuery(queryParams.slug)

    if (match == "/*" && params.slug) {
        const redirect = await fetchRedirectRoute(params.slug.join("/"))
        if (redirect && redirect.to.slug.current != params.slug)
            return { redirect: "/" + redirect.to.slug.current }
    }

    const data =
        (await getClient(preview).fetch(contentBySlugQuery(optimizedQuery), {
            ...queryParams,
            type,
        })) || {}
    const { globalSettings, page } = data

    if (page?.redirectUrl) {
        return { redirect: page.redirectUrl }
    }

    return {
        page,
        globalSettings,
        queryParams,
        query: optimizedQuery,
        draftQuery,
    }
}

const getQuery = (path) => {
    const matchers = Object.keys(queryMap).reduce((matchers, route) => {
        matchers[route] = new UrlPattern(route)
        return matchers
    }, {})

    for (let route in matchers) {
        if (matchers[route].match("/" + path))
            return {
                match: route,
                query: queryMap[route].query,
                type: queryMap[route].type,
            }
    }
}

const fetchRedirectRoute = async (slug) => {
    const { redirect } = await getClient().fetch(
        groq`{
            "redirect": coalesce(
                *[_type == 'redirect' && from == $slug || from == $slug + '/'][0]{ to-> { slug } },
                *[_type == 'article' && redirect == $slug || redirect == $slug + '/'][0]{ "to": { slug } }
            )
        }`,
        { slug: "/" + slug },
    )
    return redirect
}
