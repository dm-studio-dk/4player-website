import ContactPersonCard from "../ContactPersonCard"
import PartnerHero from "../PartnerHero"
import PartnerRenderer from "../PartnerRenderer"

export default function PartnerTemplate({ page, preview, children }) {
    return (
        <>
            <PartnerHero partner={page} />
            {children ||
                (page.body && (
                    <PartnerRenderer body={page.body} preview={preview} />
                ))}
            {page.contact?.person ? (
                <ContactPersonCard
                    {...page.contact}
                    className="mt-16 mb-20 lg:mb-32"
                />
            ) : (
                <div className="spacer pb-40" />
            )}
        </>
    )
}
