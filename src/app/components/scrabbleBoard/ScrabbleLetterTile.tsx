"use client"

import React from "react"

export default function ScrabbleLetterTile(
    { size, letter, solution, blank, blur, updateGrid, moveLetter}:
    { size: number, letter: string, solution: boolean, blank: boolean, blur: boolean, updateGrid: Function, moveLetter: Function }
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
        
        if (letter)
          tile.style.boxShadow = `inset 0 ${-size / 25}px ${size / 10}px rgba(255, 247, 237, 0.75)`
        else 
          tile.style.boxShadow = ""
    }, [size, letter])

    React.useEffect(() => {
        let background
        if (solution)
          background = "bg-emerald-700 rounded-sm shadow-emerald-50/25"
        else if (letter && blur)
            background = "bg-tile-texture brightness-50 rounded-sm border border-yellow-700 shadow-orange-50/25 grayscale-[0.1]"
        else if (blur)
            background = "bg-tile-blur brightness-50"
        else if (letter)
            background = "bg-tile-texture rounded-sm border border-yellow-700 shadow-orange-50/25"
        else
            background = ""

        setBackground(background)
    }, [letter, solution, blur])

    return (
        <div 
            ref={tileRef}
            onMouseUp={() => updateGrid()}
            onMouseDown={(e) => moveLetter(e)}
            className={
                `w-full h-full flex justify-center items-center shadow-orange-50/75
                text-center border text-white overflow-hidden
                ${background}`
            }
        >
            { blank ? "(" + letter + ")" : letter }
        </div>
    )
}