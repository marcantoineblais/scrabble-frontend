"use client"

import React, { ReactNode } from "react"

export default function TilesInputSection({ size, spawnFloatingTile }: { size: number, spawnFloatingTile: Function }) {
  
  const [letters, setLetters] = React.useState<ReactNode[]>([])

  React.useEffect(() => {
    const letterTiles: ReactNode[] = []
    const value = "A".charCodeAt(0)

    for (let i = 0; i < 26; i++) {
      const letter =  String.fromCharCode(value + i)
      letterTiles.push(
        <div 
          key={i}
          onMouseDown={(e) => spawnFloatingTile(e, letter)}
          style={{ width: size + "px", height: size + "px", boxShadow: `inset 0 ${-size / 25}px ${size / 10}px rgba(255, 247, 237, 0.75)`}} 
          className="bg-tile-texture flex justify-center items-center rounded-sm border border-yellow-700 shadow-inner shadow-orange-50/75"
        >
          { letter }
        </div>
      )
    }

    letterTiles.push(
      <div 
        key="blank" 
        onMouseDown={(e) => spawnFloatingTile(e, " ")}
        style={{ width: size + "px", height: size + "px", boxShadow: `inset 0 ${-size / 25}px ${size / 10}px rgba(255, 247, 237, 0.75)`}} 
        className="bg-tile-texture flex justify-center items-center rounded-sm border border-yellow-700"
      ></div>
    )
    setLetters(letterTiles)
  }, [size, spawnFloatingTile])


  return (
    <div 
      style={{ fontSize: (size * 0.6) + "px"}} 
      className="flex flex-wrap justify-between gap-1 text-white"
    >
      { letters }
    </div>
  )
}