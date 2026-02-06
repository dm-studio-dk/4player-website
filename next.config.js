const { withSentryConfig } = require("@sentry/nextjs")

const IS_PRODUCTION = process.env.NODE_ENV === "production"

module.exports = {
    async rewrites() {
        const rewrites = [
            {
                source: "/sitemap.xml",
                destination: "/api/sitemap",
            },
            // {
            //     source: "/files/:path*",
            //     destination: `https://cdn.sanity.io/files/izehegc8/${process.env.NEXT_PUBLIC_SANITY_DATASET}/:path*`,
            // },
        ]

        return rewrites
    },
    async redirects() {
        const redirects = []
        if (process.env.NODE_ENV == "production") {
            redirects.push({
                source: "/api/debug/:path*",
                destination: "/404",
                permanent: true,
            })
        }

        redirects.push({
            source: "/files/:path*",
            destination: `https://cdn.sanity.io/files/izehegc8/${process.env.NEXT_PUBLIC_SANITY_DATASET}/:path*`,
            permanent: true,
        })

        return redirects
    },
    i18n: {
        locales: ["da"],
        defaultLocale: "da",
    },
    generateEtags: false,
    reactStrictMode: true,
    experimental: {
        scrollRestoration: true,
        // Prefer loading of ES Modules over CommonJS
        esmExternals: true,
    },
    images: {
        domains: ["cdn.sanity.io"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [48, 105, 230, 370, 571, 1080, 1920, 2048],
    },
}

if (IS_PRODUCTION) {
    const sentryWebpackPluginOptions = {
        // Additional config options for the Sentry Webpack plugin. Keep in mind that
        // the following options are set automatically, and overriding them is not
        // recommended:
        //   release, url, org, project, authToken, configFile, stripPrefix,
        //   urlPrefix, include, ignore'
        authToken: process.env.SENTRY_AUTH_TOKEN,

        silent: true, // Suppresses all logs
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options.
    }

    // Make sure adding Sentry options is the last code to run before exporting, to
    // ensure that your source maps include changes from all other Webpack plugins
    module.exports = withSentryConfig(
        module.exports,
        sentryWebpackPluginOptions,
    )
}
