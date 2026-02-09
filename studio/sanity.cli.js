import { defineCliConfig } from "sanity/cli"

export default defineCliConfig({
    api: {
        projectId: "lpyhhrcy",
        dataset: "production",
    },
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    studioHost: "4player-website",
    deployment: {
        appId: "fe70e1fe76147c52150cbd4f",
        autoUpdates: true,
    },
})
