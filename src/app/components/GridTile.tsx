"use client"

import React from 'react'

export default function GridTile({
    letter, bonus, background, overlay, x, y, selectBoardTile
}: {
    letter: string, bonus: string, background: string, overlay: string, x: number, y: number, selectBoardTile: Function
}) {

    return (
        <div
            className="relative overflow-hidden w-12 h-12 select-none cursor-pointer border-2 text-center text-orange-50 duration-200 hover:brightness-50"
            onClick={() => selectBoardTile(y, x)}
        >
            <div className={`absolute top-0 left-0 right-0 bottom-0 ${background}`}>{bonus}</div>
            <div className="absolute top-0 left-0 right-0 bottom-0">{letter}</div>
            <div className={`absolute top-0 left-0 right-0 bottom-0 ${overlay}`}></div>
        </div>
    )
}