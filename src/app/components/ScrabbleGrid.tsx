"use client"

import type { ReactElement } from 'react'
import React from 'react'

export default function ScrabbleGrid() {
    
    const tripleWord: number[] = [0, 7, 14, 105, 119, 210, 217, 224]
    const doubleWord: number[] = [16, 28, 32, 42, 48, 56, 64, 70, 154, 160, 168, 176, 182, 192, 196, 208]
    const tripleLetter: number[] = [20, 24, 76, 80, 84, 88, 136, 140, 144, 148, 200, 204]
    const doubleLetter: number[] = [3, 11, 36, 38, 45, 59, 92, 96, 98, 102, 108, 116, 122, 126, 128, 132, 165, 172, 179, 186, 188, 213, 221]

    const [gridCellValues, setGridCellValues] = React.useState<string[]>([])
    const [selectedCell, setSelectedCell] = React.useState<{index: number|null, horizontal: boolean}>({ index: null, horizontal: true })
    const overlayRef = React.useRef<HTMLDivElement|null>(null)
    const tilesRef = React.useRef<HTMLDivElement|null>(null)

    React.useEffect(() => {
        if (!overlayRef.current)
            return

        function highlightCells() {
            const rows: HTMLCollection|undefined = overlayRef.current?.children 

            if (!rows)
                return

            for (let i: number = 0; i < rows.length; i++) {
                const cols: HTMLCollection = rows[i].children
                for (let j: number = 0; j < cols.length; j++) {
                    cols[j].classList.remove("bg-neutral-950/70", "bg-neutral-950/30")

                    if (!selectedCell.index)
                        continue

                    if (i === Math.floor(selectedCell.index / 15) && j === selectedCell.index % 15)
                        cols[j].classList.add("bg-neutral-950/70")
                    else if (selectedCell.horizontal && i === Math.floor(selectedCell.index / 15))
                        cols[j].classList.add("bg-neutral-950/30")   
                    else if (!selectedCell.horizontal && j === selectedCell.index % 15)
                        cols[j].classList.add("bg-neutral-950/30")
                }
            }
        }

        function updateGridValues(e: KeyboardEvent) {
            const input: string = e.key.toUpperCase()
            
            if (!selectedCell.index)
                return

            if (input === "ESCAPE")
                selectedCell.index = null
            else if (input === "ARROWUP" && (selectedCell.index - 15) >= 0)
                selectedCell.index -= 15

            else if (input === "ARROWDOWN" && selectedCell.index + 15 < 15 * 15)
                selectedCell.index += 15

            else if (input === "ARROWLEFT" && (selectedCell.index % 15) - 1 >= 0)
                selectedCell.index -= 1

            else if (input === "ARROWRIGHT" && (selectedCell.index + 1) % 15 !== 0)
                selectedCell.index += 1

            else if (input.match(/^[A-Z]{1}$/)) {
                gridCellValues[selectedCell.index] = input
                
                if (selectedCell.horizontal && (selectedCell.index + 1) % 15 !== 0)
                    selectedCell.index += 1
                else if (!selectedCell.horizontal && selectedCell.index + 15 < 15 * 15)
                    selectedCell.index += 15

            } else if (input === "DELETE") {
                gridCellValues[selectedCell.index] = ""
                
                if (selectedCell.horizontal && (selectedCell.index + 1) % 15 !== 0)
                    selectedCell.index += 1
                else if (!selectedCell.horizontal && selectedCell.index + 15 < 15 * 15)
                    selectedCell.index += 15

            } else if (input === "BACKSPACE") {
                gridCellValues[selectedCell.index] = ""
                if (selectedCell.horizontal && (selectedCell.index % 15) - 1 >= 0)
                    selectedCell.index -= 1
                else if (!selectedCell.horizontal && selectedCell.index - 15 >= 0)
                    selectedCell.index -= 15

            } else if (input === " ")
                selectedCell.horizontal = !selectedCell.horizontal

            setSelectedCell({...selectedCell})
            setGridCellValues([...gridCellValues])
        }

        highlightCells()
        window.addEventListener("keyup", updateGridValues)

        return () => {
            window.removeEventListener("keyup", updateGridValues)
        }
    }, [selectedCell])

    function selectCell(index: number) {
        let direction: string
        if (index === selectedCell.index && selectedCell.horizontal)
            direction = "vertical"
        else
            direction = "horizontal"

        setSelectedCell({ index: index, horizontal: direction === "horizontal" })
    }

    function showBoard(row: number, col: number) {
        const rows: HTMLCollection|undefined = tilesRef.current?.children 

        if (!rows)
            return

        for (let i: number = 0; i < rows.length; i++) {
            const cols: HTMLCollection = rows[i].children
            for (let j: number = 0; j < cols.length; j++) {
                if (i === row && j === col)
                    cols[j].classList.add("opacity-30")
                else
                    cols[j].classList.remove("opacity-30")
            }
        }
    }

    function getBackground(index: number): [string, string] {
        let style: string = ""
        let text: string = ""

        if (index === 112) {
            text = String.fromCharCode(9733)
            style = "text-[3rem] -mt-4"
        }
        else if (tripleWord.includes(index)) {
            style = "bg-red-700 text-xs"
            text = "MOT COMPTE TRIPLE"
        } else if (doubleWord.includes(index)) {
            style = "bg-red-300 text-xs"
            text = "MOT COMPTE DOUBLE"  
        } else if (tripleLetter.includes(index)) {
            style = "bg-sky-900 text-xs"
            text = "LETTRE COMPTE TRIPLE"  
        } else if (doubleLetter.includes(index)) {
            style = "bg-sky-300 text-xs"
            text = "LETTRE COMPTE DOUBLE"  
        }

        return [style, text]
    }

    function drawGrid(): ReactElement[] {
        const cols: ReactElement[] = []
        for (let i: number = 0; i < 15; i++) {
            const row: ReactElement[] = []
            for (let j: number = 0; j < 15; j++) {
                const index: number = (i * 15) + j
                const [style, text]: [string, string]  = getBackground(index)
                row.push(
                    <div
                        className={`pt-1 w-12 h-12 select-none text-center text-orange-50 ${style} `}
                        key={j}
                    >{ text }</div>
                )
            }
            cols.push(<div className='flex' key={i}>{ row }</div>)
        }

        return cols
    }

    function drawTiles(): ReactElement[] {
        const cols: ReactElement[] = []
        for (let i: number = 0; i < 15; i++) {
            const row: ReactElement[] = []
            for (let j: number = 0; j < 15; j++) {
                const index: number = (i * 15) + j
                const tileBg = gridCellValues[index] ? "bg-tile-texture" : ""
                row.push(
                    <div
                        className={`w-12 h-12 flex justify-center items-center select-none border-2 text-orange-50 ${tileBg}`}
                        key={j}
                    > { gridCellValues[index] }</div>
                )
            }
            cols.push(<div className='flex' key={i}>{ row }</div>)
        }

        return cols
    }

    function drawTileOverlay(): ReactElement[] {
        const cols: ReactElement[] = []
        for (let i: number = 0; i < 15; i++) {
            const row: ReactElement[] = []
            for (let j: number = 0; j < 15; j++) {
                const index: number = (i * 15) + j
                row.push(
                    <div
                        className="w-12 h-12 select-none cursor-pointer"
                        key={j}
                        onClick={() => selectCell(index)}
                        onMouseEnter={() => showBoard(i, j)}
                    ></div>
                )
            }
            cols.push(<div className='flex' key={i}>{ row }</div>)
        }

        return cols
    }
    
    return (
        <div className='flex flex-col items-center justify-center p-3'>
            <div onMouseLeave={() => showBoard(-1, -1)} className='relative border-2 border-amber-700 bg-orange-300'> 
                { drawGrid() }
                <div ref={tilesRef} className='absolute top-0'>
                    { drawTiles() }
                </div>
                <div ref={overlayRef} className='absolute top-0'>
                    { drawTileOverlay() }
                </div>
            </div>
        </div>
    ) 
}