import PressreleaseList from "components/PressreleaseList"
import modules from "../../config/modules"
import ModuleRenderer from "../ModuleRenderer"
import NewsGrid from "../NewsGrid"
import PodcastList from "../PodcastList"

export default function PageTemplate({ page = {}, preview, children }) {
    const {
        articles,
        episodes,
        featuredTheme,
        modules: pageModules,
        pressreleases,
    } = page

    return (
        <>
            {articles && (
                <NewsGrid articles={articles} featuredTheme={featuredTheme} />
            )}
            {episodes && (
                <PodcastList episodes={episodes} title="Alle podcast" />
            )}
            {pageModules ? (
                <ModuleRenderer
                    page={page}
                    modules={pageModules}
                    preview={preview}
                    components={modules}
                />
            ) : (
                children
            )}
            {pressreleases && (
                <PressreleaseList
                    pressreleases={pressreleases}
                    title="Pressemeddelelser"
                />
            )}
        </>
    )
}
