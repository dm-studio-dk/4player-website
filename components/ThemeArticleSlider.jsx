import { path } from "lib/helpers"
import useSlider from "../lib/useSlider"
import ArticleDateLine from "./ArticleDateLine"
import ArticleSlideIndicator from "./ArticleSlideIndicator"
import PageHero from "./PageHero"
import Slide from "./Slide"

export default function ThemeArticleDisplay({ theme }) {
    const { articles, title, subtitle } = theme
    const slides = articles.map(
        (slide, index) => ({ ...slide, index }),
        [module],
    )
    const {
        activeSlide,
        advance,
        transitioning,
        setTransitioning,
        onSlideClick,
    } = useSlider(slides)

    return (
        <div className="mb-10 lg:mb-32">
            <PageHero title={title} subtitle={subtitle} />{" "}
            <div className="slide-view flex items-stretch px-5 aspect-square lg:aspect-auto lg:h-[75vh]">
                {slides.map((slide) => (
                    <Slide
                        key={slide._id}
                        slide={slide}
                        onTransitionStart={() => setTransitioning(true)}
                        onTransitionEnd={() => setTransitioning(false)}
                        isActive={slide.index == activeSlide}
                        animateChildren
                        className="h-full flex flex-col items-center justify-end pb-16 lg:pb-[80px]"
                        href={path(slide.slug.current)}>
                        <>
                            <ArticleDateLine
                                className="lg:hidden"
                                {...slide}
                                dark={false}
                            />
                            <h2 className="text-2xl leading-[1] lg:text-[72px] font-bold font-display max-w-[20ch] mx-auto mt-3 lg:mt-0">
                                {slide.title}
                            </h2>
                            <p className="hidden lg:block mt-10 max-w-[60ch] mx-auto text-xl leading-[1.4]">
                                {slide.subtitle}
                            </p>
                        </>
                    </Slide>
                ))}
            </div>
            <div className="bottom-controls bottom-0 left-0 w-full pb-12">
                <div className="container mx-auto flex space-x-2 lg:space-x-4">
                    <div className="site-grid !grid-cols-12 w-full">
                        {slides.map((slide) => (
                            <ArticleSlideIndicator
                                key={slide._key || slide._id || slide.title}
                                slide={slide}
                                isActive={slide.index == activeSlide}
                                onClick={onSlideClick}
                                onFinish={advance}
                                transitioning={transitioning}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
