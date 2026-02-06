import classNames from "classnames"

export default function SplitRow({ left, right, topBorder }) {
    return (
        <div
            className={classNames(
                "border-b py-10 lg:py-14 border-black-full border-opacity-10 justify-center",
                {
                    "border-t": topBorder,
                },
            )}>
            <div className="container mx-auto">
                <div className="site-grid">
                    <div className="col-span-full lg:col-auto">{left}</div>
                    <div className="col-span-full lg:col-span-4 lg:col-start-9">
                        {right}
                    </div>
                </div>
            </div>
        </div>
    )
}
