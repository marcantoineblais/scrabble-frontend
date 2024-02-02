"use client"

import { Overlay } from "@/app/models/Overlay"
import React, { ReactNode } from "react"
import ScrabbleRow from "./ScrabbleRow"
import ScrabbleOverlayTile from "./ScrabbleOverlayTile"

export default function ScrabbleOverlay(
    { width, selectedTile, selectedVertical, grid, selectTile }: 
    { width: number, selectedTile: number[]|null, selectedVertical: boolean, grid: string[][], selectTile: Function }
) {

    const [overlayGrid, setOverlayGrid] = React.useState<number[][]|null>(null)
    const [tiles, setTiles] = React.useState<ReactNode|null>(null)

    React.useEffect(() => {
        const overlays: number[][] = []

        grid.forEach((row, y) => {
            overlays[y] = []

            row.forEach((_col, x) => {
                if (selectedTile && y == selectedTile[0] && x == selectedTile[1])
                    overlays[y][x] = Overlay.SELECTED
                else if (selectedTile && selectedVertical && x == selectedTile[1])
                    overlays[y][x] = Overlay.LINE
                else if (selectedTile && !selectedVertical && y == selectedTile[0])
                    overlays[y][x] = Overlay.LINE
                else
                    overlays[y][x] = Overlay.NONE
            })
        })

        setOverlayGrid(overlays)
    }, [selectedTile, selectedVertical])

    React.useEffect(() => {
        if (!overlayGrid)
            return
        
        const gridTiles: ReactNode[] = grid.map((row: string[], y: number) => {
            const cols: ReactNode[] = row.map((_col: string, x: number) => {
                return <ScrabbleOverlayTile key={x} size={width / 15} overlay={overlayGrid[y][x]} coords={[y, x]} selectTile={selectTile} />
            })

            return <ScrabbleRow key={y} width={width}>{ cols }</ScrabbleRow>
        })

        setTiles(gridTiles)
    }, [overlayGrid, width])

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0">
            { tiles }
        </div>
    )
}