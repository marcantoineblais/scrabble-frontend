"use client"

import { Overlay } from "@/app/models/Overlay"
import React, { ReactNode } from "react"
import ScrabbleRow from "./ScrabbleRow"
import ScrabbleOverlayTile from "./ScrabbleOverlayTile"
import { Solution } from "@/app/models/Solution"

export default function ScrabbleOverlay(
    { width, selectedTile, selectedVertical, grid, selectOrToggleTile, selectedSolution }: 
    { width: number, selectedTile: number[]|null, selectedVertical: boolean, grid: string[][], selectOrToggleTile: Function, selectedSolution: Solution|null }
) {

    const [overlayGrid, setOverlayGrid] = React.useState<number[][]|null>(null)
    const [tiles, setTiles] = React.useState<ReactNode|null>(null)

    React.useEffect(() => {
        const overlays: number[][] = []

        grid.forEach((row, y) => {
            overlays[y] = []

            row.forEach((_col, x) => {
                if (selectedSolution && !selectedSolution.entry.letterAtCoord([y, x]))
                    overlays[y][x] = Overlay.BLURRED
                else if (!selectedSolution && selectedTile && y == selectedTile[0] && x == selectedTile[1])
                    overlays[y][x] = Overlay.SELECTED
                else if (!selectedSolution && selectedTile && selectedVertical && x == selectedTile[1])
                    overlays[y][x] = Overlay.LINE
                else if (!selectedSolution && selectedTile && !selectedVertical && y == selectedTile[0])
                    overlays[y][x] = Overlay.LINE
                else
                    overlays[y][x] = Overlay.NONE
            })
        })

        setOverlayGrid(overlays)
    }, [selectedTile, selectedVertical, grid, selectedSolution])

    React.useEffect(() => {
        if (!overlayGrid)
            return
        
        const gridTiles: ReactNode[] = grid.map((row: string[], y: number) => {
            const cols: ReactNode[] = row.map((_col: string, x: number) => {
                return <ScrabbleOverlayTile 
                    key={x} 
                    size={width / grid.length} 
                    overlay={overlayGrid[y][x]} 
                    coords={[y, x]}
                    selectOrToggleTile={selectOrToggleTile}
                />
            })

            return <ScrabbleRow key={y} width={width}>{ cols }</ScrabbleRow>
        })

        setTiles(gridTiles)
    }, [overlayGrid, width, grid, selectOrToggleTile])

    return (
        <div className="absolute inset-0">
            { tiles }
        </div>
    )
}