"use client"

import React, { ReactNode } from "react"

export default function ScrabbleBoardContainer({ children }: { children: ReactNode }) {

    const containerRef = React.useRef<HTMLDivElement|null>(null)

    React.useEffect(() => {
        function resize() {
            if (!containerRef.current)
                return

            const container = containerRef.current
            container.style.height = container.clientWidth + "px"
        }

        resize()
        window.addEventListener("resize", resize)
        
        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <div ref={containerRef} className="w-full relative border-2 flex justify-center items-center">
            { children }
        </div>
    )
}