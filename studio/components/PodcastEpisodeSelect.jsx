import { Card, Select, Stack } from "@sanity/ui"
import getPodcastFromFeed from "podparse"
import React from "react"
import { set, unset } from "sanity"

const isDev = process.env.NODE_ENV === "development"

const development = {
    url: "http://localhost:3000/api/podcast-feed",
}

const production = {
    url: "https://spfoprod.netlify.app/api/podcast-feed",
}

const feedUrl = isDev ? development.url : production.url

const PodcastEpisodeSelect = React.forwardRef((props, ref) => {
    const { value, readOnly, onChange, onBlur, onFocus } = props
    const [episodes, setEpisodes] = React.useState([])
    const handleChange = React.useCallback(
        (event) =>
            onChange(
                event.currentTarget.value
                    ? set(event.currentTarget.value)
                    : unset(),
            ),
        [onChange],
    )

    React.useEffect(() => {
        async function getEpisodes() {
            const response = await fetch(feedUrl).then((r) => r.json())

            const { episodes: episodesFromFeed } = getPodcastFromFeed(
                response.feed,
            )

            setEpisodes(
                episodesFromFeed.map((e) => ({
                    title: e.title,
                    imageUrl: e.image.url,
                    url: e.enclosure.url,
                    duration: e.duration,
                })),
            )
        }

        getEpisodes()
    }, [])

    return (
        <Card padding={0}>
            <Stack>
                <Select
                    onChange={handleChange}
                    fontSize={2}
                    padding={[3, 3, 4]}
                    space={[3, 3, 4]}
                    value={value} // Current field value
                    readOnly={readOnly} // If "readOnly" is defined make this field read only
                    onFocus={onFocus} // Handles focus events
                    onBlur={onBlur} // Handles blur events
                    ref={ref}>
                    {episodes.map((e) => (
                        <option key={e.title} value={JSON.stringify(e)}>
                            {e.title}
                        </option>
                    ))}
                </Select>
            </Stack>
        </Card>
    )
})

export default PodcastEpisodeSelect
