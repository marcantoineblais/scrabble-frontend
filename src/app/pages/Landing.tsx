"use client"

import WoodenButton from "../components/WoodenButton"
import React from "react"
import { getRequest } from "../utilities/utilities"
import { Grid } from "../models/Grid"
import ConditionalDiv from "../components/ConditionalDiv"
import CheetahLogo from "../components/CheetahLogo"
import SavedGames from "../components/SavedGames"

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
        <div className="px-3 flex flex-col justify-between gap-3 overflow-hidden">
            <div className="grow w-full max-h-full flex flex-col justify-start gap-3 overflow-hidden">
                <CheetahLogo className="text-emerald-900 max-h-[25%]"/>
                <SavedGames grids={grids} setCurrentGrid={setCurrentGrid} setPlayer={setPlayer} setPage={setPage} />
                <WoodenButton text="Nouvelle Partie" action={newGame} />
            </div>
            <WoodenButton text="Se déconnecter" action={logout} />
        </div>
    )
}