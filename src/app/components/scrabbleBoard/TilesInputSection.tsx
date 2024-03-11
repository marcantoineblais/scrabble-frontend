"use client"

import React, { ReactNode } from "react"

export default function TilesInputSection(
  { size, spawnFloatingTile, bin }:
    { size: number, spawnFloatingTile: Function, bin: boolean }
) {

  const [letters, setLetters] = React.useState<ReactNode[]>([])

  React.useEffect(() => {
    const letterTiles: ReactNode[] = []
    const value = "A".charCodeAt(0)

    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(value + i)
      letterTiles.push(
        <div
          key={i}
          onMouseDown={(e) => spawnFloatingTile(e, letter)}
          onTouchStart={(e) => spawnFloatingTile(e, letter)}
          style={{ width: size + "px", height: size + "px", boxShadow: `inset 0 ${-size / 25}px ${size / 10}px rgba(255, 247, 237, 0.75)` }}
          className="bg-tile-texture flex justify-center items-center rounded-sm border border-yellow-700 shadow-inner shadow-orange-50/75 touch-none"
        >
          {letter}
        </div>
      )
    }

    letterTiles.push(
      <div
        key="blank"
        onMouseDown={(e) => spawnFloatingTile(e, " ")}
        onTouchStart={(e) => spawnFloatingTile(e, " ")}
        style={{ width: size + "px", height: size + "px", boxShadow: `inset 0 ${-size / 25}px ${size / 10}px rgba(255, 247, 237, 0.75)` }}
        className="bg-tile-texture flex justify-center items-center rounded-sm border border-yellow-700 touch-none"
      ></div>
    )
    setLetters(letterTiles)
  }, [size, spawnFloatingTile])


  return (
    <div
      style={{ fontSize: (size * 0.6) + "px" }}
      className="relative flex flex-wrap justify-between gap-1 text-white"
    >
      {letters}
      {
        bin &&
        <div className="absolute inset-0 p-7 flex justify-center items-center bg-gray-950/75">
          <svg className="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
            <rect fill="currentColor" x="122.88" y="109.09" width="22.67" height="333.5" rx="4" transform="translate(-15.34 8.01) rotate(-3.23)" />
            <rect fill="currentColor" x="379.2" y="109.09" width="22.67" height="333.5" rx="4" transform="translate(13.92 -18.73) rotate(2.8)" />
            <rect fill="currentColor" x="96.88" y="87.92" width="332" height="15" rx="7.5" />
            <rect fill="currentColor" x="131.99" y="79.84" width="261.88" height="15" rx="7.5" />
            <rect fill="currentColor" x="252.04" y="300.76" width="22.67" height="260.99" rx="4" transform="translate(-167.88 694.63) rotate(-90)" />
            <rect fill="currentColor" x="196.88" y="133.75" width="5.33" height="265.33" rx="2" transform="translate(-14.71 11.68) rotate(-3.23)" />
            <rect fill="currentColor" x="322.95" y="133.75" width="5.33" height="265.33" rx="2" transform="translate(13.39 -15.57) rotate(2.8)" />
            <rect fill="currentColor" x="260.71" y="133.84" width="5.33" height="265.33" rx="2" />
            <path fill="currentColor" d="M335.26,80.42c-4.29-4.64-29.51-31-70.67-31.78-43.21-.78-70.11,27.34-74.22,31.78h-21c3-4.21,36.26-48.84,95-48.33,57.51.49,89.77,43.82,93,48.33Z" />
          </svg>
        </div>
      }
    </div>
  )
}