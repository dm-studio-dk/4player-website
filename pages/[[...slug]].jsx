import { groq } from "next-sanity"
import Helmet from "../components/Helmet"
import resolvePageProps from "../lib/resolvePageProps"
import usePage from "../lib/usePage"

export default function Page({ data, preview }) {
    const { TemplateComponent, page } = usePage({ data })

    return (
        <>
            <Helmet page={page} />
            <TemplateComponent key={page._id} page={page} preview={preview} />
        </>
    )
}

export async function getServerSideProps({
    params,
    preview = false,
    query: queryString,
    res,
}) {
    try {
        const { globalSettings, page, query, queryParams, redirect } =
            await resolvePageProps({
                params,
                query: queryString,
                preview,
            })

        if (redirect)
            return {
                redirect: {
                    destination: redirect,
                    permanent: true,
                },
            }
        if (!page) return { notFound: true }

        if (process.env.NODE_ENV == "production") {
            if (preview) {
                res.setHeader(
                    "Cache-Control",
                    "no-cache, no-store, max-age=0, must-revalidate",
                )
            } else {
                res.setHeader(
                    "Cache-Control",
                    "public, s-maxage=600, must-revalidate",
                )
                res.setHeader("ETag", page._updatedAt)
            }
        }

        return {
            props: {
                // Pass down the "preview mode" boolean to the client-side
                preview,
                // Pass down the initial content, and our query
                globalSettings,
                data: {
                    page,
                    query,
                    queryParams,
                    draftQuery: groq`*[$slug == '/' && slug.current == *[_id == 'siteSettings'][0].homepage->.slug.current || slug.current == $slug]`,
                    draftParams: queryParams,
                },
            },
        }
    } catch (e) {
        console.log(e)
        return { notFound: true }
    }
}
