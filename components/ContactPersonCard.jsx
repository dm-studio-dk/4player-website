import classNames from "classnames"
import { sanityLoader } from "lib/imageLoader"
import Image from "next/legacy/image"

export default function ContactPersonCard({ person, teaser, className }) {
    return (
        <div
            className={classNames(
                "container site-grid mx-auto font-serif",
                className,
            )}>
            <div className="flex flex-col px-8 py-6 text-center bg-gray-100 card col-span-full lg:col-span-6 lg:col-start-4 lg:flex-row lg:text-left">
                <div className="mx-auto image lg:mx-0 lg:pr-8">
                    {person.image?.asset?._id && (
                        <div
                            className={classNames(
                                "overflow-hidden rounded-full aspect-square -translate-y-1 block relative w-[105px] lg:w-[154px] bg-gray-400",
                            )}>
                            <Image
                                alt={person.name}
                                layout="fill"
                                objectFit="cover"
                                loader={sanityLoader()}
                                src={person.image.asset._id}
                            />
                        </div>
                    )}
                </div>
                <div className="info">
                    <h3 className="text-lg font-display">{person.name}</h3>
                    <p className="text-xs opacity-50">{person.title}</p>
                    {teaser && (
                        <p className="mt-3 mx-auto text-xs max-w-[60ch]">
                            {teaser}
                        </p>
                    )}
                    {(person.phone || person.email) && (
                        <div className="mt-6 contact">
                            {person.phone && (
                                <a
                                    className="text-xs block leading-[1.5]"
                                    href={"tel:" + person.phone}>
                                    {person.phone}
                                </a>
                            )}
                            {person.email && (
                                <a
                                    className="text-xs block leading-[1.5] underline"
                                    href={"mailto:" + person.email}>
                                    {person.email}
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
