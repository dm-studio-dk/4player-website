import InitiativeListItem from "components/InitiativeListItem";
import classNames from "classnames";

export default function ModuleTeaserInitatives({ module, previousModule }) {
    const { initiatives } = module;
    const followsPromo = previousModule?._type === "modulePromo";

    return (
        <div
            className={classNames("mb-20 lg:mb-32", {
                "mt-20 lg:mt-32": !followsPromo,
            })}
        >
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
            <div className="mt-20">
                {initiatives?.map((initiative) => (
                    <InitiativeListItem
                        initiative={initiative}
                        key={initiative._key}
                    />
                ))}
            </div>
        </div>
    );
}
