"use client"

import React, { ReactNode } from "react"
import ScrabbleRow from "./ScrabbleRow"
import ScrabbleLetterTile from "./ScrabbleLetterTile"
import { Entry } from "@/app/models/Entry"
import { Solution } from "@/app/models/Solution"
import { Solitreo } from "next/font/google"

export default function ScrabbleLetters(
    { grid, width, blankTiles, newEntry = null, selectedEntry = null, selectedSolution= null }:
    { grid: string[][], width: number, blankTiles: number[][], newEntry?: Entry|null, selectedEntry?: Entry|null, selectedSolution?: Solution|null }
) {

    const [tiles, setTiles] = React.useState<ReactNode|null>(null)
    const [blankTilesGrid, setBlankTilesGrid] = React.useState<boolean[][]|null>(null)

    React.useEffect(() => {
        const tileGrid: boolean[][] = grid.map(row => row.map(_col => false))
        
        blankTiles.forEach(([y, x]: number[]) => {
            tileGrid[y][x] = true;
        })
        
        setBlankTilesGrid(tileGrid)
    }, [grid, blankTiles])

    React.useEffect(() => {
        const gridTiles = grid.map((row, y) => {
            const cols = row.map((col, x) => {
                let letter = col
                let conflict = false
                let selected = false
                let solution = false
                let blank = blankTilesGrid ? blankTilesGrid[y][x] : false
                
                if (selectedSolution && selectedSolution.entry.letterAtCoord([y, x])) {
                    letter = selectedSolution.entry.letterAtCoord([y, x]) || ""
                    solution = true

                    if (selectedSolution.isLetterBlank([y, x]))
                        blank = true
                } else if (newEntry && newEntry.letterAtCoord([y, x])) {
                    letter = newEntry.letterAtCoord([y, x]) || ""
                    conflict = newEntry.conflict
                } else if (selectedEntry && selectedEntry.letterAtCoord([y, x])) {
                    selected = true
                }

                return <ScrabbleLetterTile key={x} size={width / grid.length} letter={letter} conflict={conflict} selected={selected} solution={solution} blank={blank} />
            })

            return <ScrabbleRow key={y} width={width}>{ cols }</ScrabbleRow>
        })
        
        setTiles(gridTiles)
    }, [newEntry, selectedEntry, selectedSolution, blankTilesGrid, grid, width])

    return (
        <div className="absolute inset-0">
            { tiles }
        </div>
    )
}