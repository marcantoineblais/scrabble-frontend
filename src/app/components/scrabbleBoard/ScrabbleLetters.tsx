"use client"

import React, { ReactNode } from "react"
import ScrabbleRow from "./ScrabbleRow"
import ScrabbleLetterTile from "./ScrabbleLetterTile"
import { Solution } from "@/app/models/Solution"

export default function ScrabbleLetters(
  { grid, tempGrid, width, blankTiles, selectedSolution = null, updateSelectedTile = () => false, updateGrid = () => false }:
    { grid: string[][], tempGrid: string[][], width: number, blankTiles: number[][], updateSelectedTile?: Function, updateGrid?: Function, selectedSolution?: Solution | null }
) {

  const [tiles, setTiles] = React.useState<ReactNode | null>(null)
  const [blankTilesGrid, setBlankTilesGrid] = React.useState<boolean[][] | null>(null)

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
        if (tempGrid && tempGrid[y][x])
          letter = tempGrid[y][x]

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
          updateSelectedTile={() => updateSelectedTile([y, x])} 
          updateGrid={() => updateGrid([y, x])}
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
  }, [selectedSolution, tempGrid, blankTilesGrid, grid, width])

  return (
    <div className="absolute inset-0">
      {tiles}
    </div>
  )
}