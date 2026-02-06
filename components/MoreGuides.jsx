import BannerTitle from "./BannerTItle"
import GuideTeaserCard from "./GuideTeaserCard"

export default function MoreGuides({ guides = [] }) {
    return (
        <div className="mt-40">
            <BannerTitle title="Relaterede guides" />

            <div className="guides-container container mx-auto mt-20 lg:mt-40 mb-20 lg:mb-32 gap-y-12 lg:gap-y-0">
                {guides
                    .filter((guide) => guide.slug)
                    .map((guide) => (
                        <GuideTeaserCard
                            className="border-t border-black-almost border-opacity-10"
                            guide={guide}
                            key={guide.slug.current}
                        />
                    ))}
            </div>
        </div>
    )
}
