"use client"

import type { ReactElement } from 'react'
import React from 'react'

export default function ScrabbleGrid() {
    
    const [gridCellValues, setGridCellValues] = React.useState<string[]>([])

    const [selectedCell, setSelectedCell] = React.useState<{index : number | null, horizontal: boolean}>({ index: null, horizontal: true })
    const gridRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        if (!gridRef.current)
            return

        function highlightCells() {
            const rows : HTMLCollection | undefined = gridRef.current?.children 

            if (!rows || !selectedCell.index)
                return

            for (let i : number = 0; i < rows.length; i++) {
                const cols : HTMLCollection = rows[i].children
                for (let j : number = 0; j < cols.length; j++) {
                    if (selectedCell.horizontal) {
                        if (i === Math.floor(selectedCell.index / 15)) {
                            cols[j].classList.add("bg-orange-300")
                            cols[j].classList.remove("bg-cyan-600")
                        } else {
                            cols[j].classList.remove("bg-cyan-600")
                            cols[j].classList.remove("bg-orange-300")
                        }

                    } else {
                        if (j === selectedCell.index % 15) {
                            cols[j].classList.add("bg-orange-300")
                            cols[j].classList.remove("bg-cyan-600")
                        } else {
                            cols[j].classList.remove("bg-cyan-600")
                            cols[j].classList.remove("bg-orange-300")
                        }
                    }

                    if (i === Math.floor(selectedCell.index / 15) && j === selectedCell.index % 15) {
                        cols[j].classList.add("bg-cyan-600")
                        cols[j].classList.add("bg-orange-300")
                    }
                }
            }
        }

        function updateGridValues(e : KeyboardEvent) {
            const input : string = e.key.toUpperCase()
            
            if (!selectedCell.index)
                return
            
            if (input === "ARROWUP" && (selectedCell.index - 15) >= 0)
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
                else {
                    selectedCell.index = null
                }

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
                else {
                    selectedCell.index = null
                }

            } else if (input === " ")
                selectedCell.horizontal = !selectedCell.horizontal

            setSelectedCell({ index: selectedCell.index, horizontal: selectedCell.horizontal })
            setGridCellValues([...gridCellValues])
        }

        highlightCells()
        window.addEventListener("keyup", updateGridValues)

        return () => {
            window.removeEventListener("keyup", updateGridValues)
        }
    }, [selectedCell])

    function selectCell(index : number) {
        let direction : string
        if (index === selectedCell.index && selectedCell.horizontal)
            direction = "vertical"
        else
            direction = "horizontal"

        setSelectedCell({ index: index, horizontal: direction === "horizontal" })
    }

    function drawGrid() : ReactElement[] {
        const cols : ReactElement[] = []
        for (let i : number = 0; i < 15; i++) {
            const row : ReactElement[] = []
            for (let j : number = 0; j < 15; j++) {
                const index : number = (i * 15) + j
                row.push(
                    <div
                        className='w-8 h-8 border border-slate-950 cursor-pointer flex justify-center items-center select-none'
                        key={j}
                        onClick={() => selectCell(index)}
                    >
                        { gridCellValues[index] }
                    </div>
                )
            }
            cols.push(<div className='flex' key={i}>{ row }</div>)
        }

        return cols
    }
    
    return (
        <div ref={gridRef} className='flex flex-col items-center justify-center p-3'>
            { drawGrid() }
        </div>
    ) 
}