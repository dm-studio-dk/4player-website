import classNames from "classnames"
import { sanityLoader } from "lib/imageLoader"
import Image from "next/legacy/image"

export default function ShortNameImage({ person, className, bigImage }) {
    return (
        <span
            className={classNames(
                "inline-flex items-center text-[43px] leading-[0.9] font-bold font-display lg:text-title-jumbo",
                className,
            )}>
            {person.shortName} {""}
            <span
                className={classNames(
                    "overflow-hidden rounded-full aspect-square h-full ml-2 lg:ml-5 -translate-y-1 inline-block relative bg-green-light",
                    {
                        "w-12 lg:w-[105px]": !bigImage,
                        "w-12 lg:w-32": bigImage,
                    },
                )}>
                {person.image?.asset && (
                    <Image
                        alt={person.name}
                        layout="fill"
                        objectFit="cover"
                        sizes="20vw"
                        loader={sanityLoader(person.image, { aspect: 1 })}
                        src={person.image.asset._id}
                    />
                )}
            </span>
        </span>
    )
}
