import useCookieBot from "lib/useCookieBot"
import { classNames } from "../lib/helpers"
import Button from "./Button"

export default function Embed({ code, className }) {
    // TODO: Set this flag based on the permissions given from the cookie consent script
    const cookiebot = useCookieBot()

    return (
        <div
            key={cookiebot.consent.stamp}
            data-cookieconsent="ignore"
            className={classNames("embed-container ", className)}>
            {cookiebot.consent.marketing ? (
                <div
                    className="iframe-container"
                    dangerouslySetInnerHTML={{ __html: code }}
                />
            ) : (
                <div className="flex flex-col items-center justify-center px-24 text-center border rounded-md border-slate-400 aspect-video">
                    <h3 className="text-2xl font-display">
                        Tilladelse Påkrævet
                    </h3>
                    <p className="text-normal max-w-[50ch] opacity-50 mt-4">
                        For at kunne se dette indhold skal du minimum give
                        samtykke til samling af markedsføringscookies
                    </p>
                    <div className="mt-4">
                        <Button
                            onClick={() => {
                                window.Cookiebot.renew()
                            }}>
                            Ændre samtykke
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
