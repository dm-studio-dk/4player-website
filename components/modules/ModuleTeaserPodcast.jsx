import Button from "components/Button"
import PodcastListItem from "components/PodcastListItem"

export default function ModuleTeaserPodcast({ module }) {
    return (
        <div className="pt-20 pb-8 lg:pb-20 lg:pt-32">
            <div className="container mx-auto">
                <div className="relative title-section">
                    <h2 className="text-4xl lg:text-[56px] font-display text-center">
                        {module.title}
                    </h2>
                    <div className="absolute right-0 -translate-y-1/2 see-all top-1/2">
                        <Button internal href="/podcast" arrow="right">
                            Se alle
                        </Button>
                    </div>
                </div>
            </div>
            <div className="my-12 episode-container">
                <PodcastListItem episode={module.episode} />
            </div>
        </div>
    )
}
