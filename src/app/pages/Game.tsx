"use client"

import React from "react"
import ScrabbleContainer from "../components/scrabbleBoard/ScrabbleContainer"
import ScrabbleBoard from "../components/scrabbleBoard/ScrabbleBoard"
import ScrabbleLetters from "../components/scrabbleBoard/ScrabbleLetters"
import { Grid } from "../models/Grid"

export default function Game({ grid, setPage }: { grid: Grid|null, setPage: Function }) {

    const [width, setWidth] = React.useState<number>(0)

    return (
        <ScrabbleContainer setWidth={setWidth}>
            { grid ? <ScrabbleBoard width={width} gridType={grid.gridType} /> : null }
            { grid ? <ScrabbleLetters grid={grid.grid} width={width}/> : null }
        </ScrabbleContainer>
    )
}