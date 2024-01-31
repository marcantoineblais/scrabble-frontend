"use client"

import React, { ReactNode } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Authentication from "./components/Authentication";
import LoadingScreen from "./components/LoadingScreen";
import Menu from "./components/Menu";
import GridSelection from "./pages/GridSelection";
import { Player } from "./models/Player";
import { Grid } from "./models/Grid";
import Game from "./pages/Game";

export default function Page() {

    const [player, setPlayer] = React.useState<Player|null>(null)
    const [currentGrid, setCurrentGrid] = React.useState<Grid|null>(null)
    const [page, setPage] = React.useState<string>("")
    const [title, setTitle] = React.useState<string>("")
    const [children, setChildren] = React.useState<ReactNode|null>(null)

    React.useEffect(() => {        
        if (player == null)
            setPage("login")
        
        else
            setPage("landing")
    }, [player])
    
    React.useEffect(() => {
        switch (page) {
            case "authentication":
                setChildren(<Authentication setPlayer={setPlayer} />)
                setTitle("")

            case "login":
                setChildren(<Login setPlayer={setPlayer} />)
                setTitle("Connexion")
                break;
            
            case "landing":
                setChildren(<Landing setPage={setPage} setPlayer={setPlayer} />)
                setTitle("Scrabble Cheetah")
                break
            
            case "gridSelection":
                setChildren(<GridSelection setCurrentGrid={setCurrentGrid} setPage={setPage} />)
                setTitle("Options")
                break

            case "game":
                if (currentGrid) {
                    setChildren(<Game setPage={setPage} grid={currentGrid} />)
                    setTitle("Scrabble Cheetah")
                } else {
                    setPage("landing")
                    setTitle("Scrabble Cheetah")
                }
                break

            default:
                setChildren(<LoadingScreen visible={true} />)
                setTitle("")
                break
        }
    }, [page])

    return (
        <main className="h-full bg-orange-50">
            <div className="h-full container mx-auto">
                <Authentication setPlayer={setPlayer} />
                <Menu title={title}>{ children }</Menu>
            </div>
        </main>
    )
}