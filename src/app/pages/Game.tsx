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
    const [selectedEntry, setSelectedEntry] = React.useState<Entry|undefined>(undefined)
    const [newEntry, setNewEntry] = React.useState<Entry|null>(null)
    const [entries, setEntries] = React.useState<Entry[]>([])
    const [wordToPlace, setWordToPlace] = React.useState<string>("")
    const [playerLetters, setPlayerLetters] = React.useState<string>("")
    const wordTextBoxRef = React.useRef<HTMLInputElement|null>(null)
    const lettersTextBoxRef = React.useRef<HTMLInputElement|null>(null)

    React.useEffect(() => {
        const updatedGrid: string[][] = currentGrid.grid.map(row => row.map(_col => ""))
        
        entries.forEach(entry => entry.writeWordOnGrid(updatedGrid))
        currentGrid.grid = updatedGrid
        setCurrentGrid({...currentGrid})
    }, [entries])

    React.useEffect(() => {
        if (!selectedTile)
            return

        const grid: string[][] = currentGrid.grid
        let entry: Entry
        
        entry = new Entry(
            wordToPlace, selectedTile[0], selectedTile[1], selectedVertical
            )
            
        if (
            entry.lastY() >= grid.length ||
            entry.lastX() >= grid[0].length ||
            entries.some(e => e.isLetterConflict(entry))
        )
            entry.conflict = true
        else 
            entry.conflict = false
        
        setNewEntry(entry)
    }, [wordToPlace, selectedTile, selectedVertical])

    React.useEffect(() => {
        if (!selectedTile)
            return 

        setSelectedEntry(entries.find(e => e.isSelected(selectedTile, selectedVertical)))
        
    }, [selectedTile, selectedVertical])

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
        if (!wordTextBoxRef.current || !newEntry)
            return

        if (newEntry.conflict) {
            alert("Impossible de placer le mot ici.")
            return
        }

        const textbox = wordTextBoxRef.current
        setEntries([...entries, newEntry])
        setNewEntry(null)
        setWordToPlace("")
        textbox.value = ""
    }

    return (
        <>
            <div className="mt-5 flex flex-col gap-7">
                <ScrabbleContainer setWidth={setWidth}>
                    <ScrabbleBoard width={width} grid={currentGrid.grid} gridType={currentGrid.gridType} />
                    <ScrabbleLetters grid={currentGrid.grid} newEntry={newEntry} selectedEntry={selectedEntry} width={width}/>
                    <ScrabbleOverlay width={width} selectedTile={selectedTile} selectedVertical={selectedVertical} grid={currentGrid.grid} selectTile={selectTile}/>
                </ScrabbleContainer>
                
                <div className="px-5 flex flex-col gap-5">
                    <FormInput name="Entrez un mot à placer :">
                        <input onChange={() => updateWordToPlace()} ref={wordTextBoxRef} className="w-full py-1 px-3" />
                        <WoodenButton text="Placer le mot" action={() => placeWord()} />
                    </FormInput>

                    <FormInput name="Entrez vos lettres :">
                        <input onChange={() => updatePlayerLetters()} ref={lettersTextBoxRef} className="w-full py-1 px-3" />
                        <WoodenButton text="Trouver les solutions" action={() => console.log('click')} />
                    </FormInput>
                </div>
            </div>
            <div className="px-5 w-full flex flex-col">
                <WoodenButton text="Menu principal" action={() => setPage("landing")} />
            </div>
        </>
    )
}