"use client"

import React, { ReactNode } from "react"
import { emptyRow, getRequest, postRequest } from "../utilities/utilities"
import ScrabbleContainer from "../components/scrabbleBoard/ScrabbleContainer"
import ScrabbleBoard from "../components/scrabbleBoard/ScrabbleBoard"
import WoodenButton from "../components/WoodenButton"
import Arrow from "../components/Arrow"
import { GameOptions } from "@/app/models/GameOptions"
import { GridType } from "@/app/models/GridType"
import { Language } from "@/app/models/Language"
import { GameOption } from "@/app/models/GameOption"
import { Grid } from "@/app/models/Grid"
import FormInput from "../components/FormInput"
import { Player } from "../models/Player"

export default function GridSelection(
    { setCurrentGrid, setPage, setPlayer }:
    { setCurrentGrid: Function, setPage: Function, setPlayer: Function }
) {

    const [gameOptions, setGameOptions] = React.useState<GameOptions>(new GameOptions([], []))
    const [gridType, setGridType] = React.useState<GridType | null>(null)
    const [gridTypeIndex, setGridTypeIndex] = React.useState<number>(0)
    const [language, setLanguage] = React.useState<Language | null>(null)
    const [name, setName] = React.useState<string>("")
    const [options, setOptions] = React.useState<ReactNode[]>([])
    const [width, setWidth] = React.useState<number>(0)
    const [emptyGrid] = React.useState<string[][]>(emptyRow(() => emptyRow(() => "")))

    const containerRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        const onResize = () => {
            const container = containerRef.current

            if (!container)
                return

            const height = window.innerHeight
            const width = window.innerWidth - 24

            const maxHeight = height / 2 > width ? width : height / 2
            setWidth(maxHeight)         
        }

        window.addEventListener("resize", onResize)
        onResize()

        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [])

    React.useEffect(() => {
        async function getGameOptions() {
            try {
                const response = await getRequest("/options")
                const gameOptions: GameOptions = await response.json()

                setGameOptions(gameOptions)
            } catch (ex) {
                console.error(ex)
            }
        }

        getGameOptions()
    }, [])

    React.useEffect(() => {
        if (!gameOptions)
            return

        const languageOptions = gameOptions.languages.map((language: Language, index: number) => {
            const capitalisedName = language.name.substring(0, 1).toUpperCase() + language.name.substring(1).toLowerCase()

            return <option key={index} value={index}>{capitalisedName}</option>
        })

        setOptions(languageOptions)
    }, [gameOptions])

    React.useEffect(() => {
        if (!gameOptions)
            return

        setGridType(gameOptions.gridTypes[0])
        setLanguage(gameOptions.languages[0])
    }, [gameOptions])

    function previousGridType() {
        if (!gameOptions)
            return

        if (gridTypeIndex > 0) {
            setGridTypeIndex(gridTypeIndex - 1)
            setGridType(gameOptions.gridTypes[gridTypeIndex - 1])
        }
    }

    function nextGridType() {
        if (!gameOptions)
            return

        if (gridTypeIndex < gameOptions.gridTypes.length - 1) {
            setGridTypeIndex(gridTypeIndex + 1)
            setGridType(gameOptions.gridTypes[gridTypeIndex + 1])
        }
    }

    function changeLanguageId(e: React.SyntheticEvent<HTMLSelectElement>) {
        if (!gameOptions)
            return

        try {
            const index: number = parseInt(e.currentTarget.value)
            setLanguage(gameOptions.languages[index])
        } catch (ex) {
            console.error(ex)
        }
    }

    function changeName(e: React.SyntheticEvent<HTMLInputElement>) {
        setName(e.currentTarget.value)
    }

    async function submitGrid() {
        if (!name || !gridType || !language) {
            alert("Tous les champs sont obligatoires")
            return
        }

        const gameOption: GameOption = new GameOption(
            gridType,
            language,
            name
        )

        try {
            const response = await postRequest(JSON.stringify(gameOption), "/grid/new")

            if (response.ok) {
                const player: Player = await response.json() as Player
                const grid: Grid = player.grids[0]

                setPlayer(player)
                setCurrentGrid(grid)
                setPage("game")
            } else if (response.status === 507) {
                alert("Limite de sauvegardes atteites. Veuillez supprimer une partie puis réessayez.")
                setPage("landing")
            }

        } catch (ex) {
            console.error(ex)
        }
    }

    return (
        <div className="px-3 w-full h-full max-w-screen-md mx-auto flex flex-col justify-between gap-3">
            <div className="w-full h-full flex flex-col overflow-y-auto">
                <h2 className="font-bold">Choisir le type de grille de jeu :</h2>
                <div ref={containerRef} className="w-full h-full flex flex-col items-center">
                    <ScrabbleContainer width={width}>
                        {gridType && <ScrabbleBoard width={width} grid={emptyGrid} gridType={gridType} />}
                    </ScrabbleContainer>

                    <div className="w-full flex justify-between">
                        <Arrow action={() => previousGridType()} reversed={true} className="w-[2rem]" visible={gridTypeIndex > 0} />
                        <Arrow action={() => nextGridType()} reversed={false} className="w-[2rem]" visible={gridTypeIndex < gameOptions?.gridTypes.length - 1} />
                    </div>
                </div>

                <form className="h-full flex flex-col gap-3">
                    <FormInput name="Choisir la langue de jeu :">
                        <select onChange={(e) => changeLanguageId(e)} className="w-full px-1.5 py-1">
                            {options}
                        </select>
                    </FormInput>

                    <FormInput name="Donner un nom à votre grille de jeu :">
                        <input onChange={(e) => changeName(e)} className="w-full py-1 px-3" />
                    </FormInput>
                </form>
            </div>

            <div className="w-full flex justify-between gap-1">
                <WoodenButton small={true} text="Retour" action={() => setPage("landing")} />
                <WoodenButton small={true} text="Débuter la partie" action={submitGrid} />
            </div>
        </div>
    )
}