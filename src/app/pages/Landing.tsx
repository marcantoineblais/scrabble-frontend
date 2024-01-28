"use client"

import WoodenButton from "../components/WoodenButton"
import React from "react"

export default function Landing(
    { setPlayer, setToken, setPage }: { setPlayer: Function, setToken: Function, setPage: Function }
) {

    function newGame() {
        setPage("gridSelection")
    }

    function resumeGame() {

    }

    function options() {

    }

    function logout() {
        sessionStorage.clear()
        localStorage.clear()
        setPlayer(null)
        setToken(null)
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