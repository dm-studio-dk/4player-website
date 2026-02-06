import GuideTeaserCard from "../GuideTeaserCard"

export default function ModuleGuideList({ module }) {
    const { guides } = module
    return (
        <div className="px-8 mt-40">
            {guides.map((guide) => (
                <GuideTeaserCard guide={guide} key={guide.slug.current} />
            ))}
        </div>
    )
}
