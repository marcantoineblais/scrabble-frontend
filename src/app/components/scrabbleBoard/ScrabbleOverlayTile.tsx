"use client"

import { Overlay } from "@/app/models/Overlay"
import React from "react"

export default function ScrabbleOverlayTile(
    { size, overlay, coords, selectOrToggleTile }:
    { size: number, overlay: number, coords: number[], selectOrToggleTile: Function }
) {

    const [background, setBackground] = React.useState("")
    const tileRef = React.useRef<HTMLDivElement|null>(null)

    React.useEffect(() => {
        if (!tileRef.current)
            return

        const tile = tileRef.current
        tile.style.width = size + "px"
        tile.style.height = size + "px"
    }, [size])

    React.useEffect(() => {
        switch(overlay) {
            case Overlay.LINE:
                setBackground("bg-black/20")
                break

            case Overlay.SELECTED:
                setBackground("bg-black/50")
                break
            
            case Overlay.BLURRED:
                setBackground("bg-black/50 backdrop-blur-[0.5px]")
                break
                
            default:
                setBackground("")
        }
    }, [overlay])

    
    return (
        <div 
            ref={tileRef}
            className={`w-full h-full ${background}`}
            onMouseDown={() => selectOrToggleTile(coords)}
            onTouchStart={() => selectOrToggleTile(coords)}
        ></div>
    )
}