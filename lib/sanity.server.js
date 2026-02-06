import { createClient } from "next-sanity"
import config from "../config/sanityClient"

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient({
    ...config,
    useCdn: true,
    // token: process.env.SANITY_API_TOKEN,
})

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
    ...config,
    useCdn: false,
    withCredentials: true,
    token: process.env.SANITY_API_TOKEN,
})

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview) =>
    usePreview ? previewClient : sanityClient
