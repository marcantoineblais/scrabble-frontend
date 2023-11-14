"use client"

import React from 'react'
import GridRow from './GridRow'

export default function Word({ word, clickAction }: { word: string, clickAction: Function }) {

    const wordRef = React.useRef<HTMLDivElement|null>(null)

    function moveOnMouseDown(e: React.MouseEvent) {
        const word = wordRef.current

        if (!word)
            return

            
        const bounds = word.getBoundingClientRect()
        const offsetX = e.clientX - bounds.left
        const offsetY = e.clientY - bounds.top
        
        word.style.left = (e.clientX - offsetX) + "px"
        word.style.top = (e.clientY - offsetY) + "px"
        word.style.position = "fixed"

        window.addEventListener("mouseup", (e) => stopMovingOnMouseUp(e, offsetX, offsetY))
        window.addEventListener("mousemove", (e) => moveOnMouseMove(e, offsetX, offsetY))
    }

    function stopMovingOnMouseUp(e: MouseEvent, offsetX: number, offsetY: number) {
        const word = wordRef.current

        if (!word)
            return

        word.style.position = ""
        word.style.left = ""
        word.style.right = ""

        window.removeEventListener("mouseup", (e) => stopMovingOnMouseUp(e, offsetX, offsetY))
        window.removeEventListener("mousemove", (e) => moveOnMouseMove(e, offsetX, offsetY))
    }

    function moveOnMouseMove(e: MouseEvent, offsetX: number, offsetY: number) {
        const word = wordRef.current

        if (!word)
            return

        const bounds = word.getBoundingClientRect()
        word.style.left = (e.clientX - offsetX) + "px"
        word.style.top = (e.clientY - offsetY) + "px"
    }

    return (
            <div
                ref={wordRef}
                onMouseDown={(e) => moveOnMouseDown(e)}
            >
                <GridRow 
                    key={1} 
                    letters={word.split("")} 
                    bonus={Array.from({length: word.length}).map(() => "")} 
                    backgrounds={Array.from({length: word.length}).map(() => "bg-tile-texture")} 
                    overlaysText={Array.from({length: word.length}).map(() => "")}
                    overlaysBackground={Array.from({length: word.length}).map(() => "")} 
                    y={-1}
                    clickAction={clickAction}
                    length={word.length}
                />
            </div>
    )
}