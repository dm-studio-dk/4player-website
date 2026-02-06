import { urlFor } from "./sanity"

// export const sanityLoader = ({ src: asset, width, quality = 75 }) => {
//     // console.log(asset, width, quality)
//     return urlFor(asset).width(width).quality(quality).auto("format").url()
// }

export const sanityLoader =
    (image, { aspect } = {}) =>
    ({ src: assetId, width, height, quality = 100 }) => {
        const build = urlFor(image || assetId)
            .width(width)
            .height(aspect ? width * aspect : height)
            .quality(quality)
            .auto("format")

        return build.url()
    }
