"use client"

import React, { ReactNode } from "react"

export default function PlayerLettersSection({ size }: { size: number }) {

  const [letters, setLetters] = React.useState<string[]>(Array(7).fill(""))
  const [letterSpots, setLetterSpots] = React.useState<ReactNode[]>([])

  React.useEffect(() => {
    const letterSpots: ReactNode[] = []

    for (let i = 0; i < 7; i++) {
      letterSpots.push(
        <div 
          key={i}
          style={{ width: size + "px", height: size + "px", boxShadow: letters[i] && `inset 0 ${-size / 25}px ${size / 10}px rgba(255, 247, 237, 0.75)` }}
          className={`flex justify-center items-center ${letters[i] ? "bg-tile-texture" : "bg-orange-300"} border-2 border-neutral-950 rounded-sm`}
        >
          { letters[i] }  
        </div>
      )
    }

    setLetterSpots(letterSpots)
  }, [size])

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold border-b border-b-neutral-950">Lettres du joueur</h2>
      <div className="flex justify-between items-center">
        { letterSpots }
      </div>
    </div>
  )
}