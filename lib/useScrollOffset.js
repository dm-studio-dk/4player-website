import { useScroll, useTransform } from "framer-motion"

export default function useScrollOffset({
    target,
    offset = ["center", "end start"],
}) {
    const { scrollYProgress } = useScroll({
        target,
        offset,
    })
    const yOffset = useTransform(scrollYProgress, [0, 1], [0, -200])

    return { yOffset }
}
