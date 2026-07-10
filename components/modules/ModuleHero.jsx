import PageHero from "../PageHero"

export default function ModuleHero({ module }) {
    const hasOnlyTitle = !module.image && !module.subtitle?.length

    return <PageHero {...module} addPadding={hasOnlyTitle} />
}
