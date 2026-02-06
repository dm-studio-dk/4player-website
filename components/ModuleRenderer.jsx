import * as Sentry from "@sentry/react"
import ErrorFallback from "./ErrorFallback"

export default function ModuleRenderer({
    page = {},
    modules = [],
    components = {},
}) {
    // if (preview) {
    //   return <AnimatedModuleRenderer {...{ modules, components, preview }} />
    // }

    return (
        <>
            {modules?.map((module) => {
                const Component =
                    components[module._type] || components["moduleNotFound"]

                return (
                    <Sentry.ErrorBoundary
                        fallback={ErrorFallback(module)}
                        key={module._key}>
                        <Component module={module} page={page} />
                    </Sentry.ErrorBoundary>
                )
            })}
        </>
    )
}
