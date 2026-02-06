import Image from "next/legacy/image"
import Link from "next/link"
import { classNames, path } from "../lib/helpers"
import { sanityLoader } from "../lib/imageLoader"

export default function InitiativeListItem({ initiative, className }) {
    const { title, image, slug, description } = initiative

    return (
        <Link
            href={path(slug?.current)}
            className={classNames(
                "transition-all duration-500 items-center jutify-center container mx-auto block group",
                className,
            )}>
            <div className="relative py-10 border-t site-grid border-black-full border-opacity-10">
                <div className="image-container col-span-full lg:col-span-3">
                    <div className="relative flex items-center justify-center aspect-thumbnail bg-green-base ">
                        {image?.asset && (
                            <Image
                                alt={title}
                                layout="fill"
                                objectFit="cover"
                                className="transition-all duration-500 ease-out group-hover:scale-110"
                                loader={sanityLoader()}
                                src={image.asset._id}
                            />
                        )}
                    </div>
                </div>
                <div className="hidden col-span-1 spacer lg:block"></div>
                <div className="flex flex-col items-start justify-start meta col-span-full lg:col-span-4">
                    <h3 className="font-display text-2xl lg:text-4xl self-start mt-3 lg:mt-0 mb-6 leading-[1.2]">
                        <span className="inline-block">{title}</span>
                    </h3>
                    <p className="text-lg leading-[1.4]">{description}</p>
                </div>
                <div className="items-center self-start justify-center hidden h-full col-span-1 icon-container lg:flex lg:col-start-12">
                    <img
                        src="/assets/icons/arrow_right.svg"
                        alt=""
                        className="block w-8 h-8 transition-all duration-500 ease-out group-hover:translate-x-1/2"
                    />
                </div>
            </div>
        </Link>
    )
}
