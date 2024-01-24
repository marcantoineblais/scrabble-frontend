"use client"

import WoodenButton from "./WoodenButton"
import Menu from "./Menu"
import React from "react"
import { getRequest } from "../utilities/utilities"

export default function Landing(
    { player, setPlayer, setToken, setPage }: { player: Player, setPlayer: Function, setToken: Function, setPage: Function }
) {

    const [gameOptions, setGameOptions] = React.useState<GameOptions|null>(null)

    React.useEffect(() => {
        async function getGameOptions() {
            try {
                const response = await getRequest("/options")
                const gameOptions = await response.json() as unknown as GameOptions
                setGameOptions(gameOptions)
            } catch (ex) {
                console.error(ex)
            }
        }

        getGameOptions()
    }, [])

    function newGame() {
        console.log(gameOptions);
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