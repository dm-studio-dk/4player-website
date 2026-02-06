export default function LinesVertical({ useTheme }) {
    const lineBaseClass = `line ${
        useTheme ? "bg-current-theme-overlay opacity-100" : "bg-black-almost"
    }`
    return (
        <div
            className={
                "line-container absolute top-0 left-0 w-full h-full pointer-events-none"
            }>
            {/* Mobile lines */}
            <div className="container mx-auto h-full w-full">
                <div className="flex justify-between lg:px-[57px] items-stretch w-full h-full">
                    <div className={lineBaseClass}></div>
                    <div className={lineBaseClass}></div>
                    <div className={lineBaseClass}></div>
                    {/* Desktop lines */}
                    <div className={lineBaseClass + " hidden lg:block"}></div>
                    <div className={lineBaseClass + " hidden lg:block"}></div>
                    <div className={lineBaseClass + " hidden lg:block"}></div>
                    <div className={lineBaseClass + " hidden lg:block"}></div>
                    <div className={lineBaseClass + " hidden lg:block"}></div>
                </div>
            </div>
        </div>
    )
}
