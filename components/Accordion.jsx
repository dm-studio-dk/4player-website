import { useState } from "react"
import PortableText from "react-portable-text"
import { classNames } from "../lib/helpers"

export default function Accordion({ title, items = [], className }) {
    return (
        <div className={classNames("bg-green-light py-12 my-12", className)}>
            <div className="site-grid container mx-auto">
                <h2 className="font-display text-2xl col-span-full lg:col-span-6 lg:col-start-4 border-b-2 border-black-almost border-opacity-10 pb-4">
                    {title}
                </h2>
            </div>
            {items.map((item, i) => (
                <AccordionItem
                    key={item._key}
                    title={item.title}
                    isFirst={i == 0}
                    isLast={i === items.length - 1}>
                    {item.body && (
                        <PortableText
                            content={item.body}
                            className="pb-4 -mt-4"
                            serializers={{
                                normal: (props) => (
                                    <p className="text-base mb-4" {...props} />
                                ),
                                navLink: (props) => (
                                    <pre>{JSON.stringify(props, null, 10)}</pre>
                                ),
                            }}
                        />
                    )}
                </AccordionItem>
            ))}
        </div>
    )
}

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className=" ">
            <div className="site-grid container mx-auto">
                <h3
                    className={classNames(
                        "text-lg py-8 cursor-pointer flex justify-between items-start col-span-full lg:col-span-6 lg:col-start-4",
                    )}
                    onClick={() => setIsOpen((v) => !v)}>
                    <span className="pr-10">{title}</span>
                    <div className="w-8 h-8 block flex-shrink-0 select-none">
                        <img
                            src="/assets/icons/plus.svg"
                            className={classNames(
                                "transition-all duration-200 ease-in-out",
                                {
                                    " rotate-[135deg]": isOpen,
                                },
                            )}
                        />
                    </div>
                </h3>
            </div>
            <div className="content site-grid container mx-auto">
                <div
                    className={classNames(
                        "inner col-span-full lg:col-span-6 lg:col-start-4",
                        "border-b-2 border-black-almost border-opacity-10 pr-10",
                    )}>
                    {isOpen && children}
                </div>
            </div>
        </div>
    )
}
