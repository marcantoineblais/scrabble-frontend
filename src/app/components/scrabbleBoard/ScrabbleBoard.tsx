"use client"

import React, { MutableRefObject, ReactNode } from "react"
import ScrabbleBoardTile from "./ScrabbleBoardTile"
import { Bonus } from "@/app/models/Bonus"

export default function ScrabbleBoard({ gridType }: { gridType: GridType }) {

    const [bonus, setBonus] = React.useState<number[][]|null>(null)
    const [tiles, setTiles] = React.useState<ReactNode|null>(null)

    React.useEffect(() => {
        const bonusOnGrid = Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => Bonus.NONE))

        gridType.doubleLetter.forEach(([y, x]) => bonusOnGrid[y][x] = Bonus.DOUBLE_LETTER)
        gridType.tripleLetter.forEach(([y, x]) => bonusOnGrid[y][x] = Bonus.TRIPLE_LETTER)
        gridType.doubleWord.forEach(([y, x]) => bonusOnGrid[y][x] = Bonus.DOUBLE_WORD)
        gridType.tripleWord.forEach(([y, x]) => bonusOnGrid[y][x] = Bonus.TRIPLE_WORD)
        bonusOnGrid[7][7] = Bonus.CENTER

        setBonus(bonusOnGrid)
    }, [gridType])

    React.useEffect(() => {
        if (!bonus)
            return

        const gridTiles = Array.from({length: 15}).map((_row, y) => {
            const cols = Array.from({length: 15}).map((_col, x) => {
                return <ScrabbleBoardTile key={x} bonus={bonus[y][x]} />
            })

            return <div key={y} className="w-full flex flex-grow">
                { cols }
            </div>
        })

        setTiles(gridTiles)
    }, [bonus])

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex-grow">
            { tiles }
        </div>
    )
}