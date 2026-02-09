import { defineCliConfig } from "sanity/cli"

export default defineCliConfig({
    api: {
        projectId: "lpyhhrcy",
        dataset: "production",
    },
    studioHost: "website-4player",
    deployment: {
        autoUpdates: true,
    },
})
