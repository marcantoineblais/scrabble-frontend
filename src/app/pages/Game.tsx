"use client"

import React from "react"
import ScrabbleBoardContainer from "../components/scrabbleBoard/ScrabbleBoardContainer"
import ScrabbleBoard from "../components/scrabbleBoard/ScrabbleBoard"
import { getRequest } from "../utilities/utilities"

export default function Game({ setPage }: { setPage: Function }) {

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

    return (
        <ScrabbleBoardContainer setWidth={setWidth}>
            { gameOptions ? <ScrabbleBoard width={width} gridType={gameOptions.gridTypes[0]} /> : null }
        </ScrabbleBoardContainer>
    )
}