import Button from "components/Button"
import { path } from "lib/helpers"

export default function ModuleHighlightNumbers({ module }) {
    return (
        <div className="">
            <div className="container mx-auto">
                <div className="site-grid module-wrapper -mt-4 lg:-mt-8 space-y-6 lg:space-y-0">
                    {module.items.map((item) => (
                        <Highlight key={item._key} {...item} />
                    ))}
                </div>
                <div className="module-divider"></div>
            </div>
        </div>
    )
}

function Highlight({ number, title, text, reference }) {
    return (
        <div className="col-span-full lg:col-span-4 text-center">
            <div className="number font-display">
                <span className="leading-[1.2] text-[120px] lg:text-[260px]">
                    {number < 10 ? "0" : ""}
                    {number}
                </span>
            </div>
            <div className="title max-w-[40ch] lg:max-w-none mx-auto">
                <h2 className="font-display text-2xl leading-[1]">{title}</h2>
            </div>
            <p className="mt-6 max-w-[35ch] mx-auto">{text}</p>
            {reference?.slug?.current && (
                <div className="action mt-4">
                    <Button
                        arrow="right"
                        internal
                        href={path(reference.slug.current) || ""}>
                        Se mere
                    </Button>
                </div>
            )}
        </div>
    )
}
