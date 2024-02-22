"use client"

import React from "react"

export default function ScrabbleLetterTile(
    { size, letter, conflict, selected, solution, blank}:
    { size: number, letter: string, conflict: boolean, selected: boolean, solution: boolean, blank: boolean }
) {

    const [background, setBackground] = React.useState<string>("")
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
        if (conflict)
            setBackground("bg-red-700 opacity-75")
        else if (solution)
            setBackground("bg-teal-700")
        else if (selected)
            setBackground("bg-neutral-700")
        else if (letter)
            setBackground("bg-tile-texture")
        else
            setBackground("")
    }, [letter, conflict, selected, solution])

    return (
        <div 
            ref={tileRef}
            className={`w-full h-full flex justify-center items-center text-center border text-white overflow-hidden ${background}`}
        >
            { blank ? "(" + letter + ")" : letter }
        </div>
    )
}