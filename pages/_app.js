import DefaultHead from "components/DefaultHead"
import NavigationIndicator from "components/NavigationIndicator"
import Scripts from "components/Scripts"
import { useModules } from "lib/useModules"
import ExitPreview from "../components/ExitPreview"
import Footer from "../components/Footer"
// import { GridDebug } from "../components/GridDebug"
import Header from "../components/Header"
import { PageDataProvider } from "../lib/usePageData"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
    const hasGlobalSettings =
        pageProps?.globalSettings?.header && pageProps?.globalSettings?.footer
    const moduleContext = useModules(pageProps?.data?.page?.modules || [])

    return (
        <PageDataProvider value={pageProps}>
            <DefaultHead />
            <div className=" bg-white text-black-almost min-h-screen h-full font-serif">
                {hasGlobalSettings && (
                    <Header
                        navigation={pageProps.globalSettings.header.navigation}
                        moduleContext={moduleContext}
                    />
                )}
                <Component {...pageProps} />
                {hasGlobalSettings && (
                    <Footer {...pageProps.globalSettings.footer} />
                )}
                <NavigationIndicator />
                <ExitPreview preview={pageProps.preview} />
                {/* <GridDebug /> */}
                <Scripts />
            </div>
        </PageDataProvider>
    )
}

export default MyApp
