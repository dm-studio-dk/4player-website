import { defineCliConfig } from "sanity/cli"

export default defineCliConfig({
    api: {
        projectId: "izehegc8",
        dataset: "production",
    },
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    studioHost: "spfo",
    deployment: {
        appId: "fe70e1fe76147c52150cbd4f",
        autoUpdates: true,
    },
})
