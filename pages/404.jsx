import BannerTitle from "components/BannerTItle"
import Button from "components/Button"
import Head from "next/head"
import PageTemplate from "../components/templates/PageTemplate"

const NotFound = () => {
    return (
        <>
            <Head>
                <title>Not Found</title>
            </Head>
            <PageTemplate>
                <div className="flex justify-center flex-col h-screen">
                    <BannerTitle title="404" />
                    <div className="text-center">
                        <p className="max-w-[30ch] mx-auto mb-4 mt-12">
                            Siden findes desværre ikke. Hvis du har fulgt et
                            link hertil, kan det være indholdet er blevet taget
                            ned.
                        </p>
                        <Button arrow="right" href="/" internal>
                            Til forsiden
                        </Button>
                    </div>
                </div>
            </PageTemplate>
        </>
    )
}

export default NotFound
