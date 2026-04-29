import ArticleDateLine from "components/ArticleDateLine"
import FormField from "components/FormField"
import PageHero from "components/PageHero"
import SubmitButton from "components/SubmitButton"
import PageTemplate from "components/templates/PageTemplate"
import { path } from "lib/helpers"
import { globalSetingsQuery } from "lib/requestQuery"
import { getClient } from "lib/sanity.server"
import { groq } from "next-sanity"
import Head from "next/head"
import Link from "next/link"
import { useCallback, useMemo, useState } from "react"
import { blockContentToPlainText } from "react-portable-text"

export default function Page() {
    const [results, setResults] = useState([])
    const [searched, setSearched] = useState(false)
    const [term, setTerm] = useState("")
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
                "/api/content/search?term=" + e.target.term.value,
            )
            const newResults = await response.json()
            setResults(newResults)
            setSearched(true)
            setTerm(e.target.term.value)
        } catch {
            setResults([])
        }
    }, [])

    // const { fetchNext, data } = usePagination({
    //     onFetch,
    //     startingData: results,
    //     debug: true,
    // })

    return (
        <>
            <Head>
                <title>Søg</title>
            </Head>
            <PageTemplate>
                <PageHero title="Søg" />

                <div className="container pt-40 mx-auto site-grid">
                    <form
                        className="col-span-full lg:col-span-6 lg:col-start-4"
                        onSubmitCapture={handleSubmit}>
                        <FormField
                            inputClassName="mb-2"
                            type="text"
                            name="term"
                            label="Søg efter artikler, partners, sider m.m."
                        />
                        <SubmitButton>Søg</SubmitButton>
                    </form>
                </div>
                <div className="my-32 results">
                    {results && (
                        <>
                            {searched && (
                                <p className="container mx-auto mb-6">
                                    {results.length} sider matcher din søgning
                                    på <em className="italic">"{term}"</em>
                                </p>
                            )}
                            {results.map((result) => (
                                <SearchListItem {...result} key={result._id} />
                            ))}
                        </>
                    )}
                </div>
                {/* <InViewTrigger onEnter={fetchNext} /> */}
            </PageTemplate>
        </>
    )
}

const SearchListItem = ({
    title,
    subtitle,
    description,
    body,
    _type,
    type,
    publishedAt,
    slug,
}) => {
    const excerpt = useMemo(() => {
        const text =
            description ||
            subtitle ||
            (body ? blockContentToPlainText(body) : null)
        if (!text) return null

        return text.length > 240 ? text.substring(0, 237) + "..." : text
    }, [body])
    return (
        <div className="container mx-auto">
            <Link
                href={path(slug.current)}
                className="relative grid transition-all duration-500 border-t inner border-style py-11 site-grid hover:opacity-50">
                {_type == "article" && (
                    <ArticleDateLine
                        className="col-span-full row"
                        center={false}
                        type={type}
                        publishedAt={publishedAt}
                    />
                )}
                <h2 className="text-2xl lg:text-3xl font-display leading-[1.2] mt-3 col-span-full lg:col-span-6">
                    {title}
                </h2>
                {excerpt && (
                    <p className="mt-5 leading-[1.4] col-span-full lg:col-span-6 row-start-3">
                        {excerpt}
                    </p>
                )}
                <div className="absolute right-0 items-center self-start justify-start hidden h-full -translate-y-1/2 icon-container lg:flex top-1/2">
                    <img
                        src="/assets/icons/arrow_right.svg"
                        alt=""
                        className="block w-8 h-8 transition-all duration-500 ease-out group-hover:translate-x-1/2"
                    />
                </div>
            </Link>
        </div>
    )
}

export async function getServerSideProps() {
    const globalSettings = await getClient().fetch(
        groq`*[_id == 'siteSettings'][0] ${globalSetingsQuery}`,
    )
    return {
        props: {
            globalSettings,
        },
    }
}
