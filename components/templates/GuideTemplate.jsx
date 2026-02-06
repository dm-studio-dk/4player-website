import ContactPersonCard from "../ContactPersonCard"
import GuideHero from "../GuideHero"
import GuideRenderer from "../GuideRenderer"
import MoreGuides from "../MoreGuides"

export default function GuideTemplate({ page, preview, children }) {
    return (
        <>
            <GuideHero guide={page} />
            {children ||
                (page.body && (
                    <GuideRenderer body={page.body} preview={preview} />
                ))}
            {page.contact?.person ? (
                <ContactPersonCard {...page.contact} className="mt-16" />
            ) : (
                <div className="spacer pb-40" />
            )}
            <MoreGuides guides={page.relatedGuides} />
        </>
    )
}
