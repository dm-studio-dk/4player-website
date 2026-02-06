import Script from "next/script"

export default function Scripts() {
    return (
        <>
            {/* CookieBot */}
            <Script
                id="Cookiebot"
                src="https://consent.cookiebot.com/uc.js"
                strategy="lazyOnload"
                data-cbid="67854320-313a-4661-af28-3cfdd1e2fb03"
                data-blockingmode="auto"
                type="text/javascript"
            />
            {/* Google tag (gtag.js) */}
            {process.env.NODE_ENV == "production" && (
                <>
                    <Script
                        strategy="lazyOnload"
                        src="https://www.googletagmanager.com/gtag/js?id=G-YW0PLHGHFB"
                    />
                    <Script async id="google-analytics">
                        {`
                        window.dataLayer = window.dataLayer || []
                        function gtag() {
                            dataLayer.push(arguments)
                        }
                        gtag("js", new Date())
                        
                        gtag("config", "G-YW0PLHGHFB")
                        gtag('config', 'UA-58419901-1');
                        `}
                    </Script>
                </>
            )}
        </>
    )
}
