"use client"

import React, { ReactNode } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Authentication from "./components/Authentication";
import LoadingScreen from "./components/LoadingScreen";
import Menu from "./components/Menu";
import GridSelection from "./pages/GridSelection";
import Game from "./pages/Game";
import SavedGames from "./pages/SavedGames";
import { Player } from "./models/Player";
import { Grid } from "./models/Grid";

export default function Page() {

    const [player, setPlayer] = React.useState<Player|null>(null)
    const [currentGrid, setCurrentGrid] = React.useState<Grid|null>(null)
    const [page, setPage] = React.useState<string>("")
    const [title, setTitle] = React.useState<string>("")
    const [children, setChildren] = React.useState<ReactNode|null>(null)
    
    React.useEffect(() => {
        switch (page) {
            case "authentication":
                setChildren(<Authentication setPage={setPage} setPlayer={setPlayer} />)
                setTitle("")
            
            case "landing":
                setChildren(<Landing grids={player?.grids || []} setCurrentGrid={setCurrentGrid} setPage={setPage} setPlayer={setPlayer} />)
                setTitle("Scrabble Cheetah")
                break
            
            case "gridSelection":
                setChildren(<GridSelection setCurrentGrid={setCurrentGrid} setPage={setPage} setPlayer={setPlayer} />)
                setTitle("Grille de Jeu")
                break

            case "savedGames":
                setChildren(<SavedGames grids={player?.grids || []} setCurrentGrid={setCurrentGrid} setPage={setPage} setPlayer={setPlayer}/>)
                setTitle("Parties Sauvegardées")
                break
            
            case "deleteGames":
                setChildren(<SavedGames grids={player?.grids || []} setCurrentGrid={setCurrentGrid} setPage={setPage} setPlayer={setPlayer} deleteMode={true} />)
                setTitle("Parties Sauvegardées")
                break

            case "game":
                setChildren(<Game setPage={setPage} currentGrid={currentGrid || new Grid()} setPlayer={setPlayer} />)
                setTitle("Scrabble Cheetah")
                break

            default:
                setChildren(<Login setPlayer={setPlayer} setPage={setPage} />)
                setTitle("Connexion")
                break;
        }
    }, [page, currentGrid, player])

    return (
        <main className="h-full bg-orange-50">
            <LoadingScreen visible={!children} />
            <Authentication setPlayer={setPlayer} setPage={setPage} />
            <div className="h-full container mx-auto overflow-hidden">
                <Menu title={title}>{ children }</Menu>
            </div>
        </main>
    )
}