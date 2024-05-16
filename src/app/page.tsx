"use client"

import React, { ReactNode } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Authentication from "./components/Authentication";
import GridSelection from "./pages/GridSelection";
import Game from "./pages/Game";
import { Player } from "./models/Player";
import { Grid } from "./models/Grid";
import SignIn from "./pages/SignIn";

export default function Page() {

    const [player, setPlayer] = React.useState<Player | null>(null)
    const [currentGrid, setCurrentGrid] = React.useState<Grid | null>(null)
    const [page, setPage] = React.useState<string>("")
    const [children, setChildren] = React.useState<ReactNode | null>(null)

    React.useEffect(() => {
        switch (page) {
            case "authentication":
                setChildren(<Authentication setPage={setPage} setPlayer={setPlayer} />)

            case "signIn":
                setChildren(<SignIn setPage={setPage} />)
                break

            case "landing":
                setChildren(<Landing grids={player?.grids || []} setCurrentGrid={setCurrentGrid} setPage={setPage} setPlayer={setPlayer} />)
                break

            case "gridSelection":
                setChildren(<GridSelection setCurrentGrid={setCurrentGrid} setPage={setPage} setPlayer={setPlayer} />)
                break

            case "game":
                setChildren(<Game setPage={setPage} currentGrid={currentGrid || new Grid()} setPlayer={setPlayer} />)
                break

            default:
                setChildren(<Login setPlayer={setPlayer} setPage={setPage} />)
                break;
        }
    }, [page, currentGrid, player])

    return (
        <>
            <Authentication setPlayer={setPlayer} setPage={setPage} />
            <main className="w-full h-screen bg-orange-50 overflow-hidden">
                <div className="w-full max-h-full h-full flex py-3 max-w-screen-xl container mx-auto">
                    { children }
                </div>
            </main>
        </>
    )
}