import { classNames } from "lib/helpers"
import PortableText from "react-portable-text"

export default function ModuleTable({
    module,
    small,
    headerClassName,
    previousModule,
}) {
    const { title, columns, notes } = module
    const removeTopSpacing = ["modulePromo", "moduleTable"].includes(
        previousModule?._type,
    )
    const largest = [...columns].sort(
        (ac, bc) => ac.rows.length - bc.rows.length,
    )[0]

    return (
        <div
            className={classNames("pb-20 mb-10 lg:pb-32", {
                "pt-20 lg:pt-32": !removeTopSpacing,
            })}>
            <div className="container mx-auto">
                <div className="site-grid overflow-x-auto">
                    <table
                        className={classNames(
                            "col-span-full  border-collapse border border-black-almost border-opacity-20 table-fixed",
                            {
                                "lg:col-span-8 lg:col-start-3": !small,
                                "lg:col-span-6 lg:col-start-4": small,
                            },
                        )}>
                        <thead>
                            <tr className="title text-center">
                                <th
                                    className={classNames(
                                        "font-display py-7 text-lg px-4",
                                        headerClassName ||
                                            "bg-green-dark text-white",
                                    )}
                                    colSpan={columns.length}>
                                    {title}
                                </th>
                            </tr>
                            <tr>
                                {columns.map((c, i) => (
                                    <th
                                        style={{
                                            width: `${100 / columns.length}%`,
                                        }}
                                        className="text-center font-display text-base py-4 border border-black-almost border-opacity-20"
                                        key={i}>
                                        {c.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {largest.rows.map((_, i) => (
                                <tr key={i}>
                                    {columns.map((c, columnIndex) =>
                                        c.rows[i] ? (
                                            <td
                                                className="py-2 lg:py-4 lg:px-10 px-6 border border-black-almost border-opacity-20"
                                                key={`${columnIndex}-${i}`}>
                                                {c.rows[i]}
                                            </td>
                                        ) : null,
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="site-grid">
                    {notes && (
                        <PortableText
                            content={notes}
                            className={classNames(
                                "col-span-full  pt-3 text-xs opacity-50 leading-[1.4]",
                                {
                                    "lg:col-span-7 lg:col-start-3": !small,
                                    "lg:col-span-6 lg:col-start-4": small,
                                },
                            )}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
