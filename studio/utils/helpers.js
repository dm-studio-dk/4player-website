import slugger from "slugify"

export function slugify({ prefix = "" } = {}) {
    return (input) => {
        const slug = slugger(input, { lower: true, trim: true, strict: true })

        return slug.startsWith(prefix) ? slug : `${prefix}${slug}`
    }
}

export function blocksToPlainText(blocks = []) {
    return (
        blocks
            // loop through each block
            .map((block) => {
                // if it's not a text block with children,
                // return nothing
                if (block._type !== "block" || !block.children) {
                    return ""
                }
                // loop through the children spans, and join the
                // text strings
                return block.children.map((child) => child.text).join("")
            })
            // join the paragraphs leaving split by two linebreaks
            .join("\n\n")
    )
}

export function capitalize(str) {
    if (!str) return ""
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function splitCamelCase(inputString) {
    var notNullString = inputString || ""
    var trimmedString = notNullString.trim()
    var arrayOfStrings = trimmedString.split(" ")

    var splitStringsArray = []
    arrayOfStrings.forEach((tempString) => {
        if (tempString != "") {
            var splitWords = tempString.split(/(?=[A-Z])/).join(" ")
            splitStringsArray.push(capitalize(splitWords))
        }
    })

    return splitStringsArray.join(" ")
}

export function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
