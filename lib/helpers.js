// Library Helpers
export * as classNames from "classnames"

// Custom helpers
export const path = (slug) => `/${slug}`

// Filter draft items when previewing content from Sanity
export function filterDataToSingleItem(data, preview) {
    if (!Array.isArray(data)) {
        return data
    }

    if (data.length === 1) {
        return data[0]
    }

    if (preview) {
        return data.find((item) => item._id.startsWith(`drafts.`)) || data[0]
    }

    return data[0]
}

export const fullUrl = (path) =>
    `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN_NAME}${path}`

export const fileUrl = ({ asset } = {}, download) => {
    if (!asset) return null
    const assetId = asset._ref || asset._id
    const [_type, id, fileType] = assetId.split("-")

    const url = `/files/${id}.${fileType}`
    if (download) return url + "?dl="

    return url
}

export const formatArticleDate = (dateString) => {
    if (!dateString) return ""

    return new Date(dateString).toLocaleDateString("da-DK", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    })
}

export const getDimensions = (string) => {
    const dimensionString = string.split("-")[2]
    const [width, height] = dimensionString.split("x")

    return {
        width: Number(width),
        height: Number(height),
        aspectRatio: width / height,
    }
}

export function yearIsFirst(year, years) {
    const yearCentury = century(year.year)
    const index = years.indexOf(year)
    const prevYear = years?.[index - 1] || null

    if (prevYear && century(prevYear.year) == yearCentury) return false

    return true
}

export function onlyInCentury(year, years) {
    const yearCentury = century(year.year)
    const index = years.indexOf(year)
    const prevYear = years?.[index - 1] || null
    const nextYear = years?.[index + 1] || null

    if (prevYear && century(prevYear.year) == yearCentury) return false
    if (nextYear && century(nextYear.year) == yearCentury) return false

    return true
}

export function century(year) {
    const stringedYear = String(year)
    return `${stringedYear[0]}${stringedYear[1]}`
}

export function createCenturiesFromYears(rawYears) {
    const years = filterDrafts(rawYears)
    const yearMap = years
        .map((year) => ({ ...year, century: century(year.year) }))
        .reduce((allYears, currentYear) => {
            if (allYears[currentYear.century]) {
                allYears[currentYear.century].push(currentYear)
            } else {
                allYears[currentYear.century] = [currentYear]
            }

            return allYears
        }, {})

    const flattened = Object.entries(yearMap)
        .reduce((allItems, [century, years]) => {
            allItems.push({
                century,
                years,
            })

            return allItems
        }, [])
        .sort((a, b) => b.century - a.century)

    return flattened
}

/**
 * Filters out documents that have a draft version of them already
 *
 * @param {array} docs
 * @returns array of docs with no draft duplicates
 */
export function filterDrafts(docs = []) {
    // Add doc if it's a preview version
    // Add it only if there are no other draft (preview) versions of this document
    return docs.filter(
        (docA) => !docs.some((docB) => docB._id == `drafts.${docA._id}`),
    )
}
