"use client"

import React from "react"

export default function PlayerLetterTile(
  { letter, size, editPlayerLetter, changePlayerLetter }: 
  { letter: string, size: number, editPlayerLetter: Function, changePlayerLetter: Function }
) {

  const tileRef = React.useRef<HTMLDivElement|null>(null)

  React.useEffect(() => {
    if (!tileRef.current)
      return

    const mouseup = () => {
      changePlayerLetter()
    }

    const tile = tileRef.current
    tile.addEventListener("mouseup", mouseup)

    return () => {
      tile.removeEventListener("mouseup", mouseup)
    }
  }, [changePlayerLetter])
  return (
    <div 
      ref={tileRef}
      className={`flex justify-center items-center text-white ${letter ? "bg-tile-texture" : "bg-orange-300"} border-2 border-yellow-700 rounded-sm touch-none`}
      style={{ width: size + "px", height: size + "px", fontSize: (size * 0.6) + "px", boxShadow: letter && `inset 0 ${-size / 25}px ${size / 10}px rgba(255, 247, 237, 0.75)` }}
      onMouseDown={(e) => editPlayerLetter(e)}
      onTouchStart={(e) => editPlayerLetter(e)}
    >
      { letter }
    </div>
  )
}