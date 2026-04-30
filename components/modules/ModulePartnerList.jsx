import PartnerTeaserCard from "../PartnerTeaserCard"

export default function ModulePartnerList({ module }) {
    const { partners } = module

    return (
        <div className="px-8 mt-40">
            {partners.map((partner) => (
                <PartnerTeaserCard
                    partner={partner}
                    key={partner.slug.current}
                />
            ))}
        </div>
    )
}
