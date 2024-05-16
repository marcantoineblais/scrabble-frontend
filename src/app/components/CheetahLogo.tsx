"use client"

import Image from "next/image";
import logo from "../../images/logo.svg"
import React from "react";


export default function CheetahLogo() {

    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const imageRef = React.useRef<HTMLImageElement | null>(null)

    React.useEffect(() => {

        const onResize = () => {
            const container = containerRef.current
            const image = imageRef.current

            if (!container || !image)
                return

            const pageHeight = window.innerHeight
            const pageWidth = window.innerWidth
            const maxHeight = (pageHeight / 10) * 3
            const maxWidth = (pageWidth / 10) * 4
            let imageSize = maxHeight > maxWidth ? maxWidth : maxHeight

            if (imageSize > 200)
                imageSize = 200

            container.style.height = imageSize + "px"
            container.style.fontSize = (imageSize / 6) + "px"
            image.style.width = imageSize + "px"
            image.style.height = imageSize + "px"
        }

        window.addEventListener("resize", onResize)
        onResize()

        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [])

    return (
        <div ref={containerRef} className="max-w-full flex items-center justify-center">
            <Image ref={imageRef} src={logo} alt="Logo scrabble cheetah" />
            <h1 className="grow font-bold font-serif italic text-emerald-800">Scrabble<br></br>Cheetah</h1>
        </div>
    )
}