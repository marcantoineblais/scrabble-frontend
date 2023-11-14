"use client"

import React from 'react'

export default function GridTile({
    letter, bonus, background, overlayText, overlayBackground, x, y, tileAction
}: {
    letter: string, bonus: string, background: string, overlayText: string, overlayBackground: string, x: number, y: number, tileAction: Function
}) {

    return (
        <div
            className="relative flex overflow-hidden w-12 h-12 select-none cursor-pointer border-2 text-center text-slate-100 duration-200 hover:brightness-50"
            onClick={() => tileAction(y, x)}
        >
            <div className={`absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center ${background}`}>{bonus}</div>
            <div className={`absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center ${letter.length > 0 ? "bg-tile-texture" : ""}`}>{ letter }</div>
            <div className={`absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center ${overlayBackground}`}>{ overlayText }</div>
        </div>
    )
}