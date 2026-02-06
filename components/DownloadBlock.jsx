import { classNames, fileUrl } from "../lib/helpers"
import LinesVertical from "./LinesVertical"

export default function DownloadBlock({ small, label, file, title, body }) {
    return (
        <div
            className={classNames({
                "mt-12 mb-12": !small,
                "mt-12 mb-12 lg:my-0": small,
            })}>
            <div className="relative">
                {small ? (
                    <DownloadSmall
                        label={label}
                        file={file}
                        title={title}
                        body={body}
                    />
                ) : (
                    <DownloadBig
                        label={label}
                        file={file}
                        title={title}
                        body={body}
                    />
                )}
            </div>
        </div>
    )
}

function DownloadBig({ label, file, title, body }) {
    return (
        <div className="relative ">
            <LinesVertical />
            <div className="container py-6 mx-auto site-grid">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="container h-full mx-auto site-grid">
                        <div className="h-full col-start-1 bg-white col-span-full lg:col-span-6 lg:col-start-4"></div>
                    </div>
                </div>
                <div className="relative z-10 flex items-center item lg:col-span-6 lg:col-start-4">
                    <div className="pr-20 left">
                        <div className="flex items-center justify-center w-8 h-8 download-icon">
                            <img
                                src="/assets/icons/download.svg"
                                alt="Download icon"
                            />
                        </div>
                        <h3 className="mt-5 text-xl font-display">{title}</h3>
                        <p className="mt-2 mb-0 font-serif text-sm">{body}</p>
                        <a
                            className="inline-block mt-6 text-sm underline"
                            href={fileUrl(file, true)}>
                            {label}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

function DownloadSmall({ label, file, title, body }) {
    return (
        <div className="relative">
            <div className="container left-0 w-full mx-auto site-grid lg:left-1/2 lg:-translate-x-1/2 lg:absolute">
                <div className="relative pb-4 text-2xl leading-7 col-span-full lg:col-span-3 lg:pb-8 lg:pr-4">
                    <div className="flex items-center justify-center w-8 h-8 download-icon">
                        <img
                            src="/assets/icons/download.svg"
                            alt="Download icon"
                            className=""
                        />
                    </div>
                    <h3 className="mt-5 font-display">{title}</h3>
                    <p className="mt-2 mb-0 font-serif text-sm">{body}</p>
                    <a
                        className="inline-block mt-6 text-sm underline"
                        href={fileUrl(file, true)}>
                        {label}
                    </a>
                </div>
            </div>
        </div>
    )
}
