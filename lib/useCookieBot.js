import { useState, useEffect } from "react"

export default function useCookieBot() {
    const [consent, setConsent] = useState(
        typeof window != "undefined" && window.Cookiebot
            ? window.Cookiebot
            : {},
    )

    useEffect(() => {
        function onStateChange() {
            if (window.Cookiebot) {
                setConsent({ ...window.Cookiebot.consent })
            }
        }

        onStateChange()

        if (!window.Cookiebot) {
            window.addEventListener("CookiebotOnLoad", onStateChange)
        }

        window.addEventListener("CookiebotOnAccept", onStateChange, false)
        window.addEventListener("CookiebotOnDecline", onStateChange, false)

        return () => {
            window.removeEventListener("CookiebotOnAccept", onStateChange)
            window.removeEventListener("CookiebotOnDecline", onStateChange)
        }
    }, [])

    return { consent: { ...consent } }
}
