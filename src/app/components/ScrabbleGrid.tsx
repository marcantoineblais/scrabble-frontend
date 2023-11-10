"use client"

import React from 'react'
import GridRow from './GridRow'
import Word from './Word'

export default function ScrabbleGrid() {
    
    const tripleWord: number[][] = [[0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14]]
    const doubleWord: number[][] = [[1, 1], [1, 13], [2, 2], [2, 12], [3, 3], [3, 11], [4, 4], [4, 10], [10, 4], [10, 10], [11, 3], [11, 11], [12, 2], [12, 12], [13, 1], [13, 13]]
    const tripleLetter: number[][] = [[1, 5], [1, 9], [5, 1], [5, 5], [5, 9], [5, 13], [9, 1], [9, 5], [9, 9], [9, 13], [13, 5], [13, 9]]
    const doubleLetter: number[][] = [[0, 3], [0, 11], [2, 6], [2, 8], [3, 0], [3, 7], [3, 14], [6, 2], [6, 6], [6, 8], [6, 12], [7, 3], [7, 11], [8, 2], [8, 6], [8, 8], [8, 12], [11, 0], [11, 7], [11, 14], [12, 6], [12, 8], [14, 3], [14, 11]]
    
    const [boardLetters, setBoardLetters] = React.useState(Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => "")))
    const [playerLetters, setPlayerLetters] = React.useState("")
    const [word, setWord] = React.useState("")
    const [bonus, setBonus] = React.useState(Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => "")))
    const [backgrounds, setBackgrounds] = React.useState(Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => "")))
    const [overlaysText, setOverlaysText] = React.useState(Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => "")))
    const [overlaysBackground, setOverlaysBackground] = React.useState(Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => "")))
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
                    bonusBackgrounds[y][x] = "bg-red-400 text-xs"
                } else if (tripleLetter.some(([i, j]) => i === y && j === x)) {
                    bonusTexts[y][x] = "LETTRE COMPTE TRIPLE"  
                    bonusBackgrounds[y][x] = "bg-sky-900 text-xs"
                } else if (doubleLetter.some(([i, j]) => i === y && j === x)) {
                    bonusTexts[y][x] = "LETTRE COMPTE DOUBLE"  
                    bonusBackgrounds[y][x] = "bg-sky-400 text-xs"
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
        const tileOverlayBackground = overlaysBackground

        overlaysBackground.forEach((row, y) => {
            row.forEach((_el, x) => {
                if (selectedTile.y == y && selectedTile.x == x)
                    tileOverlayBackground[y][x] = "bg-black opacity-75"
                else if (selectedTile.x == x && selectedTile.vertical)
                    tileOverlayBackground[y][x] = "bg-black opacity-25"
                else if (selectedTile.y == y && !selectedTile.vertical)
                    tileOverlayBackground[y][x] = "bg-black opacity-25"
                else
                    tileOverlayBackground[y][x] = ""
            }) 
        })

        setOverlaysBackground(tileOverlayBackground)
    }, [selectedTile, overlaysText])

    React.useEffect(() => {
        const rows = Array.from({length: 15}).map((_el, i) => {      
            return (
                <GridRow 
                    key={i} 
                    letters={boardLetters[i]} 
                    bonus={bonus[i]} 
                    backgrounds={backgrounds[i]} 
                    overlaysText={overlaysText[i]}
                    overlaysBackground={overlaysBackground[i]} 
                    y={i}
                    clickAction={selectBoardTile}
                    length={15}
                />
            )
        })
    
        setGridRows(rows)
    }, [selectedTile, overlaysText])

    React.useEffect(() => {  
        if (selectedTile.y < 0 || selectedTile.x < 0)
            return

            
        const overlayedLetters = Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => ""))

        word.split("").forEach((letter, i) => {
            if (selectedTile.vertical && selectedTile.y + i >= boardLetters.length || !selectedTile.vertical && selectedTile.x + i >= boardLetters[selectedTile.y].length)
                return

            if (selectedTile.vertical) {
                overlayedLetters[selectedTile.y + i][selectedTile.x] = letter
            } else {
                overlayedLetters[selectedTile.y][selectedTile.x + i] = letter
            }
        })

        setOverlaysText(overlayedLetters)
    }, [word, selectedTile])

    function selectBoardTile(y: number, x: number) {
        let isVertical = selectedTile.vertical
        
        if (selectedTile.y == y && selectedTile.x == x)
            isVertical = !isVertical

        setSelectedTile({ y: y, x: x, vertical: isVertical })
    }

    function addWordToGrid() {
        const updatedBoardLetters = boardLetters

        overlaysText.forEach((row, y) => {
            row.forEach((letter, x) => {
                if (letter.length > 0) {
                    if (boardLetters[y][x].length > 0 && boardLetters[y][x] !== letter) {
                        alert("Mot invalide") // NEED TO PREVENT WORD FROM BEEING ADDED
                        return
                    } else {
                        updatedBoardLetters[y][x] = letter
                    }
                }
            })
        })

        setBoardLetters(updatedBoardLetters)
    }

    function dragWord() {

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

            <Word word={word} clickAction={dragWord} />

            <div className='p-3 flex justify-center items-center gap-3'>
                <h2>Ajouter un mot</h2>
                <input
                    type="text"
                    onChange={(e) => setWord(e.currentTarget.value.toUpperCase())}
                />
                <button onClick={() => addWordToGrid()}>Submit</button>
            </div>

            <div className='flex justify-center items-center gap-3'>
                <h2>Vos lettres</h2>
                <input
                    type="text"
                    onChange={(e) => setPlayerLetters(e.currentTarget.value)}
                    onFocus={() => setSelectedTile({ y: -1, x: -1, vertical: false })}
                />
            </div>

            <button onClick={() => submitGrid()}>SEND</button>
        </div>
    ) 
}