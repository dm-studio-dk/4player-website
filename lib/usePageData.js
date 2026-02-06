import React, { useContext } from "react"

const PageDataContext = React.createContext({
    page: null,
    globalSettings: null,
})
export const PageDataProvider = PageDataContext.Provider

export default function usePageData() {
    const data = useContext(PageDataContext)

    return data
}
