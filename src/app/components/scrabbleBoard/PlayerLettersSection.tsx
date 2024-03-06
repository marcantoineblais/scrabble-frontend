"use client"

import React, { ReactNode } from "react"

export default function PlayerLettersSection(
  { size, letters, changePlayerLetter, editPlayerLetter }: 
  { size: number, letters: string[], changePlayerLetter: Function, editPlayerLetter: Function }
) {

  const [letterSpots, setLetterSpots] = React.useState<ReactNode[]>([])

  React.useEffect(() => {
    const letterSpots: ReactNode[] = []

    for (let i = 0; i < 7; i++) {
      letterSpots.push(
        <div 
          key={i}
          className={`flex justify-center items-center text-white ${letters[i] ? "bg-tile-texture" : "bg-orange-300"} border-2 border-yellow-700 rounded-sm`}
          style={{ width: size + "px", height: size + "px", fontSize: (size * 0.6) + "px", boxShadow: letters[i] && `inset 0 ${-size / 25}px ${size / 10}px rgba(255, 247, 237, 0.75)` }}
          onMouseDown={(e) => editPlayerLetter(e, i)}
          onMouseUp={() => changePlayerLetter(i)}
        >
          { letters[i] }  
        </div>
      )
    }

    setLetterSpots(letterSpots)
  }, [size, letters, changePlayerLetter])

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold border-b border-b-neutral-950">Lettres du joueur</h2>
      <div className="flex justify-between items-center">
        { letterSpots }
      </div>
    </div>
  )
}