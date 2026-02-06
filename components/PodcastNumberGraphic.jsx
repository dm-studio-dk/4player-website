export default function PodcastNumberGraphic({ podcast }) {
    return (
        <div className="absolute left-0 top-0 w-full h-full bg-yellow-base flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full horizontal-bg group-hover:bg-[center_top_24px] transition-all duration-500 ease-out"></div>
            <span className="text-center font-display text-[220px] sm:text-[300px] md:text-[400px] lg:text-[250px] xl:text-[360px] leading-[0]">
                {podcast.number}
            </span>
        </div>
    )
}
