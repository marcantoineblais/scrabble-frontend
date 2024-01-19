"use client"

import WoodenButton from "./WoodenButton"
import MenuList from "./MenuList"

export default function Landing() {

    function clickNewGame() {

    }

    return (
        <MenuList title="Scrabble Cheetah">
            <img src="/cheetah.jpg" alt="cheetah" className="flex-grow object-fill"/>
            <div className="flex flex-col gap-3">
                <WoodenButton text="Nouvelle Partie" action={clickNewGame} />
                <WoodenButton text="Reprendre Partie" action={clickNewGame} />
                <WoodenButton text="Options" action={clickNewGame} />
            </div>
        </MenuList>
    )
}