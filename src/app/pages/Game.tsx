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
import { postRequest } from "../utilities/utilities"
import LoadingScreen from "../components/LoadingScreen"
import ConditionalDiv from "../components/ConditionalDiv"
import SolutionsBrowser from "../components/SolutionsBrowser"
import { Solution } from "../models/Solution"

export default function Game({ currentGrid, setPage, setCurrentGrid }: { currentGrid: Grid, setPage: Function, setCurrentGrid: Function }) {

    const [width, setWidth] = React.useState<number>(0)
    const [selectedTile, setSelectedTile] = React.useState<number[]|null>(null)
    const [selectedVertical, setSelectedVertical] = React.useState<boolean>(false)
    const [selectedEntry, setSelectedEntry] = React.useState<Entry|null>(null)
    const [newEntry, setNewEntry] = React.useState<Entry|null>(null)
    const [entries, setEntries] = React.useState<Entry[]>([])
    const [solutions, setSolutions] = React.useState<Solution[]>([])
    const [wordToPlace, setWordToPlace] = React.useState<string>("")
    const [playerLetters, setPlayerLetters] = React.useState<string>("")
    const [openDrawerId, setOpenDrawerId] = React.useState<number|null>(null)
    const [wordEditMode, setWordEditMode] = React.useState<boolean>(false)
    const [loadingScreen, setLoadingScreen] = React.useState<boolean>(false)
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

    }, [wordToPlace, selectedTile, selectedVertical, openDrawerId])

    // CHANGE THE SELECTED ENTRY WHEN THE EDIT MENU IS OPEN
    React.useEffect(() => {
        if (!selectedTile || !editWordTextBoxRef.current)
            return 

        const textbox = editWordTextBoxRef.current

        if (openDrawerId === 2 && !wordEditMode) {
            const entry = entries.find(e => e.isSelected(selectedTile, selectedVertical)) || null
            setSelectedEntry(entry)
            textbox.value = entry ? entry.word.toUpperCase() : ""
        } else if (openDrawerId !==2) {     
            setWordEditMode(false)
        }
        
    }, [selectedTile, selectedVertical, openDrawerId, wordEditMode, entries])

    // REMOVE THE SELECTED ENTRY FROM THE GRID WHILE EDITING, KEEP THE BACKGROUND COLOR FOR REFERENCE
    React.useEffect(() => {        
        if (!selectedEntry || !editWordTextBoxRef.current)
            return
        
        if (wordEditMode) {
            const textbox = editWordTextBoxRef.current
            setWordToPlace(textbox.value)
            setEntries(entries.filter(e => !e.equals(selectedEntry)))
        } else {
            setWordToPlace("")
            setNewEntry(null)
            setSelectedEntry(null)
            setEntries([...entries, selectedEntry])
        }
            
    }, [wordEditMode, openDrawerId])

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
        textbox.value = textbox.value.toUpperCase()
        currentGrid.playerLetters = textbox.value
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
        setSolutions([])
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

    async function submitGrid() {
        if (!playerLetters) {
            alert("Veuillez entrer au moins une lettre")
            return
        }

        setLoadingScreen(true)
        try {
            const response = await postRequest(JSON.stringify(currentGrid), "/grid/solve")
            const data = await response.json()
            const solutionsList: Solution[] = []
            data.forEach((obj: any) => {
                const entry: Entry = new Entry(obj.entry.word, obj.y, obj.x, obj.vertical)
                solutionsList.push(new Solution(entry, obj.points))
                setSolutions(solutionsList)
            })
            
        } catch (ex) {
            console.error(ex)
        }
        setLoadingScreen(false)
    }

    return (
        <>
            <div className="mt-5 flex flex-col gap-7">
                <ConditionalDiv className="h-0" visible={loadingScreen}><LoadingScreen /></ConditionalDiv> 

                <ScrabbleContainer setWidth={setWidth}>
                    <ScrabbleBoard width={width} grid={currentGrid.grid} gridType={currentGrid.gridType} />
                    <ScrabbleLetters grid={currentGrid.grid} newEntry={newEntry} selectedEntry={selectedEntry} width={width}/>
                    <ScrabbleOverlay width={width} selectedTile={selectedTile} selectedVertical={selectedVertical} grid={currentGrid.grid} selectTile={selectTile}/>
                </ScrabbleContainer>
                
                <ConditionalDiv className="px-5 flex flex-col gap-10" visible={!solutions.length}>    
                    <Drawer title="Ajouter un mot" id={1} open={openDrawerId === 1} openDrawer={openDrawer}>
                        <FormInput name="Entrez un mot à placer :">
                            <input 
                                onChange={() => updateWordToPlace()} 
                                ref={newWordTextBoxRef} 
                                className="w-full py-1 px-3" 
                                maxLength={15}
                            />
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
                                maxLength={15} 
                            />
                        </FormInput>
                        <ConditionalDiv className="w-full flex gap-1" visible={!wordEditMode}>
                            <WoodenButton text="Modifier" action={() => toggleWordEditMode()} />
                            <WoodenButton text="Effacer" action={() => eraseEntry()} />
                        </ConditionalDiv> 
                        <ConditionalDiv className="w-full flex gap-1" visible={wordEditMode}>
                            <WoodenButton text="Accepter" action={() => placeWord()} /> 
                            <WoodenButton text="Annuler" action={() => toggleWordEditMode()} /> 
                        </ConditionalDiv> 
                    </Drawer>

                    <Drawer title="Trouver les solutions" id={3} open={openDrawerId === 3} openDrawer={openDrawer}>
                        <FormInput name="Entrez vos lettres :">
                            <input 
                                onChange={() => updatePlayerLetters()} 
                                ref={lettersTextBoxRef} 
                                className="w-full py-1 px-3" 
                                maxLength={7}
                            />
                        </FormInput>
                        <WoodenButton text="Trouver les solutions" action={() => submitGrid()} />
                    </Drawer>            
                </ConditionalDiv>

                <ConditionalDiv className="px-5" visible={solutions.length > 1}>
                    <SolutionsBrowser
                        solutions={solutions} 
                        setSolutions={setSolutions} 
                        setNewEntry={setNewEntry} 
                        placeWord={placeWord} 
                    />
                </ConditionalDiv>               
            </div>
            <div className="px-5">
                <WoodenButton text="Menu principal" action={() => setPage("landing")} />
            </div>
        </>
    )
}
