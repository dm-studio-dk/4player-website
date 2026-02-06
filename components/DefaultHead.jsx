import Head from "next/head"

export default function DefaultHead({ children }) {
    return (
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link
                href="/assets/favicons/light.png"
                rel="icon"
                media="(prefers-color-scheme: light)"
            />
            <link
                href="/assets/favicons/dark.png"
                rel="icon"
                media="(prefers-color-scheme: dark)"
            />
            {children}
        </Head>
    )
}
