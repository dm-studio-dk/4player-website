export default function PodcastNumberGraphic({ podcast }) {
    return (
        <div className="absolute left-0 top-0 w-full h-full bg-green-light flex items-center justify-center">
            <span className="text-center font-display text-[220px] sm:text-[300px] md:text-[400px] lg:text-[250px] xl:text-[360px] leading-[0]">
                {podcast.number}
            </span>
        </div>
    )
}
