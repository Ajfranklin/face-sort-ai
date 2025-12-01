import { useEffect, useState } from "react"

const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState<"xs" | "sm" | "md" | "lg">("lg")

    const update = () => {
        const width = window.innerWidth
        if(width >=  1024) setBreakpoint("lg")
        else if (width >= 768) setBreakpoint("md")
        else if (width >= 640) setBreakpoint("sm")
        else setBreakpoint("xs")
    }

    useEffect(() => {
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    return breakpoint
}

export default useBreakpoint