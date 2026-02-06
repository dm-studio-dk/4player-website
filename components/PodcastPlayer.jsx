export default function PodcastPlayer({ src }) {
    return (
        <div className="w-full">
            <audio className="w-full" controls>
                <source src={src} type="audio/mpeg" />
            </audio>
        </div>
    )
}
