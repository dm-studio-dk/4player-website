import Link from "next/link"
import { useRouter } from "next/router"
import { useCurrentUser } from "../lib/sanity"

export default function ExitPreview({ preview }) {
    const { asPath } = useRouter()
    const { data: user } = useCurrentUser()
    if (!preview || !user) return null

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black-almost text-white shadow-lg z-50">
            <Link
                href={"/api/exit-preview?slug=" + asPath}
                className="cursor-pointer hover:opacity-50 p-4 pr-8 flex space-x-4 items-center justify-center">
                <p className="text-xs mb-0 opacity-80">Preview Version</p>
                <p className="text-xs mb-0">Click to exit</p>
            </Link>
        </div>
    )
}
