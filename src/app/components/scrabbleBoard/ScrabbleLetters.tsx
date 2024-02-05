"use client"

import React, { ReactNode } from "react"
import ScrabbleRow from "./ScrabbleRow"
import ScrabbleLetterTile from "./ScrabbleLetterTile"
import { Entry } from "@/app/models/Entry"

export default function ScrabbleLetters(
    { grid, newEntry, selectedEntry, width }:
    { grid: string[][], newEntry: Entry|null, selectedEntry: Entry|null, width: number }
) {

    const [tiles, setTiles] = React.useState<ReactNode|null>(null)

    React.useEffect(() => {
        const gridTiles = grid.map((row, y) => {
            const cols = row.map((col, x) => {
                let letter = col
                let conflict = false
                let selected = false
                
                if (newEntry && newEntry.letterAtCoord([y, x])) {
                    letter = newEntry.letterAtCoord([y, x]) || ""
                    conflict = newEntry.conflict
                } else if (selectedEntry && selectedEntry.letterAtCoord([y, x])) {
                    selected = true
                }

                return <ScrabbleLetterTile key={x} size={width / grid.length} letter={letter} conflict={conflict} selected={selected} />
            })

            return <ScrabbleRow key={y} width={width}>{ cols }</ScrabbleRow>
        })
        
        setTiles(gridTiles)
    }, [newEntry, selectedEntry, grid, width])

    return (
        <div className="absolute inset-0">
            { tiles }
        </div>
    )
}