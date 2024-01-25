"use client"

import WoodenButton from "../components/WoodenButton"
import Menu from "../components/Menu"
import React from "react"
import Game from "./Game"

export default function Landing(
    { player, setPlayer, setToken, setPage }: { player: Player, setPlayer: Function, setToken: Function, setPage: Function }
) {

    function newGame() {
        setPage(<Game setPage={setPage} />)
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
        <Menu title="Scrabble Cheetah">
            <img src="/cheetah.jpg" alt="cheetah" className="flex-grow object-cover"/>
            <div className="flex flex-col gap-3">
                <WoodenButton text="Nouvelle Partie" action={newGame} />
                <WoodenButton text="Reprendre Partie" action={resumeGame} />
                <WoodenButton text="Options" action={options} />
                <WoodenButton text="Se déconnecter" action={logout} />
            </div>
        </Menu>
    )
}