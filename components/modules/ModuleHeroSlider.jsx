import { useMemo } from "react"
import { path } from "../../lib/helpers"
import useSlider from "../../lib/useSlider"
import Button from "../Button"
import HeroSlideIndicator from "../HeroSlideIndicator"
import Slide from "../Slide"

export default function ModuleHeroSlider({ module }) {
    const slides = useMemo(
        () => module.slides.map((s, index) => ({ ...s, index })),
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
        <div className="relative h-screen">
            <div className="slide-view flex items-stretch">
                {slides.map((slide) => (
                    <Slide
                        key={slide._key}
                        slide={slide}
                        onTransitionStart={() => setTransitioning(true)}
                        onTransitionEnd={() => setTransitioning(false)}
                        isActive={slide.index == activeSlide}
                        className="flex flex-col items-center justify-center"
                        animateChildren>
                        <>
                            <h2 className="text-4xl leading-[1] lg:text-[140px] font-bold font-display">
                                {slide.title}
                            </h2>
                            <p className="space-y-10 mt-4 lg:mt-5 max-w-[60ch] mx-auto text-lg leading-[1.4]">
                                {slide.subtitle}
                            </p>
                            {slide.referenceType !== "none" && (
                                <div className="cta mt-6">
                                    <Button
                                        inverted
                                        arrow="right"
                                        href={
                                            slide.referenceType == "internal"
                                                ? path(
                                                      slide.reference?.slug
                                                          ?.current,
                                                  ) || ""
                                                : slide.url
                                        }
                                        internal={
                                            slide.referenceType == "internal"
                                        }>
                                        {slide.label}
                                    </Button>
                                </div>
                            )}
                        </>
                    </Slide>
                ))}
            </div>
            <div className="bottom-controls absolute bottom-0 left-0 w-full pb-12">
                <div className="container mx-auto flex space-x-2 lg:space-x-4">
                    {slides.map((slide) => (
                        <HeroSlideIndicator
                            key={slide._key}
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
    )
}
