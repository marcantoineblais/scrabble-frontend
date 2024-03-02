"use client"

import React, { ReactNode } from "react"

export default function PlayerLettersSection({ width }: { width: number }) {

  const [letters, setLetters] = React.useState<string[]>(Array(7).fill(""))
  const [letterSpots, setLetterSpots] = React.useState<ReactNode[]>([])

  React.useEffect(() => {
    const letterSpots: ReactNode[] = []

    for (let i = 0; i < 7; i++) {
      letterSpots.push(
        <div 
          key={i}
          style={{ width: (width / 8) + "px", height: (width / 8) + "px"}}
          className={`flex justify-center items-center ${letters[i] ? "bg-tile-texture" : "bg-orange-300"} border-2 border-neutral-950`}
        >
          { letters[i] }  
        </div>
      )
    }

    setLetterSpots(letterSpots)
  }, [width])

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold border-b border-b-neutral-950">Lettres du joueur</h2>
      <div className="flex justify-between items-center">
        { letterSpots }
      </div>
    </div>
  )
}