import BannerTitle from "components/BannerTItle"
import { sanityLoader } from "lib/imageLoader"
import Image from "next/legacy/image"

export default function ModuleImageCaroussel({ module }) {
    return (
        <div>
            <div className="module-divider" />
            <div className="content">
                <BannerTitle snug>
                    <div className="inline-flex items-center py-20">
                        {module.images.map((image) => (
                            <div
                                key={image.asset._id}
                                className="relative w-auto h-8 mr-24 lg:h-16"
                                style={{
                                    aspectRatio: `${image.asset.metadata.dimensions.aspectRatio}`,
                                }}>
                                <Image
                                    layout="fill"
                                    objectFit="contain"
                                    objectPosition="left"
                                    loader={sanityLoader()}
                                    src={image.asset._id}
                                />
                            </div>
                        ))}
                    </div>
                </BannerTitle>
            </div>
            <div className="module-divider" />
        </div>
    )
}
