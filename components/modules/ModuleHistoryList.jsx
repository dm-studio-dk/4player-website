import classNames from "classnames"
import {
    createCenturiesFromYears,
    onlyInCentury,
    yearIsFirst,
} from "lib/helpers"
import { sanityLoader } from "lib/imageLoader"
import Image from "next/legacy/image"
import { useMemo, useState } from "react"
import PortableText from "react-portable-text"

export default function ModuleHistoryList({ module }) {
    const centuries = useMemo(
        () => createCenturiesFromYears(module.years),
        [module],
    )

    return (
        <div className=" pt-52 lg:pt-[350px]">
            {centuries.map((century) => (
                <CenturySection key={century.century} {...century} />
            ))}
        </div>
    )
}

function CenturySection({ years, century }) {
    const copyYears = [...years]
    const lastYear = copyYears.length > 1 ? copyYears.pop() : null
    return (
        <>
            <div className="container flex flex-wrap items-start w-full mx-auto">
                <div className="lg:sticky top-40 lg:top-64 translate-y-[2px] w-0 pointer-events-none">
                    <div className="font-display text-[170px] lg:text-[270px] leading-[0] ">
                        {century}
                    </div>
                </div>
                <div className="w-full list">
                    {copyYears.map((year) => (
                        <YearSection
                            key={year.year}
                            year={year}
                            isFirstInCentury={yearIsFirst(year, years)}
                            isOnlyInCentury={onlyInCentury(year, years)}
                        />
                    ))}
                </div>
            </div>
            {lastYear && (
                <div className="container mx-auto">
                    <YearSection
                        year={lastYear}
                        isFirstInCentury={yearIsFirst(lastYear, years)}
                        isOnlyInCentury={onlyInCentury(lastYear, years)}
                    />
                </div>
            )}
        </>
    )
}

function YearSection({ year }) {
    const [firstYear, secondYear] = String(year.year)
        .split("")
        .reduce(
            (all, current, index) => {
                if (index == 0) all[0][0] = current
                if (index == 1) {
                    all[0][1] = current
                    all[0] = `${all[0][0]}${all[0][1]}`
                }

                if (index == 2) all[1][0] = current
                if (index == 3) {
                    all[1][1] = current
                    all[1] = `${all[1][0]}${all[1][1]}`
                }

                return all
            },
            [[], []],
        )

    return (
        <div className="relative w-full">
            <div className="absolute top-0 w-screen -translate-x-1/2 module-divider left-1/2"></div>
            <div>
                <div className="relative items-start site-grid">
                    <div className="absolute top-0 left-0 h-full pointer-events-none year">
                        <p className="font-display text-[170px] lg:text-[270px] leading-[0] h-full">
                            <span className="opacity-0">{firstYear}</span>
                            <span className="">{secondYear}</span>
                        </p>
                    </div>
                    <div className="events col-span-full lg:col-span-5 lg:col-start-8 pt-32 lg:pt-0 pb-[200px] lg:pb-[280px]">
                        {year.image && (
                            <div className="relative w-full mt-6 bg-gray-400 aspect-thumbnail lg:mt-8">
                                <Image
                                    layout="fill"
                                    objectFit="cover"
                                    loader={sanityLoader()}
                                    src={year.image.asset._id}
                                />
                            </div>
                        )}
                        {year.events.map((event) => (
                            <EventItem
                                key={event._id || event._key || event.title}
                                event={event}>
                                {event.body && (
                                    <PortableText
                                        content={event.body}
                                        className="pb-4 mt-4"
                                        serializers={{
                                            normal: (props) => (
                                                <p
                                                    className="mb-4 text-base"
                                                    {...props}
                                                />
                                            ),
                                        }}
                                    />
                                )}
                            </EventItem>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function EventItem({ event, children }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="py-6 border-b border-black-full border-opacity-10 lg:py-8">
            <div
                className={classNames(
                    "header cursor-pointer flex justify-between items-start",
                    isOpen && "mb-12",
                )}
                onClick={() => setIsOpen((v) => !v)}>
                <span className="pr-10">{event.title}</span>
                <div className="flex-shrink-0 block w-8 h-8 select-none">
                    <img
                        src="/assets/icons/plus.svg"
                        className={classNames(
                            "transition-all duration-200 ease-in-out",
                            {
                                "rotate-[135deg]": isOpen,
                            },
                        )}
                    />
                </div>
            </div>
            <div className="content">{isOpen && children}</div>
        </div>
    )
}
