export function useModules(modules) {
    const startsWith = modules?.[0]?._type || null
    const endsWith = modules?.[modules.length - 1]?._type || null

    const startsWithHero = modules?.[0]?._type == "moduleHero"
    const hasHero = modules?.find((m) => m._type == "moduleHero")

    return {
        startsWith,
        endsWith,
        hasHero,
        startsWithHero,
        modules,
        before: (module) => modules[modules.indexOf(module) - 1],
        after: (module) => modules[modules.indexOf(module) + 1],
    }
}
