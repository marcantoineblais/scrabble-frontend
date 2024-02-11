"use client"

import React from "react";
import { Grid } from "../models/Grid";
import SavedGameCard from "../components/SavedGameCard";
import WoodenButton from "../components/WoodenButton";
import LoadingScreen from "../components/LoadingScreen";
import { deleteRequest } from "../utilities/utilities";
import { Player } from "../models/Player";

export default function SavedGames(
    { grids, setCurrentGrid, setPage, setPlayer, deleteMode = false }: 
    { grids: Grid[], setCurrentGrid: Function, setPage: Function, setPlayer: Function, deleteMode?: boolean }
) {

    const [games, setGames] = React.useState<React.JSX.Element[]>([])
    const [loading, setLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        function selectGame(grid: Grid) {
            setCurrentGrid(grid)
            setPage("game")
        }

        async function deleteGame(grid: Grid) {
            if (confirm("Voulez-vous vraiment supprimer cette partie ?")) { 
                setLoading(true)

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

                setLoading(false)
            }
        }

        const savedGames = grids.map((grid, i) => {
            return <SavedGameCard key={i} grid={grid} selectGame={selectGame} deleteGame={deleteGame} deleteBtn={deleteMode} />
        })

        setGames(savedGames)
    }, [grids])


    return (
        <div className="h-full px-5 flex flex-col justify-between">
            <LoadingScreen visible={loading} />
            <div className="mt-10 pb-5 flex flex-col">
                <h2 className="font-bold">Sélectionner une partie :</h2>
                <div className="w-full grow flex flex-col gap-5">
                    { games }
                </div>
            </div>
            <WoodenButton text="Retour" action={() => setPage("landing")} />
        </div>
    )
}