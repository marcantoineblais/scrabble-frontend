"use client"

import type { ReactElement } from 'react'
import React from 'react'

export default function ScrabbleGrid() {
    
    const tripleWord: number[][] = [[0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14]]
    const doubleWord: number[][] = [[1, 1], [1, 13], [2, 2], [2, 12], [3, 3], [3, 11], [4, 4], [4, 10], [10, 4], [10, 10], [11, 3], [11, 11], [12, 2], [12, 12], [13, 1], [13, 13]]
    const tripleLetter: number[][] = [[1, 5], [1, 9], [5, 1], [5, 5], [5, 9], [5, 13], [9, 1], [9, 5], [9, 9], [9, 13], [13, 5], [13, 9]]
    const doubleLetter: number[][] = [[0, 3], [0, 11], [2, 6], [2, 8], [3, 0], [3, 7], [3, 14], [6, 2], [6, 6], [6, 8], [6, 12], [7, 3], [7, 11], [8, 2], [8, 6], [8, 8], [8, 12], [11, 0], [11, 7], [11, 14], [12, 6], [12, 8], [14, 3], [14, 11]]

    const [gridCellValues, setGridCellValues] = React.useState<string[][]>([[]])
    const [selectedCell, setSelectedCell] = React.useState<{coord: number[]|null, horizontal: boolean}>({ coord: null, horizontal: true })
    const overlayRef = React.useRef<HTMLDivElement|null>(null)
    const tilesRef = React.useRef<HTMLDivElement|null>(null)


    React.useEffect(() => {
        const grid = []
        for (let i = 0; i < 15; i++) {
            const row = []
            for (let j = 0; j < 15; j++) {
                row.push("")
            }
            grid.push(row)
        }
        setGridCellValues(grid)
    }, [])

    React.useEffect(() => {
        if (!overlayRef.current)
            return

        function highlightCells() {
            const rows: HTMLCollection|undefined = overlayRef.current?.children 
            const coord = selectedCell.coord
            if (!rows)
                return

            for (let i: number = 0; i < rows.length; i++) {
                const cols: HTMLCollection = rows[i].children
                for (let j: number = 0; j < cols.length; j++) {
                    cols[j].classList.remove("bg-neutral-950/70", "bg-neutral-950/30")

                    if (!coord)
                        continue

                    if (i === coord[0] && j === coord[1])
                        cols[j].classList.add("bg-neutral-950/70")
                    else if (selectedCell.horizontal && i === coord[0])
                        cols[j].classList.add("bg-neutral-950/30")   
                    else if (!selectedCell.horizontal && j === coord[1])
                        cols[j].classList.add("bg-neutral-950/30")
                }
            }
        }

        function updateGridValues(e: KeyboardEvent) {
            const input: string = e.key.toUpperCase()
            let coord = selectedCell.coord
            
            if (!coord)
                return

            if (input === "ESCAPE")
                coord = null
            else if (input === "ARROWUP" && (coord[0] - 1) >= 0)
                coord[0] -= 1

            else if (input === "ARROWDOWN" && coord[0] + 1 < 15)
                coord[0] += 1

            else if (input === "ARROWLEFT" && coord[1] - 1 >= 0)
                coord[1] -= 1

            else if (input === "ARROWRIGHT" && coord[1] + 1 < 15)
                coord[1] += 1

            else if (input.match(/^[A-Z]{1}$/)) {
                gridCellValues[coord[0]][coord[1]] = input
                
                if (selectedCell.horizontal && coord[1] + 1 < 15)
                    coord[1] += 1
                else if (!selectedCell.horizontal && coord[0] + 1 < 15)
                    coord[0] += 1

            } else if (input === "DELETE") {
                gridCellValues[coord[0]][coord[1]] = ""
                
                if (selectedCell.horizontal && coord[1] + 1 < 15)
                    coord[1] += 1
                else if (!selectedCell.horizontal && coord[0] + 1 < 15)
                    coord[0] += 1

            } else if (input === "BACKSPACE") {
                gridCellValues[coord[0]][coord[1]] = ""
                
                if (selectedCell.horizontal && coord[1] - 1 >= 0)
                    coord[1] -= 1
                else if (!selectedCell.horizontal && coord[0] - 1 >= 0)
                    coord[0] -= 1

            } else if (input === " ")
                selectedCell.horizontal = !selectedCell.horizontal

            selectedCell.coord = coord
            setSelectedCell({...selectedCell})
            setGridCellValues([...gridCellValues])
        }

        highlightCells()
        window.addEventListener("keyup", updateGridValues)

        return () => {
            window.removeEventListener("keyup", updateGridValues)
        }
    }, [selectedCell])

    function selectCell(row: number, col: number) {
        const coord = selectedCell.coord
        const cell: HTMLInputElement = tilesRef.current?.children[row].children[col] as HTMLInputElement;
        
        if (coord && row === coord[0] && col === coord[1])
            selectedCell.horizontal = !selectedCell.horizontal

        cell.focus()
        selectedCell.coord = [row, col]
        setSelectedCell({ ...selectedCell })
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

    function getBackground(row: number, col: number): [string, string] {
        let style: string = ""
        let text: string = ""

        if (col === 7 && row === 7) {
            text = String.fromCharCode(9733)
            style = "text-[3rem] -mt-4"
        }
        else if (tripleWord.some(([i, j]) => i === row && j === col)) {
            style = "bg-red-700 text-xs"
            text = "MOT COMPTE TRIPLE" 
        } else if (doubleWord.some(([i, j]) => i === row && j === col)) {
            style = "bg-red-300 text-xs"
            text = "MOT COMPTE DOUBLE"  
        } else if (tripleLetter.some(([i, j]) => i === row && j === col)) {
            style = "bg-sky-900 text-xs"
            text = "LETTRE COMPTE TRIPLE"  
        } else if (doubleLetter.some(([i, j]) => i === row && j === col)) {
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
                const [style, text]: [string, string]  = getBackground(i, j)
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
        for (let i = 0; i < gridCellValues.length; i++) {
            const row: ReactElement[] = []
            for (let j: number = 0; j < gridCellValues[i].length; j++) {
                const tileBg = gridCellValues[i][j] ? "bg-tile-texture" : ""
                row.push(
                    <input
                        className={`w-12 h-12 select-none border-2 text-orange-50 text-center duration-200 bg-transparent ${tileBg}`}
                        key={j}
                        value={ gridCellValues[i][j] }
                        readOnly
                    ></input>
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
                row.push(
                    <div
                        className="w-12 h-12 select-none cursor-pointer duration-200"
                        key={j}
                        onClick={() => selectCell(i, j)}
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
            <button onClick={() => console.log(gridCellValues)}>View grid</button>
        </div>
    ) 
}