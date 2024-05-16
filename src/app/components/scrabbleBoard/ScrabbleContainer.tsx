"use client"

import React, { ReactNode } from "react"

export default function ScrabbleContainer(
    { children, interactable, width }:
    { children: ReactNode, interactable?: boolean, width: number }
) {

    const [zoomedIn, setZoomedIn] = React.useState<boolean>(false)
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const zoomInCallBack = React.useCallback(zoomIn, [zoomedIn])

    React.useEffect(() => {
        if (!containerRef.current?.parentElement || !interactable)
            return

        const parent = containerRef.current?.parentElement
        const zoomAndMoveGrid = (e: TouchEvent) => {
            const y = e.touches[0].clientY
            const x = e.touches[0].clientX

            if (document.elementsFromPoint(x, y).includes(parent)) {
                zoomInCallBack()
                moveGrid(y, x)
            } else {
                zoomOut()
            }
        }

        window.addEventListener("touchmove", zoomAndMoveGrid)
        window.addEventListener("touchend", zoomOut)

        return () => {
            window.removeEventListener("touchmove", zoomAndMoveGrid)
            window.removeEventListener("touchend", zoomOut)
        }
    }, [interactable, zoomInCallBack])

    function zoomIn() {
        if (zoomedIn || !containerRef.current)
            return

        const container = containerRef.current
        container.style.transform = "scale(1.5)"
        setZoomedIn(true)
    }

    function moveGrid(y: number, x: number) {
        if (!containerRef.current)
            return

        const container = containerRef.current
        const parent = container.parentElement

        if (!parent)
            return

        const width = container.clientWidth
        const minTransform = width * 0.1
        const top = parent.getBoundingClientRect().top
        const left = parent.getBoundingClientRect().left
        const offsetX = (x - left - minTransform) * 1.25
        const offsetY = (y - top - minTransform) * 1.25

        container.style.transformOrigin = `${offsetX}px ${offsetY}px`
    }

    function zoomOut() {
        if (!containerRef.current)
            return

        const container = containerRef.current
        container.style.transform = ""
        setZoomedIn(false)
    }

    function moveGridWithMouse(e: React.MouseEvent) {
        const y = e.clientY
        const x = e.clientX

        moveGrid(y, x)
    }

    return (
        <div
            style={{ height: width + "px", width: width + "px"}}
            className="overflow-hidden"
            onMouseLeave={interactable ? () => zoomOut() : undefined}
            onMouseEnter={interactable ? () => zoomIn() : undefined}
            onMouseMove={interactable ? (e) => moveGridWithMouse(e) : undefined}
        >
            <div ref={containerRef} className="w-full h-full relative" >
                {children}
            </div>
        </div>
    )
}