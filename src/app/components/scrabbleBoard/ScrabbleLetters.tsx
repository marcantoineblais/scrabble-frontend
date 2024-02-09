"use client"

import React, { ReactNode } from "react"
import ScrabbleRow from "./ScrabbleRow"
import ScrabbleLetterTile from "./ScrabbleLetterTile"
import { Entry } from "@/app/models/Entry"

export default function ScrabbleLetters(
    { grid, width, newEntry = null, selectedEntry = null, selectedSolution= null }:
    { grid: string[][], width: number, newEntry?: Entry|null, selectedEntry?: Entry|null, selectedSolution?: Entry|null }
) {

    const [tiles, setTiles] = React.useState<ReactNode|null>(null)

    React.useEffect(() => {
        const gridTiles = grid.map((row, y) => {
            const cols = row.map((col, x) => {
                let letter = col
                let conflict = false
                let selected = false
                let solution = false
                
                if (selectedSolution && selectedSolution.letterAtCoord([y, x])) {
                    letter = selectedSolution.letterAtCoord([y, x]) || ""
                    solution = true
                } else if (newEntry && newEntry.letterAtCoord([y, x])) {
                    letter = newEntry.letterAtCoord([y, x]) || ""
                    conflict = newEntry.conflict
                } else if (selectedEntry && selectedEntry.letterAtCoord([y, x])) {
                    selected = true
                }

                return <ScrabbleLetterTile key={x} size={width / grid.length} letter={letter} conflict={conflict} selected={selected} solution={solution} />
            })

            return <ScrabbleRow key={y} width={width}>{ cols }</ScrabbleRow>
        })
        
        setTiles(gridTiles)
    }, [newEntry, selectedEntry, selectedSolution, grid, width])

    return (
        <div className="absolute inset-0">
            { tiles }
        </div>
    )
}