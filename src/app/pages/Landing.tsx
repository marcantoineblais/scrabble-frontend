"use client"

import WoodenButton from "../components/WoodenButton"
import React from "react"
import { getRequest } from "../utilities/utilities"
import { Grid } from "../models/Grid"
import SavedGames from "../components/SavedGames"
import CheetahLogo from "../components/CheetahLogo"

export default function Landing(
    { grids, setCurrentGrid, setPlayer, setPage }:
        { grids: Grid[], setCurrentGrid: Function, setPlayer: Function, setPage: Function }
) {

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
                <SavedGames grids={grids} setCurrentGrid={setCurrentGrid} setPlayer={setPlayer} setPage={setPage} />
            </div>
            <div className="flex justify-center gap-1">
                <WoodenButton small={true} text="Se Déconnecter" action={logout} />
                <WoodenButton small={true} text="Nouvelle Partie" action={newGame} />
            </div>
        </div>
    )
}