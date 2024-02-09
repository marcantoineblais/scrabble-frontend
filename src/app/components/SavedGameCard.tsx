"use client"

import React from "react"
import { Grid } from "../models/Grid"
import ScrabbleContainer from "./scrabbleBoard/ScrabbleContainer"
import ScrabbleBoard from "./scrabbleBoard/ScrabbleBoard"
import ScrabbleLetters from "./scrabbleBoard/ScrabbleLetters"
import WoodenButton from "./WoodenButton"
import ConditionalDiv from "./ConditionalDiv"

export default function SavedGameCard(
    { grid, selectGame, deleteGame = () => false, deleteBtn = false }: 
    { grid: Grid, selectGame: Function, deleteGame?: Function, deleteBtn?: boolean }
) {

    const [width, setWidth] = React.useState<number>(0)
    const containerRef = React.useRef<HTMLDivElement|null>(null)

    React.useEffect(() => {
        if (!containerRef.current)
            return 

        const container = containerRef.current
        container.style.flexBasis = width + "px"
    }, [width])

    return (
        <div className="flex justify-between items-center gap-5 p-1 border border-neutral-900 rounded h-40 bg-orange-100">
            <div className="px-3 py-1 h-full flex flex-col justify-between items-center grow">
                <div className="w-full">
                    <h2 className="font-bold">{ grid.name }</h2>
                    <h2 className="bold">{ grid.language.name.toUpperCase() }</h2>
                </div>
                <ConditionalDiv visible={!deleteBtn} >
                    <WoodenButton text="Reprendre" action={() => selectGame(grid)} />
                </ConditionalDiv>
                <ConditionalDiv visible={deleteBtn} >
                    <WoodenButton text="Supprimer" action={() => deleteGame(grid)} />
                </ConditionalDiv>
            </div>
            <div ref={containerRef} className="w-full h-full">
                <ScrabbleContainer setWidth={setWidth}>
                    <ScrabbleBoard grid={grid.grid} gridType={grid.gridType} width={width}/>
                    <ScrabbleLetters grid={grid.grid} width={width} />
                </ScrabbleContainer>
            </div>
        </div>
    )
}