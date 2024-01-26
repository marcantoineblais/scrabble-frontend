"use client"

import React from "react"
import ScrabbleContainer from "../components/scrabbleBoard/ScrabbleContainer"
import ScrabbleBoard from "../components/scrabbleBoard/ScrabbleBoard"
import { emptyRow, getRequest } from "../utilities/utilities"
import ScrabbleLetters from "../components/scrabbleBoard/ScrabbleLetters"

export default function Game({ player, setPage }: { player: Player, setPage: Function }) {

    const [grid, setGrid] = React.useState<string[][]|null>(null)
    const [gameOptions, setGameOptions] = React.useState<GameOptions|null>(null)
    const [width, setWidth] = React.useState<number>(0)

    React.useEffect(() => {
        async function getGameOptions() {
            try {
                const response = await getRequest("/options")
                const gameOptions: GameOptions = await response.json()
                setGameOptions(gameOptions)
            } catch (ex) {
                console.error(ex)
            }
        }

        getGameOptions()
    }, [])

    React.useEffect(() => {
        if (!gameOptions)
            return

        const grid: string[][] = emptyRow(() => emptyRow(() => ""))
        setGrid(grid)
    }, [gameOptions])

    return (
        <ScrabbleContainer setWidth={setWidth}>
            { gameOptions ? <ScrabbleBoard width={width} gridType={gameOptions.gridTypes[0]} /> : null }
            { grid ? <ScrabbleLetters grid={grid} width={width}/> : null }
        </ScrabbleContainer>
    )
}