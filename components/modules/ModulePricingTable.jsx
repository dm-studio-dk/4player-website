import Button from "components/Button"

export default function ModulePricingTable({ module }) {
    if (!module.plans?.length) return null

    return (
        <div>
            <div className="container mx-auto">
                <div className="site-grid gap-y-4 lg:gap-y-7">
                    {module.plans.map((plan) => (
                        <div
                            key={plan._key}
                            className="col-span-full lg:col-span-4 py-6 lg:py-14 lg:px-10 px-6 bg-green-washed text-center flex flex-col items-center relative">
                            <div className="diagonal-bg absolute top-0 left-0 w-full h-full mix-blend-overlay opacity-90 pointer-events-none" />
                            <h3 className="font-display leading-[1.2] text-2xl lg:text-[40px]">
                                {plan.title}
                            </h3>
                            <p className="text-lg  mt-14">{plan.description}</p>
                            <div className="flex-grow"></div>
                            <p className="text-xl font-display mt-12">
                                {plan.price}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="action my-8 lg:my-12 text-center">
                    {/* <a
                        className="font-display inline-flex items-center"
                        href="#membership">
                        Bliv medlem{" "}
                        <img
                            src="/assets/icons/arrow_down.svg"
                            alt=""
                            className="w-3 block ml-[10px] -mt-0.5"
                        />
                    </a> */}
                    <Button arrow="down" href="#membership" internal>
                        Bliv medlem
                    </Button>
                </div>
            </div>
        </div>
    )
}
