"use client"

import WoodenButton from "../components/WoodenButton"
import React from "react"
import { getRequest } from "../utilities/utilities"
import { Grid } from "../models/Grid"
import ConditionalDiv from "../components/ConditionalDiv"
import CheetahLogo from "../components/CheetahLogo"

export default function Landing(
    { grids, setCurrentGrid, setPlayer, setPage }:
    { grids: Grid[], setCurrentGrid: Function, setPlayer: Function, setPage: Function }
) {

    const [continueGridName, setContinueGridName] = React.useState<string>("")

    React.useEffect(() => {
        if (grids.length) {
            const name = grids[0].name.length > 15 ? grids[0].name.substring(0, 15) + "..." : grids[0].name
            setContinueGridName(" (" + name + ")")
        }
    }, [grids])

    function newGame() {
        setPage("gridSelection")
    }

    function resumeGame() {
        setPage("savedGames")
    }

    function deleteGame() {
        setPage("deleteGames")
    }

    function continueGame() {
        setCurrentGrid(grids[0])
        setPage("game")
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
        <div className="h-full mt-5 px-5 flex flex-col justify-between gap-7">
            <div className="flex flex-col gap-5">
                <CheetahLogo className="text-emerald-900"/>
                <div className="mt-5 flex flex-col gap-3">
                    <ConditionalDiv visible={grids.length > 0}>
                        <WoodenButton text={"Continuer" + continueGridName} action={continueGame} />
                    </ConditionalDiv>
                    <WoodenButton text="Nouvelle Partie" action={newGame} />
                    <ConditionalDiv className="flex flex-col gap-3" visible={grids.length > 0}>
                        <WoodenButton text="Reprendre Partie" action={resumeGame} />
                        <WoodenButton text="Supprimer Partie" action={deleteGame} />
                    </ConditionalDiv>
                </div>
            </div>
            <div className="w-full flex flex-col">
                <WoodenButton text="Se déconnecter" action={logout} />
            </div>
        </div>
    )
}