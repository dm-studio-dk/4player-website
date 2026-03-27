/**
 * Deletes every document with _type "redirect" from the configured dataset.
 * Run from studio/: bunx sanity exec scripts/deleteAllRedirects.mjs --with-user-token
 */
import { getCliClient } from "sanity/cli"

const BATCH = 100

const client = getCliClient({ apiVersion: "2024-01-01" })

const ids = await client.fetch(`array::unique(*[_type == "redirect"]._id)`)

if (ids.length === 0) {
    console.log("No redirects found.")
    process.exit(0)
}

console.log(`Deleting ${ids.length} redirect(s) from dataset "${client.config().dataset}"…`)

for (let i = 0; i < ids.length; i += BATCH) {
    const slice = ids.slice(i, i + BATCH)
    const tx = client.transaction()
    for (const id of slice) tx.delete(id)
    await tx.commit()
    console.log(`  committed ${Math.min(i + BATCH, ids.length)} / ${ids.length}`)
}

console.log("Done.")
