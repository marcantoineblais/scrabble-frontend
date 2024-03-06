"use client"

import React from "react"
import { Grid } from "../models/Grid"
import ScrabbleContainer from "./scrabbleBoard/ScrabbleContainer"
import ScrabbleBoard from "./scrabbleBoard/ScrabbleBoard"
import ScrabbleLetters from "./scrabbleBoard/ScrabbleLetters"
import WoodenButton from "./WoodenButton"

export default function SavedGameCard(
  { grid, selectGame, deleteGame = () => false }:
    { grid: Grid, selectGame: Function, deleteGame?: Function }
) {

  const [width, setWidth] = React.useState<number>(0)
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!containerRef.current)
      return

    const container = containerRef.current
    container.style.flexBasis = width + "px"
  }, [width])

  return (
    <div className="w-full h-full flex justify-between gap-3 p-1 border border-neutral-900 rounded bg-orange-100">
      <div className="grow min-h-full flex flex-col items-start gap-7">
        <div className="grow w-full flex flex-col justify-start items-start">
          <h2 className="font-bold">{grid.name}</h2>
          <h2 className="text-sm bold">{grid.language.name.toUpperCase()}</h2>
        </div>

        <div className="w-full flex justify-between gap-1">
          <WoodenButton small={true} text="Reprendre" action={() => selectGame(grid)} />
          <WoodenButton small={true} text="Supprimer" action={() => deleteGame(grid)} />
        </div>
      </div>
      <div ref={containerRef} className="w-full h-full basis-2/5">
        <ScrabbleContainer setWidth={setWidth}>
          <ScrabbleBoard grid={grid.grid} gridType={grid.gridType} width={width} />
          <ScrabbleLetters grid={grid.grid} width={width} blankTiles={grid.blankTiles} />
        </ScrabbleContainer>
      </div>
    </div>
  )
}