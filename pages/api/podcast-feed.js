import Cors from "cors"

// Initializing the cors middleware
const cors = Cors({
    methods: ["GET", "HEAD"],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function (req, res) {
    await runMiddleware(req, res, cors)

    const response = await fetch(
        "https://feeds.soundcloud.com/users/soundcloud:users:417180216/sounds.rss",
    ).then((r) => r.text())
    // const { episodes: episodesFromFeed } = getPodcastFromFeed(response)
    // const episodes = episodesFromFeed.map(pickEpisode)

    res.setHeader("Content-Type", "application/json")
    res.status(200).json({ feed: response })
}
