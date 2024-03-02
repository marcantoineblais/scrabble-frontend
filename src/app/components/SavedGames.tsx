"use client"

import React from "react";
import { Grid } from "../models/Grid";
import SavedGameCard from "./SavedGameCard";
import { deleteRequest } from "../utilities/utilities";
import { Player } from "../models/Player";

export default function SavedGames(
    { grids, setCurrentGrid, setPage, setPlayer }: 
    { grids: Grid[], setCurrentGrid: Function, setPage: Function, setPlayer: Function }
) {

    const [games, setGames] = React.useState<React.JSX.Element[]>([])
    const containerRef = React.useRef<HTMLDivElement|null>(null)
    const scrollDivRef = React.useRef<HTMLDivElement|null>(null)

    // React.useEffect(() => {
    //   const resize = () => {
    //     if (!containerRef.current || !scrollDivRef.current)
    //       return

    //     const container = containerRef.current
    //     const scrollDiv = scrollDivRef.current
    //     const height = container.clientHeight

    //     scrollDiv.style.height = height + "px"
    //   }

    //   resize()
    //   window.addEventListener("resize", resize)

    //   return () => {
    //     window.removeEventListener("resize", resize)
    //   }
    // }, [containerRef, scrollDivRef, containerRef.current, scrollDivRef.current])

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
            return <SavedGameCard key={i} grid={grid} selectGame={selectGame} deleteGame={deleteGame} />
        })

        setGames(savedGames)
    }, [grids, setCurrentGrid, setPage, setPlayer])


    return (
        <div ref={containerRef} className="grow flex items-start overflow-y-auto">
            <div ref={scrollDivRef} className="grow w-full flex flex-col justify-start">
                <div className="w-full flex flex-col justify-start items-center gap-3">
                    { games }
                </div>
            </div>
        </div>
    )
}