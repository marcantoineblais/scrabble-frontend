"use client"

import React, { ReactNode } from "react"

export default function ScrabbleContainer({ children, setWidth }: { children: ReactNode, setWidth: Function }) {

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

  function zoomIn() {
    if (!containerRef.current)
      return

    const container = containerRef.current
    container.style.transform = "scale(1.5)"
  }

  function moveGrid(e: React.MouseEvent) {
    if (!containerRef.current)
      return

    const container = containerRef.current
    const parent = container.parentElement

    if (!parent)
      return 

    const y = e.clientY
    const x = e.clientX
    const width = container.clientWidth
    const minTransform = width * 0.1
    const top = parent.getBoundingClientRect().top
    const left = parent.getBoundingClientRect().left
    const offsetX = (e.clientX - left - minTransform) * 1.25
    const offsetY = (e.clientY - top - minTransform) * 1.25
    
    container.style.transformOrigin = `${offsetX}px ${offsetY}px`
  }

  function zoomOut() {
    if (!containerRef.current)
      return

    const container = containerRef.current
    container.style.transform = ""
  }

  return (
    <div 
      className="w-full h-full overflow-hidden transform-gpu"
      onMouseLeave={() => zoomOut()} 
      onMouseEnter={() => zoomIn()}
      onMouseMove={(e) => moveGrid(e)}
    >
      <div ref={containerRef} className="w-full h-full relative" >
        {children}
      </div>
    </div>
  )
}