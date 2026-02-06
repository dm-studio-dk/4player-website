import classNames from "classnames"
import GuideTeaserCard from "../GuideTeaserCard"

export default function ModuleTeaserGuides({ module }) {
    const { guides, hasBackground, subtitle } = module

    return (
        <div
            className={classNames("module-wrapper", {
                "theme-green bg-current-theme": hasBackground,
            })}>
            <div className="container mx-auto">
                <div className="top-section site-grid">
                    <h3 className="text-center uppercase font-display text-5xl lg:text-[80px] col-span-full">
                        {module.title}
                    </h3>
                    <p className="text-lg col-span-full lg:col-span-6 lg:col-start-4 text-center mt-6">
                        {subtitle}
                    </p>
                </div>
                <div className="guides-container mt-20 gap-y-12 lg:gap-y-0">
                    {guides &&
                        guides
                            .filter(Boolean)
                            .map((guide) => (
                                <GuideTeaserCard
                                    className="border-t border-black-almost border-opacity-10"
                                    guide={guide}
                                    key={guide.slug.current}
                                />
                            ))}
                </div>

                {/* <div className="module-divider"></div> */}
            </div>
        </div>
    )
}
