import BannerTitle from "../BannerTItle";
import NewsTeaserCard from "../NewsTeaserCard";

export default function ModuleTeaserArticles({ module }) {
    const { articles = [], title } = module;

    return (
        <div className="">
            <div className="py-32">
                <BannerTitle title={title} />
                <div className=" articles-container site-grid mt-20 gap-y-12 lg:gap-y-0 container mx-auto">
                    {articles
                        .filter((article) => article)
                        .map(
                            (article) =>
                                article && (
                                    <NewsTeaserCard
                                        className="col-span-full lg:col-span-4"
                                        article={article}
                                        key={article._id}
                                    />
                                ),
                        )}
                </div>
            </div>
        </div>
    );
}
