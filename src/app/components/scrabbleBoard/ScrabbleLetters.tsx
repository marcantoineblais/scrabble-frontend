"use client"

import React, { ReactNode } from "react"
import ScrabbleRow from "./ScrabbleRow"
import ScrabbleLetterTile from "./ScrabbleLetterTile"

export default function ScrabbleLetters({ grid, width }: { grid: string[][], width: number }) {

    const [tiles, setTiles] = React.useState<ReactNode|null>(null)

    React.useEffect(() => {
        if (!grid)
            return
        
        const gridTiles = grid.map((row, y) => {
            const cols = row.map((col, x) => {
                return <ScrabbleLetterTile key={x} size={width / 15} letter={col} />
            })

            return <ScrabbleRow key={y} width={width}>{ cols }</ScrabbleRow>
        })

        setTiles(gridTiles)
    }, [grid, width])

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0">
            { tiles }
        </div>
    )
}