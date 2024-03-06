"use client"

import React, { ReactNode } from "react"
import PlayerLetterTile from "./PlayerLetterTile"

export default function PlayerLettersSection(
  { size, letters, changePlayerLetter, editPlayerLetter }: 
  { size: number, letters: string[], changePlayerLetter: Function, editPlayerLetter: Function }
) {

  const [letterSpots, setLetterSpots] = React.useState<ReactNode[]>([])

  React.useEffect(() => {
    const letterSpots: ReactNode[] = []

    for (let i = 0; i < 7; i++) {
      letterSpots.push(
        <PlayerLetterTile 
          key={i}
          letter={letters[i]}
          size={size}
          editPlayerLetter={(e: MouseEvent | TouchEvent) => editPlayerLetter(e, i)}
          changePlayerLetter={() => changePlayerLetter(i)}
        />
      )
    }

    setLetterSpots(letterSpots)
  }, [size, letters, changePlayerLetter, editPlayerLetter])

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold border-b border-b-neutral-950">Mes lettres</h2>
      <div className="flex justify-between items-center">
        { letterSpots }
      </div>
    </div>
  )
}