"use client"

import React, { ReactNode } from "react";
import FoldArrow from "./FoldArrow";

export default function Drawer(
    { children, title, id, open, openDrawer }:
    { children: ReactNode, title: string, id: number, open: boolean, openDrawer: Function }
) {

    const [rotated, setRotated] = React.useState<boolean>(true)
    const drawerRef = React.useRef<HTMLDivElement|null>(null)

    React.useEffect(() => {
        if (!drawerRef.current)
            return

        const drawer = drawerRef.current

        if (open) {
            drawer.classList.remove("scale-y-0")
            drawer.style.maxHeight = "7rem"
            setRotated(true)
        } else {
            drawer.classList.add("scale-y-0")
            drawer.style.maxHeight = "0px"
            setRotated(false)
        }
    }, [open])

    return (
        <div className="flex flex-col border-b border-neutral-900 rounded">
            <div onClick={() => openDrawer(id)} className="flex justify-between items-center ">
                <h2 className="font-bold underline">{ title }</h2>
                <FoldArrow className="w-1/12" rotated={rotated} />
            </div>
            <div ref={drawerRef} className="py-1 flex flex-col gap-5 scale-y-0 max-h-0 origin-top ease-in-out duration-500">
                { children }
            </div>
        </div>
    )
}