"use client"

import React, { ReactNode } from "react"

export default function ScrabbleBoardRow({ children, width }: { children: ReactNode, width: number}) {

    const rowRef = React.useRef<HTMLDivElement|null>(null)

    React.useEffect(() => {
        if (!rowRef.current)
            return

        const row = rowRef.current
        row.style.width = width + "px"
        row.style.height = width / 15 + "px"
    }, [width])

    return (
        <div ref={rowRef} className="flex justify-center items-center">
            { children }
        </div>
    )
}