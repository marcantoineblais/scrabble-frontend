"use client"

import type { ReactElement } from 'react'
import React from 'react'
import GridRow from './GridRow'

export default function ScrabbleGrid() {
    
    const tripleWord: number[][] = [[0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14]]
    const doubleWord: number[][] = [[1, 1], [1, 13], [2, 2], [2, 12], [3, 3], [3, 11], [4, 4], [4, 10], [10, 4], [10, 10], [11, 3], [11, 11], [12, 2], [12, 12], [13, 1], [13, 13]]
    const tripleLetter: number[][] = [[1, 5], [1, 9], [5, 1], [5, 5], [5, 9], [5, 13], [9, 1], [9, 5], [9, 9], [9, 13], [13, 5], [13, 9]]
    const doubleLetter: number[][] = [[0, 3], [0, 11], [2, 6], [2, 8], [3, 0], [3, 7], [3, 14], [6, 2], [6, 6], [6, 8], [6, 12], [7, 3], [7, 11], [8, 2], [8, 6], [8, 8], [8, 12], [11, 0], [11, 7], [11, 14], [12, 6], [12, 8], [14, 3], [14, 11]]
    
    const [boardLetters, setBoardLetters] = React.useState(Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => "")))
    const [playerLetters, setPlayerLetters] = React.useState("")
    const [bonus, setBonus] = React.useState(Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => "")))
    const [backgrounds, setBackgrounds] = React.useState(Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => "")))
    const [overlays, setOverlays] = React.useState(Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => "")))
    const [selectedTile, setSelectedTile] = React.useState<{y: number, x: number, vertical: boolean}>({ y: -1, x: -1, vertical: false })
    const [gridRows, setGridRows] = React.useState<React.JSX.Element[]>([])
    

    React.useEffect(() => {
        const bonusTexts = bonus
        const bonusBackgrounds = backgrounds

        bonus.forEach((row, y) => {
            row.forEach((_col, x) => {
                if (y === 7 && x === 7) {
                    bonusTexts[y][x] = String.fromCharCode(9733)
                    bonusBackgrounds[y][x] = "bg-orange-300 text-[3rem] -mt-4"
                } else if (tripleWord.some(([i, j]) => i === y && j === x)) {
                    bonusTexts[y][x] = "MOT COMPTE TRIPLE" 
                    bonusBackgrounds[y][x] = "bg-red-700 text-xs"
                } else if (doubleWord.some(([i, j]) => i === y && j === x)) {
                    bonusTexts[y][x] = "MOT COMPTE DOUBLE"  
                    bonusBackgrounds[y][x] = "bg-red-300 text-xs"
                } else if (tripleLetter.some(([i, j]) => i === y && j === x)) {
                    bonusTexts[y][x] = "LETTRE COMPTE TRIPLE"  
                    bonusBackgrounds[y][x] = "bg-sky-900 text-xs"
                } else if (doubleLetter.some(([i, j]) => i === y && j === x)) {
                    bonusTexts[y][x] = "LETTRE COMPTE DOUBLE"  
                    bonusBackgrounds[y][x] = "bg-sky-300 text-xs"
                } else {
                    bonusTexts[y][x] = ""
                    bonusBackgrounds[y][x] = "bg-orange-300"
                }
            })
        })

        setBonus(bonusTexts)
        setBackgrounds(bonusBackgrounds)
    }, [])

    React.useEffect(() => {
        const tileOverlay = overlays

        overlays.forEach((row, y) => {
            row.forEach((_el, x) => {
                if (selectedTile.y == y && selectedTile.x == x)
                    tileOverlay[y][x] = "bg-black opacity-75"
                else if (selectedTile.x == x && selectedTile.vertical)
                    tileOverlay[y][x] = "bg-black opacity-25"
                else if (selectedTile.y == y && !selectedTile.vertical)
                    tileOverlay[y][x] = "bg-black opacity-25"
                else
                    tileOverlay[y][x] = ""
            }) 
        })

        setOverlays(tileOverlay)
    }, [selectedTile])

    React.useEffect(() => {
        const rows = Array.from({length: 15}).map((_el, i) => {      
            return (
                <GridRow 
                    key={i} 
                    letters={boardLetters[i]} 
                    bonus={bonus[i]} 
                    backgrounds={backgrounds[i]} 
                    overlays={overlays[i]} 
                    y={i}
                    selectBoardTile={selectBoardTile}
                />
            )
        })
    
        setGridRows(rows)
    }, [selectedTile, overlays])

    function selectBoardTile(y: number, x: number) {
        let isVertical = selectedTile.vertical
        
        if (selectedTile.y == y && selectedTile.x == x)
            isVertical = !isVertical

        setSelectedTile({ y: y, x: x, vertical: isVertical })
    }

    async function submitGrid() {
        const url = "http://localhost:8080/bygrid"
        const body = {
            grid: boardLetters,
            playerLetters: playerLetters,
            language: "french",
            doubleLetter: doubleLetter,
            tripleLetter: tripleLetter,
            doubleWord: doubleWord,
            tripleWord: tripleWord
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            const data = await response.json()
            console.log(data);  
        } catch (ex: any) {
            console.log(ex.message);          
        }
    }
    
    return (
        <div className='flex flex-col items-center justify-center p-3'>
            <div className='flex flex-col items-center justify-center p-1'>
                { gridRows }
            </div>
            <input
                type="text"
                onChange={(e) => setPlayerLetters(e.currentTarget.value)}
                onFocus={() => setSelectedTile({ y: -1, x: -1, vertical: false })}
            />
            <button onClick={() => submitGrid()}>SEND</button>
        </div>
    ) 
}