"use client"

import React from 'react'

export default function GridTile({
    letter, bonus, background, overlayText, overlayBackground, x, y, tileAction
}: {
    letter: string, bonus: string, background: string, overlayText: string, overlayBackground: string, x: number, y: number, tileAction: Function
}) {

    const textureRef = React.useRef<HTMLDivElement|null>(null)
    const overlayRef = React.useRef<HTMLDivElement|null>(null)
    const tileRef = React.useRef<HTMLDivElement|null>(null)

    function showBonusTile() {
        if (!overlayRef.current || !textureRef.current || !tileRef.current)
            return
        
        if (letter) {
            overlayRef.current.classList.add("!opacity-10")
            textureRef.current.classList.add("!opacity-10")
        } else {
            tileRef.current.classList.add("!brightness-50")
        }
    }

    function hideBonusTile() {
        if (!overlayRef.current || !textureRef.current)
            return

        overlayRef.current.classList.remove("!opacity-10")
        textureRef.current.classList.remove("!opacity-10")
        tileRef.current?.classList.remove("!brightness-50")
    }

    return (
        <div
            className="relative flex overflow-hidden w-12 h-12 select-none cursor-pointer border-2 text-center text-slate-100 duration-200"
            onClick={() => tileAction(y, x)}
            onMouseEnter={() => showBonusTile()}
            onMouseLeave={() => hideBonusTile()}
            ref={tileRef}
        >
            <div className={`absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center ${background}`}>{bonus}</div>
            <div ref={textureRef} className={`absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center ${letter.length > 0 ? "bg-tile-texture" : ""}`}>{ letter }</div>
            <div ref={overlayRef} className={`absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center ${overlayBackground}`}>{ overlayText }</div>
        </div>
    )
}