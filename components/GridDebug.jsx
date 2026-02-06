import classNames from "classnames"
import { useCallback, useState } from "react"

export function GridDebug() {
    const [showGrid, setShowGrid] = useState(false)

    const toggleGrid = useCallback(() => {
        setShowGrid(!showGrid)
    }, [showGrid, setShowGrid])

    const cols = Array.from({ length: 12 }).fill(0)

    return (
        <>
            <div
                className={classNames(
                    "grid-debug fixed top-0 left-0 w-full h-screen pointer-events-none transition-opacity z-40",
                    {
                        hidden: !showGrid,
                    },
                )}>
                <div className="mx-auto h-full">
                    <div className="container mx-auto h-full">
                        <div className="site-grid h-screen">
                            {cols.map((col, index) => (
                                <div
                                    key={index}
                                    className=" bg-orange-light opacity-5"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="trigger fixed bottom-10 left-10 rounded bg-black-almost w-10 h-10 cursor-pointer hover:scale-110 transition-all z-50"
                onClick={toggleGrid}></div>
        </>
    )
}
