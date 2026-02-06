import { classNames } from "../lib/helpers"
import LinesVertical from "./LinesVertical"

export default function BlockQuote({ quote, source, small, hasBackground }) {
    return (
        <div
            className={classNames({
                "my-10 lg:my-12": !small,
                "my-10 lg:my-0": small,
            })}>
            <div className="relative">
                {small ? (
                    <QuoteSmall source={source} quote={quote} />
                ) : (
                    <QuoteBig
                        source={source}
                        quote={quote}
                        hasBackground={hasBackground}
                    />
                )}
            </div>
        </div>
    )
}

function QuoteBig({ quote, source, hasBackground }) {
    return (
        <div
            className={classNames({
                "bg-current-theme": hasBackground,
                "relative block": !hasBackground,
            })}>
            {!hasBackground && <LinesVertical />}

            <div className="text-center py-10 lg:py-20 site-grid mx-auto container gap-0">
                <p className="text-[28px] font-display col-span-full lg:text-6xl lg:col-span-10 lg:col-start-2 mb-0 leading-[1.2]">
                    »{quote}«
                </p>
                {source && (
                    <h4 className="mt-8 text-sm opacity-50 col-span-full">
                        {source}
                    </h4>
                )}
            </div>
        </div>
    )
}

function QuoteSmall({ quote, source }) {
    return (
        <div className="relative">
            <div className="container lg:left-1/2 lg:-translate-x-1/2 site-grid lg:absolute w-full">
                <div className="text-2xl leading-7 font-display pl-8 lg:pl-0 col-span-full lg:col-span-2 lg:col-start-11 relative pb-4 lg:pb-8">
                    <div className="line absolute left-0 top-0 w-0.5 h-full  lg:left-[-36px]"></div>
                    <p>»{quote}«</p>
                    {source && <h4>{source}</h4>}
                </div>
            </div>
        </div>
    )
}
