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
import Drawer from "../components/Drawer"

export default function Game({ currentGrid, setPage, setCurrentGrid }: { currentGrid: Grid, setPage: Function, setCurrentGrid: Function }) {

    const [width, setWidth] = React.useState<number>(0)
    const [selectedTile, setSelectedTile] = React.useState<number[]|null>(null)
    const [selectedVertical, setSelectedVertical] = React.useState<boolean>(false)
    const [selectedEntry, setSelectedEntry] = React.useState<Entry|null>(null)
    const [newEntry, setNewEntry] = React.useState<Entry|null>(null)
    const [entries, setEntries] = React.useState<Entry[]>([])
    const [wordToPlace, setWordToPlace] = React.useState<string>("")
    const [playerLetters, setPlayerLetters] = React.useState<string>("")
    const [openDrawerId, setOpenDrawerId] = React.useState<number|null>(null)
    const [wordEditMode, setWordEditMode] = React.useState<boolean>(false)
    const newWordTextBoxRef = React.useRef<HTMLInputElement|null>(null)
    const editWordTextBoxRef = React.useRef<HTMLInputElement|null>(null)
    const lettersTextBoxRef = React.useRef<HTMLInputElement|null>(null)

    // WRITE THE ENTRIES ON THE GRID AND UPDATE THE GRID
    React.useEffect(() => {
        const updatedGrid: string[][] = currentGrid.grid.map(row => row.map(_col => ""))
        
        entries.forEach(entry => entry.writeWordOnGrid(updatedGrid))
        currentGrid.grid = updatedGrid
        setCurrentGrid({...currentGrid})
    }, [entries])

    // SELECT THE NEW ENTRY TO DISPLAY ON GRID, TURNS RED WHEN CANNOT BE PLACED
    React.useEffect(() => {
        if (!selectedTile)
            return

        const grid: string[][] = currentGrid.grid
        let entry: Entry|null

        if (openDrawerId === 1)
            entry = new Entry(wordToPlace, selectedTile[0], selectedTile[1], selectedVertical)
        else if (openDrawerId === 2 && selectedEntry && wordEditMode)
            entry = new Entry(wordToPlace, selectedTile[0], selectedTile[1], selectedVertical)
        else 
            entry = null

        if (entry) {
            entry.conflict = (
                entry.lastY() >= grid.length ||
                entry.lastX() >= grid[0].length ||
                entries.some(e => e.isLetterConflict(entry))
            )
        }
        
        setNewEntry(entry)

    }, [wordToPlace, selectedTile, selectedVertical, openDrawerId, wordEditMode])

    // CHANGE THE SELECTED ENTRY WHEN THE EDIT MENU IS OPEN
    React.useEffect(() => {
        if (!selectedTile || !editWordTextBoxRef.current || wordEditMode)
            return 

        const textbox = editWordTextBoxRef.current

        if (openDrawerId === 2) {
            const entry = entries.find(e => e.isSelected(selectedTile, selectedVertical)) || null
            setSelectedEntry(entry)
            textbox.value = entry ? entry.word.toUpperCase() : ""
        } else {            
            setWordEditMode(false)
        }
        
    }, [selectedTile, selectedVertical, openDrawerId, wordEditMode])

    // REMOVE THE SELECTED ENTRY FROM THE GRID WHILE EDITING, KEEP THE BACKGROUND COLOR FOR REFERENCE
    React.useEffect(() => {
        if (!selectedEntry || !editWordTextBoxRef.current)
            return
        
        if (wordEditMode) {
            const textbox = editWordTextBoxRef.current
            setWordToPlace(textbox.value)
            setEntries(entries.filter(e => !e.equals(selectedEntry)))
        } else {
            setEntries([...entries, selectedEntry])
        }
            
    }, [wordEditMode])

    function selectTile([y, x]: number[]) {
        if (selectedTile && selectedTile[0] == y && selectedTile[1] == x)
            setSelectedVertical(!selectedVertical)
        else
            setSelectedTile([y, x])
    }

    function updateWordToPlace() {
        if (!newWordTextBoxRef.current)
            return

        const textbox = newWordTextBoxRef.current
        textbox.value = textbox.value.toUpperCase()
        setWordToPlace(textbox.value)
    }

    function editSelectedWordLetters() {
        if (!editWordTextBoxRef.current || !selectedEntry)
            return

        const textbox = editWordTextBoxRef.current
        textbox.value = textbox.value.toUpperCase()
        setWordToPlace(textbox.value)
    }

    function toggleWordEditMode() {
        if (!selectedEntry || wordEditMode)
            setWordEditMode(false)
        else
            setWordEditMode(true)
    }

    function updatePlayerLetters() {
        if (!lettersTextBoxRef.current)
            return

        const textbox = lettersTextBoxRef.current
        setPlayerLetters(textbox.value)
    }

    function placeWord() {
        if (!newWordTextBoxRef.current || !editWordTextBoxRef.current || !newEntry)
            return

        if (newEntry.conflict || !newEntry.word.length) {
            alert("Impossible de placer le mot ici.")
            return
        }

        const textbox1 = newWordTextBoxRef.current
        const textbox2 = editWordTextBoxRef.current

        setSelectedEntry(null)
        setNewEntry(null)
        setEntries([...entries, newEntry])
        setWordEditMode(false)
        setWordToPlace("")
        textbox1.value = ""
        textbox2.value = ""
    }

    function eraseEntry() {
        if (!selectedEntry || !editWordTextBoxRef.current)
            return

        if (confirm("Voulez-vous effacer le mot " + selectedEntry.word + " ?")) {
            const textbox = editWordTextBoxRef.current

            setSelectedEntry(null)
            setEntries(entries.filter(e => !e.equals(selectedEntry)))
            setWordToPlace("")
            setWordEditMode(false)
            textbox.value = ""
        }
    }

    function openDrawer(id: number) {
        if (openDrawerId === id)
            setOpenDrawerId(null)
        else
            setOpenDrawerId(id)
    }

    return (
        <>
            <div className="mt-5 flex flex-col gap-7">
                <ScrabbleContainer setWidth={setWidth}>
                    <ScrabbleBoard width={width} grid={currentGrid.grid} gridType={currentGrid.gridType} />
                    <ScrabbleLetters grid={currentGrid.grid} newEntry={newEntry} selectedEntry={selectedEntry} width={width}/>
                    <ScrabbleOverlay width={width} selectedTile={selectedTile} selectedVertical={selectedVertical} grid={currentGrid.grid} selectTile={selectTile}/>
                </ScrabbleContainer>
                
                <div className="px-5 flex flex-col gap-10">
                    <Drawer title="Ajouter un mot" id={1} open={openDrawerId === 1} openDrawer={openDrawer}>
                        <FormInput name="Entrez un mot à placer :">
                            <input onChange={() => updateWordToPlace()} ref={newWordTextBoxRef} className="w-full py-1 px-3" />
                        </FormInput>
                        <WoodenButton text="Placer le mot" action={() => placeWord()} />
                    </Drawer>
                    
                    <Drawer title="Modifier un mot" id={2} open={openDrawerId === 2} openDrawer={openDrawer}>
                        <FormInput name="Modifier le mot sélectionné :">
                            <input 
                                onChange={() => editSelectedWordLetters()}
                                ref={editWordTextBoxRef}
                                readOnly={!wordEditMode}
                                className="w-full py-1 px-3" 
                            />
                        </FormInput>
                        <div className="w-full flex gap-1">
                        { 
                            wordEditMode ?
                                <>
                                    <WoodenButton text="Accepter" action={() => placeWord()} /> 
                                    <WoodenButton text="Annuler" action={() => toggleWordEditMode()} /> 
                                </>
                            :
                                <>
                                    <WoodenButton text="Modifier" action={() => toggleWordEditMode()} />
                                    <WoodenButton text="Effacer" action={() => eraseEntry()} />
                                </>
                            }
                        </div> 
                    </Drawer>

                    <Drawer title="Trouver les solutions" id={3} open={openDrawerId === 3} openDrawer={openDrawer}>
                        <FormInput name="Entrez vos lettres :">
                            <input onChange={() => updatePlayerLetters()} ref={lettersTextBoxRef} className="w-full py-1 px-3" />
                        </FormInput>
                        <WoodenButton text="Trouver les solutions" action={() => console.log('click')} />
                    </Drawer>
                </div>
            </div>
            <div className="px-5 w-full flex flex-col">
                <WoodenButton text="Menu principal" action={() => setPage("landing")} />
            </div>
        </>
    )
}
