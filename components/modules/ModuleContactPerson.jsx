import ContactPersonCard from "components/ContactPersonCard"

export default function ModuleContactPerson({ module }) {
    return (
        <div className="mb-20 lg:mb-32">
            <ContactPersonCard {...module} />
        </div>
    )
}
