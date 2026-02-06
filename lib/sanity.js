import createImageUrlBuilder from "@sanity/image-url"
import debounce from "lodash/debounce"
import { createClient, createCurrentUserHook } from "next-sanity"
import { useEffect, useState } from "react"
import config from "../config/sanityClient"

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source)

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)

// Creates Next.js safe paths out of slugs
export const slugPath = (document = {}) => {
    if (!document.slug) return "/"

    return `/${document.slug.current}`
}

export function usePreviewSubscription(
    callback,
    options = { debounce: 500, query: {}, params: {}, enabled: false },
) {
    const [_subscription, setSubscription] = useState(null)
    const { data: user } = useCurrentUser(config)

    useEffect(() => {
        if (user && options.enabled) {
            const client = createClient({ ...config, withCredentials: true })
            const sub = client.listen(options.query, options.params).subscribe(
                debounce((data) => {
                    callback(data)
                }, options.debounce),
            )

            setSubscription(sub)

            return () => sub.unsubscribe()
        }
    }, [])
}
