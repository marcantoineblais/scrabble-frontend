"use client"

import WoodenButton from "../components/WoodenButton"
import React from "react"
import { deleteRequest, getRequest } from "../utilities/utilities"
import { Grid } from "../models/Grid"
import CheetahLogo from "../components/CheetahLogo"
import SavedGameCard from "../components/SavedGameCard"
import { Player } from "../models/Player"

export default function Landing(
    { grids, setCurrentGrid, setPlayer, setPage }:
    { grids: Grid[], setCurrentGrid: Function, setPlayer: Function, setPage: Function }
) {

    const [games, setGames] = React.useState<React.JSX.Element[]>([])
    const [width, setWidth] = React.useState<number>(0)

    React.useEffect(() => {
        const onResize = () => {
            const height = window.innerHeight
            const width = window.innerWidth

            const maxHeight = width > height ? height / 3 : width / 3
            setWidth(maxHeight > 200 ? 200 : maxHeight)
        }

        window.addEventListener("resize", onResize)
        
        onResize()

        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [])

    React.useEffect(() => {
        function selectGame(grid: Grid) {
            setCurrentGrid(grid)
            setPage("game")
        }

        async function deleteGame(grid: Grid) {
            if (confirm("Voulez-vous vraiment supprimer cette partie ?")) { 

                try {
                    const response = await deleteRequest(JSON.stringify(grid), "/grid")
                    
                    if (response.ok) {
                        const player: Player = await response.json()
                        setPlayer(player)
                    } else {
                        console.warn("La grille n'a pas pu être effacée.")
                    }
                } catch (ex) {
                    console.error(ex)
                }
            }
        }

        const savedGames = grids.map((grid, i) => {
            return <SavedGameCard key={i} grid={grid} selectGame={selectGame} deleteGame={deleteGame} width={width}/>
        })

        setGames(savedGames)
    }, [grids, setCurrentGrid, setPage, setPlayer, width])

    function newGame() {
        setPage("gridSelection")
    }

    async function logout() {
        try {
            const response = await getRequest("/logout")

            if (response.ok) {
                setPlayer(null)
                setPage("")
            }
        } catch (ex) {
            console.error(ex)
            setPlayer(null)
            setPage("")
        }
    }

    return (
        <div className="w-full h-full px-3 flex flex-col justify-between gap-3 overflow-hidden">
            <div className="grow w-full max-w-screen-md mx-auto h-full flex flex-col justify-start gap-3 overflow-hidden">
                <CheetahLogo />

                <div className="h-full w-full flex flex-col justify-start items-center gap-3 overflow-auto">
                    { games }
                </div>
            </div>
            <div className="flex justify-center gap-1">
                <WoodenButton small={true} text="Se Déconnecter" action={logout} />
                <WoodenButton small={true} text="Nouvelle Partie" action={newGame} />
            </div>
        </div>
    )
}