"use client"

import React, { ReactNode } from "react"

export default function ScrabbleContainer({ children, setWidth, onMouseExit }: { children: ReactNode, setWidth: Function, onMouseExit?: Function }) {

  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    function resize() {
      if (!containerRef.current)
        return

      const container = containerRef.current
      const width = container?.parentElement?.clientWidth

      container.style.width = width + "px"
      container.style.height = width + "px"
      setWidth(width)
    }

    resize()
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [setWidth])

  return (
    <div onMouseLeave={onMouseExit ? () => onMouseExit() : () => false} ref={containerRef} className="w-full h-full relative">
      {children}
    </div>
  )
}