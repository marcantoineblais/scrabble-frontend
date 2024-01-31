"use client"

import React from "react"
import ScrabbleContainer from "../components/scrabbleBoard/ScrabbleContainer"
import ScrabbleBoard from "../components/scrabbleBoard/ScrabbleBoard"
import ScrabbleLetters from "../components/scrabbleBoard/ScrabbleLetters"
import { Grid } from "../models/Grid"
import ScrabbleOverlay from "../components/scrabbleBoard/ScrabbleOverlay"

export default function Game({ grid, setPage }: { grid: Grid, setPage: Function }) {

    const [width, setWidth] = React.useState<number>(0)
    const [selectedTile, setSelectedTile] = React.useState<number[]>([-1, -1])
    const [selectedVertical, setSelectedVertical] = React.useState<boolean>(false)

    function selectTile([y, x]: number[]) {
        if (selectedTile[0] == y && selectedTile[1] == x)
            setSelectedVertical(!selectedVertical)
        else
            setSelectedTile([y, x])
    }

    return (
        <ScrabbleContainer setWidth={setWidth}>
            <ScrabbleBoard width={width} grid={grid.grid} gridType={grid.gridType} />
            <ScrabbleLetters grid={grid.grid} width={width}/>
            <ScrabbleOverlay width={width} selectedTile={selectedTile} selectedVertical={selectedVertical} grid={grid.grid} selectTile={selectTile}/>
        </ScrabbleContainer>
    )
}