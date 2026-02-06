import BannerTitle from "./BannerTItle"
import NewsTeaserCard from "./NewsTeaserCard"

export default function MoreArticles({
    articles = [],
    title = "Relaterede artikler",
}) {
    return (
        <div className="mt-16 lg:mt-32 mb-40 lg:mb-32">
            <BannerTitle title={title} />
            <div className="container mx-auto site-grid mt-10 lg:mt-20 space-y-12 lg:space-y-0">
                {articles.map((article) => (
                    <NewsTeaserCard
                        article={article}
                        key={article._id}
                        className="col-span-full lg:col-span-3 xl:col-span-4"
                    />
                ))}
            </div>
        </div>
    )
}
