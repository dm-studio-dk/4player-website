import Button from "components/Button"
import ArticleListItem from "components/ArticleListItem"

export default function ModuleTeaserPressrelease({ module }) {
    return (
        <div className="module-wrapper">
            <div className="container mx-auto">
                <div className="title-section relative">
                    <h2 className="text-4xl lg:text-[56px] font-display text-center">
                        {module.title}
                    </h2>
                    <div className="see-all lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 text-center lg:text-left mt-4 lg:mt-0">
                        <Button
                            internal
                            href="/pressemeddelelser"
                            arrow="right">
                            Se alle
                        </Button>
                    </div>
                </div>
            </div>
            <div className="episode-container mt-12">
                <ArticleListItem article={module.pressrelease} />
                <div className="container mx-auto">
                    <div className="module-divider"></div>
                </div>
            </div>
        </div>
    )
}
