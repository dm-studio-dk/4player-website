import { defineCliConfig } from "sanity/cli"

export default defineCliConfig({
    api: {
        projectId: "lpyhhrcy",
        dataset: "production",
    },
    studioHost: "website-4player",
    deployment: {
        appId: "c6f84xjg3mz9fn6xv52al1hh",
        autoUpdates: true,
    },
})
