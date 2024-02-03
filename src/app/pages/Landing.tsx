"use client"

import WoodenButton from "../components/WoodenButton"
import React from "react"
import { getRequest } from "../utilities/utilities"

export default function Landing(
    { setPlayer, setPage }: { setPlayer: Function, setPage: Function }
) {

    function newGame() {
        setPage("gridSelection")
    }

    function resumeGame() {

    }

    function options() {

    }

    async function logout() {
        try {
            const response = await getRequest("/logout")
            
            if (response.ok)
                setPlayer(null)
        } catch (ex) {
            console.error(ex)
            setPlayer(null)
        }
    }

    return (
        <div className="h-full mt-5 px-5 flex flex-col justify-between">
            <div className="flex flex-col gap-5">
                <img src="/cheetah.jpg" alt="cheetah" className="object-contain"/>
                <div className="mt-5 flex flex-col gap-3">
                    <WoodenButton text="Nouvelle Partie" action={newGame} />
                    <WoodenButton text="Reprendre Partie" action={resumeGame} />
                    <WoodenButton text="Options" action={options} />
                </div>
            </div>
            <div className="w-full flex flex-col">
                <WoodenButton text="Se déconnecter" action={logout} />
            </div>
        </div>
    )
}