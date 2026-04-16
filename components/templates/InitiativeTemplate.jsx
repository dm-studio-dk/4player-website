import InitiativeAbout from "components/InitiativeAbout";
import InitiativeProjectsList from "components/InitiativeProjectsList";
import ModuleRenderer from "components/ModuleRenderer";
import PageHero from "components/PageHero";
import RelatedArticles from "components/RelatedArticles";
import modules from "../../config/modules";

export default function PageTemplate({ page = {}, preview }) {
    console.log(page);
    const { about, projects, relatedContent, modules: pageModules } = page;

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
            {modules && (
                <ModuleRenderer
                    page={page}
                    modules={pageModules}
                    preview={preview}
                    components={modules}
                />
            )}
            {(projects && projects.length && (
                <InitiativeProjectsList projects={projects} />
            )) ||
                null}
            {(relatedContent && relatedContent.length && (
                <RelatedArticles articles={relatedContent} />
            )) ||
                null}
        </>
    );
}
