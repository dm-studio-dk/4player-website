import ShortNameImage from "components/ShortNameImage"
import SplitRow from "components/SplitRow"
import PortableText from "react-portable-text"

export default function ModulePersonList({ module = {} }) {
    const { title, people = [] } = module

    return (
        <div>
            {title && (
                <div className="container mx-auto">
                    <h2 className="my-10 mt-20 text-2xl font-bold text-left lg:text-4xl font-display">
                        {title}
                    </h2>
                </div>
            )}
            <ul>
                {people?.map((person, index) => (
                    <li key={person._id}>
                        <SplitRow
                            topBorder={index == 0}
                            left={
                                <div className="mb-3 name-section lg:mb-0">
                                    <ShortNameImage
                                        className="block"
                                        person={person}
                                    />
                                </div>
                            }
                            right={
                                <div className="text-lg info-section">
                                    <p className="font-display leading-[1.2]">
                                        {person.name}
                                    </p>
                                    {person.title && <p>{person.title}</p>}
                                    {(person.email || person.phone) && (
                                        <div className="mt-2 contact">
                                            {person.email && (
                                                <p className="text-base">
                                                    <a
                                                        href={`mailto:${person.email}`}>
                                                        {person.email}
                                                    </a>
                                                </p>
                                            )}
                                            {person.phone && (
                                                <p className="text-base">
                                                    <a
                                                        href={`tel:${person.phone}`}>
                                                        {person.phone}
                                                    </a>
                                                </p>
                                            )}
                                            {person.secondPhone && (
                                                <p className="text-base">
                                                    <a
                                                        href={`tel:${person.secondPhone}`}>
                                                        {person.secondPhone}
                                                    </a>
                                                </p>
                                            )}
                                        </div>
                                    )}
                                    {person.bio && (
                                        <PortableText
                                            className="mt-3"
                                            content={person.bio}
                                        />
                                    )}
                                    {person.history && (
                                        <PortableText
                                            className="mt-3"
                                            content={person.history}
                                        />
                                    )}
                                </div>
                            }></SplitRow>
                    </li>
                ))}
            </ul>
        </div>
    )
}
