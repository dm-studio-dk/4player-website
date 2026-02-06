import { useCallback, useEffect, useState } from "react"

export default function usePagination({
    perPage = 10,
    startPage = 1,
    startingData = [],
    onFetch,
    onData,
    onError,
    debug,
}) {
    const [currentPage, setCurrentPage] = useState(startPage)
    const [data, setData] = useState(startingData)
    const [fetching, setFetching] = useState(false)

    const fetchNext = useCallback(async () => {
        try {
            setFetching(true)
            const results = await onFetch({
                currentPage: currentPage + 1,
                perPage,
                signal: null,
            })

            setFetching(false)
            onData?.(results)
            setData([...data, ...results])

            if (debug) console.warn({ data })
            setCurrentPage(currentPage + 1)
        } catch (error) {
            if (debug) console.warn({ error })
            onError?.({ error })
        }
    }, [currentPage])

    useEffect(() => {
        setData(startingData)
    }, [])

    return {
        currentPage,
        data,
        fetchNext,
        fetching,
    }
}
