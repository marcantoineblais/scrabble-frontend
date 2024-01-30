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
        <>
            <img src="/cheetah.jpg" alt="cheetah" className="flex-grow object-cover"/>
            <div className="flex flex-col gap-3">
                <WoodenButton text="Nouvelle Partie" action={newGame} />
                <WoodenButton text="Reprendre Partie" action={resumeGame} />
                <WoodenButton text="Options" action={options} />
                <WoodenButton text="Se déconnecter" action={logout} />
            </div>
        </>
    )
}