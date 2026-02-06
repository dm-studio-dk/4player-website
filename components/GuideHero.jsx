export default function GuideHero({ guide }) {
    const { title, subtitle } = guide

    return (
        <div className=" bg-black-full text-white pt-44 pb-20 mb-16 relative">
            <div className="absolute top-0 left-0 w-full h-full diagonal-bg-white opacity-[0.1666] -scale-x-100" />
            <div className="px-8 mx-auto text-center">
                <p className="font-serif text-sm font-bold">Guide</p>
                <h1 className="text-4xl lg:text-[110px] leading-tight mt-7 font-bold uppercase font-display text-yellow-base">
                    {title}
                </h1>
                <div className="site-grid container mx-auto">
                    <h2 className="text-2xl font-serif mt-8 lg:mt-16 col-span-full lg:col-span-8 lg:col-start-3 leading-relaxed">
                        {subtitle}
                    </h2>
                </div>
            </div>
        </div>
    )
}
