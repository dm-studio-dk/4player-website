import { useCallback } from "react"

export default function SearchForm({ onResults }) {
    const ref = useRef()
    const handleSubmit = useCallback(async () => {
        try {
            const results = await fetch(
                "/api/content/search?term=" + ref.current.data.term,
            ).then((r) => r.json())
            onResults(results)
        } catch {
            onResults([])
        }
    }, [])

    return (
        <div>
            Search form
            <form onSubmitCapture={handleSubmit} ref={ref}>
                <FormField
                    type="text"
                    name="term"
                    placeholder="Søg efter artikler, partners, sider m.m."
                />
            </form>
        </div>
    )
}
