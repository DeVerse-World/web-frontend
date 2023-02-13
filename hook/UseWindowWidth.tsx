import { useEffect, useState } from "react"

export default function useWindowWidth(size: number) {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [setWidth])

    return width > size
}