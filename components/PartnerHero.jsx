export default function PartnerHero({ partner }) {
    const { title, subtitle } = partner

    return (
        <div className="bg-green-dark text-white pt-44 pb-20 mb-16 relative">
            <div className="px-8 mx-auto text-center">
                <h1 className="text-4xl lg:text-[110px] leading-tight font-bold uppercase font-display text-white">
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
