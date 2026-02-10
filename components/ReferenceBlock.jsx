import classNames from "classnames"
import Image from "next/legacy/image"
import Link from "next/link"
import { path } from "../lib/helpers"
import { sanityLoader } from "../lib/imageLoader"
import LinesVertical from "./LinesVertical"

export default function ReferenceBlock({ title, reference }) {
    return (
        <div className="relative">
            <LinesVertical />
            <Link
                href={path(reference?.slug?.current) || ""}
                className={classNames(
                    "container mx-auto site-grid py-6 my-10 lg:my-12 items-end lg:items-start group",
                    {
                        "pb-12": !reference?.image,
                    },
                )}>
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="container h-full mx-auto site-grid">
                        <div className="h-full col-start-1 bg-white col-span-full lg:col-span-6 lg:col-start-4"></div>
                    </div>
                </div>
                <div className="hidden left-spacer lg:block lg:col-span-3"></div>
                <div
                    className={classNames(
                        "left lg:col-span-4 lg:col-start-4 relative z-10 group-hover:opacity-50 transition-all duration-300",
                        {
                            "lg:pr-9 col-span-3": reference?.image,
                            "col-span-4": !reference?.image,
                        },
                    )}>
                    <p className="text-base">Se også</p>
                    <h3 className="font-display mt-[2px] text-base leading-[1.3] lg:leading-[1.4] lg:text-lg">
                        {title || reference?.title}
                    </h3>
                </div>
                {reference?.image && (
                    <div className="col-span-2 lg:pl-12">
                        <div className="relative w-full aspect-[3/2] bg-green-light">
                            <Image
                                className="transition-all duration-500 ease-out group-hover:scale-110"
                                alt={title || reference?.title}
                                layout="fill"
                                objectFit="cover"
                                loader={sanityLoader()}
                                src={reference?.image.asset._id}
                            />
                        </div>
                    </div>
                )}
            </Link>
        </div>
    )
}
