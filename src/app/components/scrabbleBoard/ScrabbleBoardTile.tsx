"use client"

import React, { MutableRefObject } from "react"
import { Bonus } from "@/app/models/Bonus"

export default function ScrabbleBoardTile({ bonus }: { bonus: number }) {

    const [text, setText] = React.useState<string>("")
    const [background, setBackground] = React.useState("")
    const tileRef = React.useRef<HTMLDivElement|null>(null)

    React.useEffect(() => {
        function resize() {
            if (!tileRef.current)
                return

            const tile = tileRef.current
            const row = tile.parentElement
            
            if (row != null) {
                tile.style.width = row.clientWidth / 15 + "px"
                tile.style.height = row.clientWidth / 15 + "px"
            }
        }

        resize()
        window.addEventListener("resize", resize)
        
        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    React.useEffect(() => {
        switch(bonus) {
            case Bonus.DOUBLE_LETTER:
                setText("Lettre Compte Double")
                setBackground("bg-sky-400 text-xs")
                break

            case Bonus.TRIPLE_LETTER:
                setText("Lettre Compte Triple")
                setBackground("bg-sky-900 text-xs")
                break

            case Bonus.DOUBLE_WORD:
                setText("Mot Compte Double")
                setBackground("bg-red-400 text-xs")
                break

            case Bonus.TRIPLE_WORD:
                setText("Mot Compte Triple")
                setBackground("bg-red-700 text-xs")
                break

            case Bonus.CENTER:
                setText(String.fromCharCode(9733))
                setBackground("bg-orange-300 text-[3rem] -mt-1")
                break

            default:
                setBackground("bg-orange-300")
        }
    }, [bonus])

    return (
        <div 
            ref={tileRef}
            className={`w-full h-full flex flex-grow justify-center items-center border-2 text-center text-slate-100 ${background}`}
        >
            { text }
        </div>
    )
}