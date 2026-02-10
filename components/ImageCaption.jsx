import Image from "next/legacy/image"
import { classNames } from "../lib/helpers"
import { sanityLoader } from "../lib/imageLoader"

export default function ImageCaption({ caption, image, className }) {
    return (
        image && (
            <div className={classNames(className, "mt-12")}>
                                        <div className="relative w-full bg-green-light image-container"
                    style={{
                        aspectRatio: `${image.asset.metadata.dimensions.aspectRatio}`,
                    }}>
                    <Image
                        alt={caption || ""}
                        layout="fill"
                        objectFit="cover"
                        loader={sanityLoader()}
                        src={image.asset._id}
                    />
                </div>
                {caption && (
                    <div className="caption">
                        <p className="text-sm leading-[1.4] opacity-50 mt-3 text-center">
                            {caption}
                        </p>
                    </div>
                )}
            </div>
        )
    )
}
