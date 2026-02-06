import { PromoSplit } from "./modules/ModulePromo"

export default function InitiativeProjectsList({ projects }) {
    return (
        <div>
            <div className="project-list">
                {projects.map((project, i) => (
                    <PromoSplit
                        key={project._key}
                        title={project.title}
                        content={project.description}
                        image={project.image}
                        orientation={i % 2 == 0 ? "left" : "right"}
                        linkType={project.linkType}
                        reference={project.reference}
                        url={project.url}
                        label="Projekt"
                        buttonLabel="Se projekt"
                    />
                ))}
            </div>
            <div className="container mx-auto">
                <div className="module-divider"></div>
            </div>
        </div>
    )
}
