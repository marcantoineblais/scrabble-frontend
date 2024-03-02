"use client"

import React, { ReactNode } from "react"

export default function TilesInputSection({ width }: { width: number }) {
  
  const [letters, setLetters] = React.useState<ReactNode[]>([])

  React.useEffect(() => {
    const letterTiles: ReactNode[] = []
    const value = "A".charCodeAt(0)

    for (let i = 0; i < 26; i++) {
      letterTiles.push(
        <div 
          key={i}
          style={{ width: (width / 12) + "px", height: (width / 12) + "px"}} 
          className="bg-tile-texture flex justify-center items-center shadow-xl"
        >
          { String.fromCharCode(value + i) }
        </div>
      )
    }

    letterTiles.push(
      <div 
        key="blank" 
        style={{ width: (width / 12) + "px", height: (width / 12) + "px"}} 
        className="bg-tile-texture flex justify-center items-center shadow-xl"
      ></div>
    )
    setLetters(letterTiles)
  }, [width])


  return (
    <div style={{ fontSize: (width / 20) + "px"}} className="flex flex-wrap gap-3 text-white">
      { letters }
    </div>
  )
}