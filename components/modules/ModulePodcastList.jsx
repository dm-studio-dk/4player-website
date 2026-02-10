import { classNames } from "../../lib/helpers"

export default function ModulePodcastList({ module }) {
    const { title, podcasts } = module

    return (
        <div className="container mx-auto module-wrapper">
            {title && (
                <h3 className="text-6xl mb-10 text-center font-display">
                    {title}
                </h3>
            )}
            <div className="list">
                {podcasts.map((podcast, index) => (
                    <PodcastListItem
                        podcast={podcast}
                        border={index < podcasts.length - 1}
                    />
                ))}
            </div>
        </div>
    )
}

function PodcastListItem({ podcast, border }) {
    return (
        <div
            className={classNames("site-grid py-10", {
                "border-b border-gray-light": border,
            })}>
            <div className="play-button col-span-3">PLAY</div>
            <div className="play-button col-span-3">{podcast.title}</div>
        </div>
    )
}
