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

export default function Page() {

    const [token, setToken] = React.useState<string>("")
    const [player, setPlayer] = React.useState<Player|null>(null)
    const [currentGrid, setCurrentGrid] = React.useState<Grid|null>(null)
    const [page, setPage] = React.useState<string>("")
    const [title, setTitle] = React.useState<string>("")
    const [children, setChildren] = React.useState<ReactNode|null>(null)

    React.useEffect(() => {
        setToken(localStorage.getItem("token") || sessionStorage.getItem("token") || "")
    }, [])

    React.useEffect(() => {
        if (player == null && token)
            setPage("authentication")
        
        else if (player == null)
            setPage("login")
        
        else if (player)
            setPage("landing")

        else 
            <LoadingScreen />
    }, [token, player])
    
    React.useEffect(() => {
        switch (page) {
            case "authentication":
                setChildren(<Authentication setPlayer={setPlayer} token={token} setToken={setToken}/>)
                setTitle("")

            case "login":
                setChildren(<Login setToken={setToken} setPlayer={setPlayer} />)
                setTitle("Connexion")
                break;
            
            case "landing":
                setChildren(<Landing setPage={setPage} setPlayer={setPlayer} setToken={setToken} />)
                setTitle("Accueil")
                break
            
            case "gridSelection":
                setChildren(<GridSelection setCurrentGrid={setCurrentGrid} setPage={setPage} />)
                setTitle("Options")
                break

            default:
                setChildren(<LoadingScreen />)
                setTitle("")
                break
        }
    }, [page])

    return (
        <main className="h-full bg-orange-50">
            <div className="h-full container mx-auto">
                <Menu title={title}>
                    { children }
                </Menu>
            </div>
        </main>
    )
}