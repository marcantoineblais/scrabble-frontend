"use client"

import React, { ReactNode, Touch } from "react"
import ScrabbleContainer from "../components/scrabbleBoard/ScrabbleContainer"
import ScrabbleBoard from "../components/scrabbleBoard/ScrabbleBoard"
import ScrabbleLetters from "../components/scrabbleBoard/ScrabbleLetters"
import { Grid } from "../models/Grid"
import { Entry } from "../models/Entry"
import WoodenButton from "../components/WoodenButton"
import { postRequest } from "../utilities/utilities"
import LoadingScreen from "../components/LoadingScreen"
import ConditionalDiv from "../components/ConditionalDiv"
import SolutionsBrowser from "../components/SolutionsBrowser"
import { Solution } from "../models/Solution"
import { Player } from "../models/Player"
import TilesInputSection from "../components/scrabbleBoard/TilesInputSection"
import PlayerLettersSection from "../components/scrabbleBoard/PlayerLettersSection"
import FloatingTile from "../components/scrabbleBoard/FloatingTile"

export default function Game(
    { currentGrid, setPage, setPlayer }:
    { currentGrid: Grid, setPage: Function, setPlayer: Function }
) {
    const [grid, setGrid] = React.useState<string[][]>(currentGrid.grid)
    const [selectedLetter, setSelectedLetter] = React.useState<string | null>(null)
    const [selectedSolution, setSelectedSolution] = React.useState<Solution | null>(null)
    const [solutions, setSolutions] = React.useState<Solution[]>([])
    const [playerLetters, setPlayerLetters] = React.useState<string[]>(Array(7).fill(""))
    const [loadingScreen, setLoadingScreen] = React.useState<boolean>(false)
    const [blankTiles, setBlankTiles] = React.useState<number[][]>(currentGrid.blankTiles)
    const [bin, setBin] = React.useState<boolean>(false)
    const [orientation, setOrientation] = React.useState<string>("portrait")
    const [scrabbleWidth, setScrabbleWidth] = React.useState<number>(0)

    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const scrabbleRef = React.useRef<HTMLDivElement | null>(null)
    const floatingTileRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        const onResize = () => {
            const container = containerRef.current
            const scrabble = scrabbleRef.current

            if (!container || !scrabble)
                return

            const height = window.innerHeight
            const width = window.innerWidth - 24

            if (height > width) {
                const maxHeight = height / 2 > width ? width : height / 2
                container.style.width = maxHeight + "px"
                scrabble.style.height = ""
                setOrientation("portrait")
                setScrabbleWidth(maxHeight)
            } else {
                const maxHeight = width / 2
                scrabble.style.height = maxHeight + "px"
                container.style.width = ""
                setOrientation("landscape")
                setScrabbleWidth(maxHeight)
            }
        }

        window.addEventListener("resize", onResize)
        onResize()

        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [])

    React.useEffect(() => {
        if (!currentGrid.playerLetters)
            return

        const letters = currentGrid.playerLetters.split("")

        setPlayerLetters(playerLetters => {
            letters.forEach((letter, i) => playerLetters[i] = letter)
            return [...playerLetters]
        })
    }, [currentGrid])

    React.useEffect(() => {
        currentGrid.playerLetters = playerLetters.join("")
        currentGrid.blankTiles = blankTiles
        currentGrid.grid = grid
    }, [playerLetters, blankTiles, grid, currentGrid])

    React.useEffect(() => {
        async function saveGrid() {
            try {
                const response = await postRequest(JSON.stringify(currentGrid), "/grid")
                if (response.ok) {
                    const player: Player = await response.json()
                    setPlayer(() => player)
                } else {
                    console.warn("Could not update player data")
                }
            } catch (ex) {
                console.error(ex)
            }
        }

        saveGrid()
    }, [grid, blankTiles, playerLetters, currentGrid, setPlayer])


    function getCoordinatesFromEvent(e: MouseEvent | TouchEvent) {
        let y
        let x

        if ('touches' in e) {
            y = e.touches[0].clientY
            x = e.touches[0].clientX
        } else {
            y = e.clientY
            x = e.clientX
        }

        return [y, x]
    }

    function moveFloatingTile(e: MouseEvent | TouchEvent, offsetY: number, offsetX: number) {
        if (!floatingTileRef.current)
            return

        const floatingTile = floatingTileRef.current
        const [y, x] = getCoordinatesFromEvent(e)

        floatingTile.style.top = (y - offsetY) + "px"
        floatingTile.style.left = (x - offsetX) + "px"
    }

    function spawnFloatingTile(e: MouseEvent | TouchEvent, letter: string) {
        const div = e.currentTarget as HTMLDivElement
        const [y, x] = getCoordinatesFromEvent(e)

        const offsetY = y - div.getBoundingClientRect().top
        const offsetX = x - div.getBoundingClientRect().left

        const move = (e: MouseEvent | TouchEvent) => {
            moveFloatingTile(e, offsetY, offsetY)
        }

        const despawnFloatingTile = (e: MouseEvent | TouchEvent) => {
            if ('touches' in e) {
                const y = e.changedTouches[0].clientY
                const x = e.changedTouches[0].clientX
                const tile = document.elementFromPoint(x, y)
                tile?.dispatchEvent(new MouseEvent('mouseup'))
            }

            setSelectedLetter(null)
            setBin(false)
            window.removeEventListener("mousemove", move)
            window.removeEventListener("touchmove", move)
            window.removeEventListener("mouseup", despawnFloatingTile)
            window.removeEventListener("touchend", despawnFloatingTile)
        }

        if (floatingTileRef.current) {
            const floatingTile = floatingTileRef.current
            floatingTile.style.top = (y - offsetY) + "px"
            floatingTile.style.left = (x - offsetX) + "px"
        }

        setSelectedLetter(letter)
        window.addEventListener("mousemove", move)
        window.addEventListener("touchmove", move)
        window.addEventListener("mouseup", despawnFloatingTile)
        window.addEventListener("touchend", despawnFloatingTile)
        navigator.vibrate(50)
    }

    function updateGrid([y, x]: number[]) {
        if (selectedLetter?.length) {
            grid[y][x] = selectedLetter
            setGrid([...grid])
            setSelectedLetter(null)
        }
    }

    function moveLetter(e: MouseEvent | TouchEvent, [y, x]: number[], letter: string, bin: boolean = false) {
        if (!letter.length)
            return

        grid[y][x] = ""
        setGrid([...grid])
        setBin(bin)
        spawnFloatingTile(e, letter)
    }

    function changePlayerLetter(i: number) {
        if (selectedLetter) {
            playerLetters[i] = selectedLetter
            setPlayerLetters([...playerLetters])
        }
    }

    function editPlayerLetter(e: MouseEvent | TouchEvent, i: number) {
        const letter = playerLetters[i]
        playerLetters[i] = ""

        setSelectedLetter(letter)
        setPlayerLetters([...playerLetters])
        spawnFloatingTile(e, letter)
    }

    function acceptSolution() {
        if (!selectedSolution)
            return

        selectedSolution.blankTiles.forEach(i => {
            const y = selectedSolution.entry.vertical ? i + selectedSolution.entry.y : selectedSolution.entry.y
            const x = selectedSolution.entry.vertical ? selectedSolution.entry.x : i + selectedSolution.entry.x
            blankTiles.push([y, x])
        })

        selectedSolution.entry.word.split("").forEach(letter => {
            const index = playerLetters.findLastIndex(l => l === letter)

            if (index >= 0)
                playerLetters[index] = ""
        })
        selectedSolution.entry.writeWordOnGrid(grid)
        setGrid([...grid])
        setSelectedSolution(null)
        setSolutions([])
    }

    function ignoreSolutions() {
        if (confirm("Voulez-vous vraiment refuser toutes les solutions proposées?")) {
            setSelectedSolution(null)
            setSolutions([])
        }
    }

    async function submitGrid() {
        if (!playerLetters) {
            alert("Veuillez entrer au moins une lettre")
            return
        }

        setLoadingScreen(true)
        const body: Grid = new Grid(
            currentGrid.id,
            currentGrid.name,
            grid,
            playerLetters.join("").replace(" ", "."),
            currentGrid.gridType,
            blankTiles,
            currentGrid.language,
            currentGrid.player
        )

        try {
            const response = await postRequest(JSON.stringify(body), "/grid/solve")
            const data = await response.json()
            const solutionsList: Solution[] = []

            data.forEach((obj: any) => {
                const entry: Entry = new Entry(obj.entry.word, obj.y, obj.x, obj.vertical)
                solutionsList.push(new Solution(entry, obj.points, obj.blankTiles))
                setSolutions(solutionsList)
            })

        } catch (ex) {
            console.error(ex)
        }
        setLoadingScreen(false)
    }

    return (
        <div ref={containerRef} className="w-full mx-auto h-full flex flex-col justify-between gap-3">
            <div className="w-full h-full flex flex-col gap-3 overflow-y-auto">
                <LoadingScreen visible={loadingScreen} />
                <FloatingTile visible={selectedLetter !== null} size={scrabbleWidth / 10} letter={selectedLetter} containerRef={floatingTileRef} />
                
                <div className="px-3 w-full flex justify-between border-b border-b-orange-300">
                    <h2 className="font-bold">{currentGrid.name}</h2>
                    <h2 className="font-bold">{currentGrid.language.name}</h2>
                </div>

                <div ref={scrabbleRef} className={`w-full h-full flex gap-3 ${orientation === "portrait" ? "flex-col items-center" : "justify-center"}`}>
                    <div className="flex flex-col overflow-hidden">
                        <ScrabbleContainer interactable={solutions.length === 0} width={scrabbleWidth}>
                            <ScrabbleBoard solutions={solutions} width={scrabbleWidth} grid={currentGrid.grid} gridType={currentGrid.gridType} />
                            <ScrabbleLetters grid={grid} selectedSolution={selectedSolution} blankTiles={blankTiles} width={scrabbleWidth} updateGrid={updateGrid} moveLetter={moveLetter} />
                        </ScrabbleContainer>
                    </div>

                    <ConditionalDiv className={`flex justify-evenly gap-3 ${orientation === "portrait" ? "w-full flex-col" : null}`} visible={!solutions.length}>
                        <TilesInputSection bin={bin} size={scrabbleWidth / 10} spawnFloatingTile={spawnFloatingTile} orientation={orientation} />
                        <PlayerLettersSection letters={playerLetters} changePlayerLetter={changePlayerLetter} editPlayerLetter={editPlayerLetter} size={scrabbleWidth / 10} orientation={orientation}/>
                    </ConditionalDiv>

                    <ConditionalDiv visible={solutions.length > 1}>
                        <SolutionsBrowser
                            solutions={solutions}
                            setSelectedSolution={setSelectedSolution}
                        />
                    </ConditionalDiv>
                </div>
            </div>

            {solutions.length ? 
                <div className="flex justify-center gap-1">
                    <WoodenButton small={true} text="Refuser" action={() => ignoreSolutions()} />
                    <WoodenButton small={true} text="Accepter" action={() => acceptSolution()} />
                </div>
            :
                <div className="flex justify-center gap-1">
                    <WoodenButton small={true} text="Retour" action={() => setPage("landing")} />
                    <WoodenButton small={true} text="Solutions" action={submitGrid} />
                </div>
            }
        </div>
    )
}
