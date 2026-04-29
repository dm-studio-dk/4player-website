import BannerTitle from "./BannerTItle"
import PartnerTeaserCard from "./PartnerTeaserCard"

export default function MorePartners({ partners = [] }) {
    return (
        <div className="mt-40">
            <BannerTitle title="Relaterede partners" />

            <div className="partners-container container mx-auto mt-20 lg:mt-40 mb-20 lg:mb-32 gap-y-12 lg:gap-y-0">
                {partners
                    .filter((partner) => partner.slug)
                    .map((partner) => (
                        <PartnerTeaserCard
                            className="border-t border-black-almost border-opacity-10"
                            partner={partner}
                            key={partner.slug.current}
                        />
                    ))}
            </div>
        </div>
    )
}
