"use client"

import React, { MouseEvent, ReactNode } from "react"
import ScrabbleRow from "./ScrabbleRow"
import ScrabbleLetterTile from "./ScrabbleLetterTile"
import { Solution } from "@/app/models/Solution"

export default function ScrabbleLetters(
  { grid, width, blankTiles, selectedSolution, updateGrid, moveLetter }:
  { grid: string[][], width: number, blankTiles?: number[][], updateGrid?: Function, selectedSolution?: Solution | null, moveLetter?: Function }
) {

  const [tiles, setTiles] = React.useState<ReactNode | null>(null)
  const [blankTilesGrid, setBlankTilesGrid] = React.useState<boolean[][] | null>(null)

  React.useEffect(() => {
    if (!blankTiles)
      return

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

        let solution = false
        let blank = blankTilesGrid ? blankTilesGrid[y][x] : false
        let blur = false

        if (selectedSolution) {
          if (selectedSolution.entry.letterAtCoord([y, x])) {
            letter = selectedSolution.entry.letterAtCoord([y, x]) || ""
            solution = true

            if (selectedSolution.isLetterBlank([y, x]))
              blank = true
          } else {
            blur = true
          }
        }

        return <ScrabbleLetterTile
          updateGrid={updateGrid ? () => updateGrid([y, x]) : undefined}
          moveLetter={moveLetter ? (e: MouseEvent | TouchEvent) => moveLetter(e, [y, x], letter) : undefined}
          key={x}
          size={width / grid.length}
          letter={letter}
          solution={solution}
          blank={blank}
          blur={blur}
        />
      })

      return <ScrabbleRow key={y} width={width}>{cols}</ScrabbleRow>
    })

    setTiles(gridTiles)
  }, [selectedSolution, blankTilesGrid, grid, width, updateGrid, moveLetter])

  return (
    <div className="absolute inset-0">
      {tiles}
    </div>
  )
}