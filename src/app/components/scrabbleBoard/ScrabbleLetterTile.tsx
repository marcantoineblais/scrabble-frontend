"use client"

import React from "react"

export default function ScrabbleLetterTile({ size, letter }: { size: number, letter: string }) {

    const [background, setBackground] = React.useState("")
    const tileRef = React.useRef<HTMLDivElement|null>(null)

    React.useEffect(() => {
        if (!tileRef.current)
            return

        const tile = tileRef.current
        tile.style.width = size + "px"
        tile.style.height = size + "px"
        tile.style.fontSize = size * 0.6 + "px"
    }, [size])

    React.useEffect(() => {
        if (letter)
            setBackground("bg-tile-texture")
        else
            setBackground("")
    }, [letter])

    return (
        <div 
            ref={tileRef}
            className={`w-full h-full flex justify-center items-center text-center border text-white overflow-hidden ${background}`}
        >
            { letter }
        </div>
    )
}