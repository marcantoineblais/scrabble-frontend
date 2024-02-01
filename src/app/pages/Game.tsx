"use client"

import React from "react"
import ScrabbleContainer from "../components/scrabbleBoard/ScrabbleContainer"
import ScrabbleBoard from "../components/scrabbleBoard/ScrabbleBoard"
import ScrabbleLetters from "../components/scrabbleBoard/ScrabbleLetters"
import { Grid } from "../models/Grid"
import ScrabbleOverlay from "../components/scrabbleBoard/ScrabbleOverlay"
import { Entry } from "../models/Entry"
import WoodenButton from "../components/WoodenButton"
import FormInput from "../components/FormInput"
import Arrow from "../components/Arrow"

export default function Game({ currentGrid, setPage, setCurrentGrid }: { currentGrid: Grid, setPage: Function, setCurrentGrid: Function }) {

    const [width, setWidth] = React.useState<number>(0)
    const [selectedTile, setSelectedTile] = React.useState<number[]|null>(null)
    const [selectedVertical, setSelectedVertical] = React.useState<boolean>(false)
    const [entries, setEntries] = React.useState<Entry[]>([])
    const [wordToPlace, setWordToPlace] = React.useState<string>("")
    const [playerLetters, setPlayerLetters] = React.useState<string>("")
    const wordTextBoxRef = React.useRef<HTMLInputElement|null>(null)
    const lettersTextBoxRef = React.useRef<HTMLInputElement|null>(null)

    React.useEffect(() => {
        const updatedGrid: string[][] = currentGrid.grid.map(row => row.map(_col => ""))
        entries.forEach(entry => {
            if (entry.vertical) {
                let y = entry.y
                const x = entry.x

                if (entry.word.length + y  - 1 < updatedGrid.length) {
                    const chars: string[] = entry.word.split("")
                    let index = y

                    chars.forEach(char => updatedGrid[y++][x] = char)
                }
            } else {
                const y = entry.y
                let x = entry.x

                if (entry.word.length + x  - 1 < updatedGrid.length) {
                    const chars: string[] = entry.word.split("")
                    let index = x
                    
                    chars.forEach(char => updatedGrid[y][x++] = char)
                }
            }
        })
        
        currentGrid.grid = updatedGrid
        setCurrentGrid({...currentGrid})
    }, [entries])

    React.useEffect(() => {
        if (!selectedTile)
            return

        const entriesList: Entry[] = entries.filter(e => e.placed)
        const newEntry = new Entry(
            wordToPlace,
            selectedTile[0],
            selectedTile[1],
            selectedVertical,
            false 
        )
        const chars = newEntry.word.split("")
        const y = newEntry.y
        const x = newEntry.x

        if (
            newEntry.vertical && 
            chars.length + y - 1 < currentGrid.grid.length &&
            chars.every((char, i) => !currentGrid.grid[y + i][x] || currentGrid.grid[y + i][x] === char)
        )
            setEntries([...entriesList, newEntry])
        else if (
            !newEntry.vertical &&
            chars.length + x - 1 < currentGrid.grid[y].length &&
            chars.every((char, i) => !currentGrid.grid[y][x + i] || currentGrid.grid[y][x + i] === char)
        )
            setEntries([...entriesList, newEntry])
        else
            setEntries([...entriesList])
    }, [wordToPlace, selectedTile, selectedVertical])

    function selectTile([y, x]: number[]) {
        if (selectedTile && selectedTile[0] == y && selectedTile[1] == x)
            setSelectedVertical(!selectedVertical)
        else
            setSelectedTile([y, x])
    }

    function updateWordToPlace() {
        if (!wordTextBoxRef.current)
            return

        const textbox = wordTextBoxRef.current
        textbox.value = textbox.value.toUpperCase()
        setWordToPlace(textbox.value)
    }

    function updatePlayerLetters() {
        if (!lettersTextBoxRef.current)
            return

        const textbox = lettersTextBoxRef.current
        setPlayerLetters(textbox.value)
    }

    function placeWord() {
        if (!wordTextBoxRef.current)
            return

        const entriesNotPlaced: Entry[] = entries.filter(e => !e.placed)
        const textbox = wordTextBoxRef.current

        entriesNotPlaced.forEach(entry => entry.placed = true)
        setEntries([...entries])
        setWordToPlace("")
        textbox.value = ""
    }

    return (
        <>
            <div className="flex flex-col gap-7">
                <ScrabbleContainer setWidth={setWidth}>
                    <ScrabbleBoard width={width} grid={currentGrid.grid} gridType={currentGrid.gridType} />
                    <ScrabbleLetters grid={currentGrid.grid} width={width}/>
                    <ScrabbleOverlay width={width} selectedTile={selectedTile} selectedVertical={selectedVertical} grid={currentGrid.grid} selectTile={selectTile}/>
                </ScrabbleContainer>
                
                <FormInput name="Entrez un mot à placer :">
                    <input onChange={() => updateWordToPlace()} ref={wordTextBoxRef} className="w-full py-1 px-3" />
                    <WoodenButton text="Placer le mot" action={() => placeWord()} />
                </FormInput>

                <FormInput name="Entrez vos lettres :">
                    <input onChange={() => updatePlayerLetters()} ref={lettersTextBoxRef} className="w-full py-1 px-3" />
                    <WoodenButton text="Trouver les solutions" action={() => console.log('click')} />
                </FormInput>
            </div>

            <WoodenButton text="Menu principal" action={() => setPage("landing")} />
        </>
    )
}