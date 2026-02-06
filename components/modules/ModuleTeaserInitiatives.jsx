import InitiativeListItem from "components/InitiativeListItem"

export default function ModuleTeaserInitatives({ module }) {
    const { initiatives } = module
    return (
        <div className="module-wrapper">
            <div className="container mx-auto">
                <div className="top-section site-grid">
                    <h3 className="text-center uppercase font-display text-5xl lg:text-[80px] col-span-full">
                        {module.title}
                    </h3>
                    <p className="text-lg col-span-full lg:col-span-6 lg:col-start-4 text-center mt-6">
                        {module.subtitle}
                    </p>
                </div>
            </div>
            <div className="my-10 lg:my-20">
                {initiatives?.map((initiative) => (
                    <InitiativeListItem
                        initiative={initiative}
                        key={initiative._key}
                    />
                ))}
            </div>
        </div>
    )
}
