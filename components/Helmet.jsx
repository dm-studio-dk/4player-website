import Head from "next/head";
import { useRouter } from "next/router";
import { fullUrl } from "../lib/helpers";
import { urlFor } from "../lib/sanity";

export default function Helmet({ page }) {
    const { asPath } = useRouter();
    const image =
        page.seoImage ||
        page.image ||
        (page.modules && page.modules[0]?.image
            ? page.modules[0]?.image
            : null);

    return (
        <Head>
            <title>{`${page.seoTitle || page.title} | 4Player`}</title>
            <meta
                name="description"
                content={
                    page.seoDescription ||
                    page.description ||
                    page.subtitle ||
                    "4Player"
                }
            />
            <meta name="og:title" content={page.seoTitle || page.title} />
            <meta name="og:url" content={fullUrl(asPath)} />
            {image && <meta name="og:image" content={urlFor(image).url()} />}
            <meta name="og:site_name" content="4Player" />
            <meta
                name="og:description"
                content={page.seoDescription || page.description}
            />
            {page._type == "article" && (
                <>
                    <meta name="og:type" content="movie" />
                    <meta
                        property="article:author"
                        content={page.author?.name}
                    />
                    <meta
                        property="article:published_time"
                        content={page.publishedAt}
                    />
                </>
            )}
        </Head>
    );
}
