import ContactPersonCard from "../ContactPersonCard"
import PartnerHero from "../PartnerHero"
import PartnerRenderer from "../PartnerRenderer"
import MorePartners from "../MorePartners"

export default function PartnerTemplate({ page, preview, children }) {
    return (
        <>
            <PartnerHero partner={page} />
            {children ||
                (page.body && (
                    <PartnerRenderer body={page.body} preview={preview} />
                ))}
            {page.contact?.person ? (
                <ContactPersonCard {...page.contact} className="mt-16" />
            ) : (
                <div className="spacer pb-40" />
            )}
            <MorePartners partners={page.relatedPartners} />
        </>
    )
}
