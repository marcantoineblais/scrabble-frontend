"use client"

import React, { ReactNode } from "react"
import { emptyRow, getRequest } from "../utilities/utilities"
import ScrabbleContainer from "../components/scrabbleBoard/ScrabbleContainer"
import ScrabbleBoard from "../components/scrabbleBoard/ScrabbleBoard"
import WoodenButton from "../components/WoodenButton"
import Arrow from "../components/Arrow"
import { Grid } from "../models/Grid"
import { Language } from "../models/Language"
import { GameOptions } from "../models/GameOptions"
import { GridType } from "../models/GridType"

export default function GridSelection({ setCurrentGrid, setPage }: { setCurrentGrid: Function, setPage: Function }) {

    const [gameOptions, setGameOptions] = React.useState<GameOptions|null>(null)
    const [gridType, setGridType] = React.useState<GridType|null>(null)
    const [gridTypeIndex, setGridTypeIndex] = React.useState<number>(0)
    const [language, setLanguage] = React.useState<Language|null>(null)
    const [languageIndex, setLanguageIndex] = React.useState<number>(0)
    const [name, setName] = React.useState<string>("")
    const [options, setOptions] = React.useState<ReactNode[]>([])
    const [width, setWidth] = React.useState<number>(0)
    
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
                const capitalisedName = language.name.substring(0, 1).toUpperCase() + language.name.substring(1)
                
                return <option key={index} value={index}>{ capitalisedName }</option>
            })

            setOptions(languageOptions)
        }, [gameOptions])

    React.useEffect(() => {
        if (!gameOptions)
            return

        setGridType(gameOptions.gridTypes[gridTypeIndex])
        setLanguage(gameOptions.languages[languageIndex])
    }, [gameOptions, gridTypeIndex, languageIndex])

    function previousGridType() {
        if (gridTypeIndex > 0)
            setGridTypeIndex(gridTypeIndex - 1)
    }
    
    function nextGridType() {
        if (!gameOptions)
            return

        if (gridTypeIndex < gameOptions.gridTypes.length - 1)
            setGridTypeIndex(gridTypeIndex + 1)
    }

    function changeLanguageId(e: React.SyntheticEvent<HTMLSelectElement>) {
        try {
            setLanguageIndex(parseInt(e.currentTarget.value))
        } catch (ex) {
            console.error(ex)
        }
    }

    function changeName(e: React.SyntheticEvent<HTMLInputElement>) {
        setName(e.currentTarget.value)
    }

    async function submitGrid() {
        if (!name || !gridType || !language)
            return

        const grid: Grid = new Grid(
            null,
            name,
            emptyRow(() => emptyRow(() => "")),
            "",
            gridType,
            language,
            null
        )

        console.log(grid);
    }

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div>
                <h2 className="font-bold">Choisir le type de grille de jeu :</h2>
                <ScrabbleContainer setWidth={setWidth}>
                    { gridType ? <ScrabbleBoard width={width} gridType={gridType}/> : null }
                </ScrabbleContainer>

                <div className="flex justify-between">
                    <div onClick={() => previousGridType()} className="w-1/12"><Arrow reversed={true} /></div>
                    <div onClick={() => nextGridType()} className="w-1/12"><Arrow reversed={false} /></div>
                </div>
            </div>

            <div className="w-full">
                <h2 className="font-bold">Choisir la langue de jeu :</h2>
                <select onChange={(e) => changeLanguageId(e)} className="w-full px-1.5 py-1">
                    { options }
                </select>
            </div>

            <div className="w-full flex-grow">
                <h2 className="font-bold">Donner un nom à votre grille de jeu : </h2>
                <input onChange={(e) => changeName(e)} className="w-full py-1 px-3" />
            </div>

            <div className="flex flex-col gap-3">
                <WoodenButton text="Débuter la partie" action={submitGrid} />
                <WoodenButton text="Retour" action={() => setPage("landing")} />
            </div>
        </div>
    )
}