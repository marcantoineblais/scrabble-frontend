"use client"

import React from 'react'
import GridRow from './GridRow'
import { postRequest } from '../utilities/utilities'

export default function Game({ gridType }: { gridType: GridType }) {
    
    const [boardLetters, setBoardLetters] = React.useState(Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => "")))
    const [playerLetters, setPlayerLetters] = React.useState("")
    const [word, setWord] = React.useState("")
    
    const [overlaysText, setOverlaysText] = React.useState(Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => "")))
    const [overlaysBackground, setOverlaysBackground] = React.useState(Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => "")))
    const [selectedTile, setSelectedTile] = React.useState<{y: number, x: number, vertical: boolean}>({ y: -1, x: -1, vertical: false })
    const [gridRows, setGridRows] = React.useState<React.JSX.Element[]>([])
    const wordInputRef = React.useRef<HTMLInputElement|null>(null)


    React.useEffect(() => {
        const tileOverlayBackground = overlaysBackground.map(el => el.map(e => e))

        overlaysBackground.forEach((row, y) => {
            row.forEach((_el, x) => {
                if (overlaysText[y][x].length > 0)
                    tileOverlayBackground[y][x] = "bg-tile-texture"
                else if (selectedTile.y == y && selectedTile.x == x)
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
    }, [backgrounds, selectedTile, overlaysText, overlaysBackground])

    React.useEffect(() => {  
        const y = selectedTile.y
        const x = selectedTile.x
        const isVertical = selectedTile.vertical
        const updatedOverlayedLetters = Array.from({length: 15}).map(() => Array.from({length: 15}).map(() => ""))

        if (y < 0 || x < 0)
            return

        word.split("").forEach((letter, i) => {
            if (isVertical && y + i >= boardLetters.length || !isVertical && x + i >= boardLetters[y].length)
                return

            if (isVertical)
                updatedOverlayedLetters[y + i][x] = letter
            else 
                updatedOverlayedLetters[y][x + i] = letter
        })

        setOverlaysText(updatedOverlayedLetters)
    }, [word, selectedTile])

    React.useEffect(() => {
        const wordInput = wordInputRef.current

        if (wordInput)
            wordInput.value = word
    }, [word])

    function selectBoardTile(y: number, x: number) {
        let isVertical = selectedTile.vertical
        
        if (selectedTile.y == y && selectedTile.x == x)
            isVertical = !isVertical

        setSelectedTile({ y: y, x: x, vertical: isVertical })
    }

    function updateWordInput() {
        const wordInput = wordInputRef.current

        if (wordInput) {
            const word = wordInput.value.toUpperCase()
            setWord(word)
        }
    }

    function addWordToGrid() {
        const updatedBoardLetters = boardLetters.map(el => el.map(e => e))
        let isValid = true;

        for (let y = 0; y < overlaysText.length; y++) {
            for (let x = 0; x < overlaysText[y].length; x++) {
                const letter = overlaysText[y][x];

                if (letter.length > 0) {
                    if (boardLetters[y][x].length > 0 && boardLetters[y][x] !== letter) {
                        alert("Mot invalide") // NEED TO PREVENT WORD FROM BEEING ADDED
                        return
                    } else {
                        updatedBoardLetters[y][x] = letter
                    }
                }
            }
        }

        setBoardLetters(updatedBoardLetters)
        setWord("")
    }

    async function submitGrid() {
        const body = {
            grid: JSON.stringify(boardLetters),
            playerLetters: playerLetters,
            gridType: gridType
        }
        
        try {    
            const response = await postRequest("/grid", JSON.stringify(body))
            const data = await response.json()
            console.log(data)
        } catch (ex) {
            console.error(ex)
            return;
        }

    }
    
    return (
        <div className='flex flex-col items-center justify-center p-3'>
            <div className='flex flex-col items-center justify-center p-1' onClick={() => wordInputRef.current?.focus()}>
                { gridRows }
            </div>

            <div className='p-3 flex justify-center items-center gap-3'>
                <h2>Ajouter un mot</h2>
                <input
                    type="text"
                    ref={wordInputRef}
                    onChange={() => updateWordInput()}
                />
                <button onClick={() => addWordToGrid()}>Submit</button>
            </div>

            <div className='flex justify-center items-center gap-3'>
                <h2>Vos lettres</h2>
                <input
                    type="text"
                    onChange={(e) => setPlayerLetters(e.currentTarget.value)}
                    onFocus={() => setSelectedTile({ y: -1, x: -1, vertical: false })}
                    maxLength={7}
                />
            </div>

            <button onClick={() => submitGrid()}>SEND</button>
        </div>
    ) 
}