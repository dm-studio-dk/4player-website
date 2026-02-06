import { useEffect, useRef, useState } from "react"
import useOnScreen from "../lib/useOnScreen"

export default function InViewTrigger({ onEnter = () => {}, offset = 0 }) {
    const ref = useRef()
    const onScreen = useOnScreen(ref, offset + "px")
    const [visible, setVisible] = useState()

    useEffect(() => {
        if (!visible && onScreen) {
            onEnter?.()
            setVisible(true)
        }

        if (!onScreen) {
            setVisible(false)
        }
    }, [onScreen, visible])

    return <div ref={ref}></div>
}
