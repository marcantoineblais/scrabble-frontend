"use client"

import React from "react"

export default function FloatingTile(
  { size, letter, visible, containerRef }:
  { size: number, letter: string | null, visible: boolean, containerRef: React.MutableRefObject<HTMLDivElement|null> }
) {

  React.useEffect(() => {
    if (!containerRef.current)
      return

    const container = containerRef.current

    if (visible)
      container.style.display = "flex"
    else
      container.style.display = "none"
  }, [visible, containerRef])
  
  return (  
    <div
      ref={containerRef}
      style={{ width: size + "px", height: size + "px", boxShadow: `inset 0 ${-size / 25}px ${size / 10}px rgba(255, 247, 237, 0.75)`, fontSize: (size * 0.6) + "px" }}
      className={`z-50 fixed hidden justify-center items-center text-white bg-tile-texture border border-yellow-700 rounded-sm pointer-events-none`}
    >
      { letter }
    </div>
  )
}