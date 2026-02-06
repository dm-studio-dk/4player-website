import InitiativeAbout from "components/InitiativeAbout"
import InitiativeProjectsList from "components/InitiativeProjectsList"
import PageHero from "components/PageHero"
import RelatedArticles from "components/RelatedArticles"

export default function PageTemplate({ page = {} }) {
    const { about, projects, relatedContent } = page

    return (
        <>
            <PageHero
                imageBackground
                title={page.title}
                subtitle={page.subtitle}
                image={page.image}
                fullHeight={false}
            />
            <InitiativeAbout {...about} />
            {/* {children ||
                (pageModules && (
                    <ModuleRenderer
                        page={page}
                        modules={pageModules}
                        preview={preview}
                        components={modules}
                    />
                ))} */}
            {(projects && projects.length && (
                <InitiativeProjectsList projects={projects} />
            )) ||
                null}
            {(relatedContent && relatedContent.length && (
                <RelatedArticles articles={relatedContent} />
            )) ||
                null}
        </>
    )
}
