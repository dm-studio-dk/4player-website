import Link from "next/link"
import { classNames, path } from "../lib/helpers"

export default function GuideTeaserCard({ guide, className = "" }) {
    return (
        <Link
            href={path(guide.slug.current)}
            className={classNames(
                "hover:opacity-50 transition-all duration-500 site-grid py-8",
                className,
            )}>
            <h3 className="font-display text-2xl lg:text-4xl col-span-full lg:col-auto self-start whitespace-nowrap text-center lg:text-left">
                {guide.title}
            </h3>
            <p className="mt-4 lg:mt-0 col-span-full lg:col-span-4 lg:col-start-5 text-center self-start">
                {guide.subtitle ?? guide.description}
            </p>
            <div className="icon-container hidden lg:flex justify-end lg:col-start-12 self-start">
                <img src="/assets/icons/arrow_right.svg" className="w-8" />
            </div>
        </Link>
    )
}
