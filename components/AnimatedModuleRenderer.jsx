import { AnimatePresence, motion, Reorder } from "framer-motion"

export default function AnimatedModuleRenderer({
    modules = [],
    components = {},
}) {
    if (!modules) return null

    return (
        <Reorder.Group axis="y" values={modules}>
            <AnimatePresence>
                {modules?.map((module, index) => {
                    const Component =
                        components[module._type] || components["moduleNotFound"]

                    return (
                        <Reorder.Item
                            value={module}
                            id={module._key}
                            key={module._key}>
                            <motion.div>
                                <Component
                                    module={module}
                                    previousModule={modules[index - 1]}
                                />
                            </motion.div>
                        </Reorder.Item>
                    )
                })}
            </AnimatePresence>
        </Reorder.Group>
    )
}
