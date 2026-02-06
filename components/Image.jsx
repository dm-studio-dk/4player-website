import { sanityLoader } from "lib/imageLoader"

export default function Image({ image, ref, className, ...props }) {
    const { aspectRatio } = image.asset._ref

    return (
        <div
            ref={ref}
            className={className}
            style={{ aspectRatio: `${aspectRatio}` }}>
            <Image {...props} loader={sanityLoader()} placeholder="blur" />
        </div>
    )
}
