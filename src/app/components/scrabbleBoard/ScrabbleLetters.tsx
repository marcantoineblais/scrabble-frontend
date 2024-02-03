"use client"

import React, { ReactNode } from "react"
import ScrabbleRow from "./ScrabbleRow"
import ScrabbleLetterTile from "./ScrabbleLetterTile"
import { Entry } from "@/app/models/Entry"

export default function ScrabbleLetters(
    { grid, newEntry, selectedEntry, width }:
    { grid: string[][], newEntry: Entry|null, selectedEntry: Entry|undefined, width: number }
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
                }

                if (selectedEntry && selectedEntry.letterAtCoord([y, x]))
                    selected = true

                return <ScrabbleLetterTile key={x} size={width / 15} letter={letter} conflict={conflict} selected={selected} />
            })

            return <ScrabbleRow key={y} width={width}>{ cols }</ScrabbleRow>
        })
        
        setTiles(gridTiles)
    }, [newEntry, selectedEntry, grid, width])

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0">
            { tiles }
        </div>
    )
}