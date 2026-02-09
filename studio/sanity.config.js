import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { media } from "sanity-plugin-media"
import { structureTool } from "sanity/structure"
import deskStructure from "./desk-structure"
import documents from "./schemas/documents"
import objects from "./schemas/objects"

export default defineConfig({
    title: "4Player",
    projectId: "lpyhhrcy",
    dataset: "production",
    plugins: [
        structureTool({
            structure: deskStructure,
        }),
        visionTool(),
        media(),
    ],
    tools: (prev) => {
        if (process.env.DEV) {
            return prev
        }
        return prev.filter((tool) => tool.name !== "vision")
    },
    schema: {
        types: [...documents, ...objects],
    },
})
