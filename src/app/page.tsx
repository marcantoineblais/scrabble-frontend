"use client"

import React, { ReactNode } from "react";
import Landing from "./components/Landing";
import Login from "./components/Login";
import ScrabbleGrid from "./components/ScrabbleGrid";
import Authentication from "./components/Authentication";
import LoadingScreen from "./components/LoadingScreen";

export default function Page() {

    const [token, setToken] = React.useState<string|null>(null)
    const [player, setPlayer] = React.useState<Player|null>(null)
    const [gridTypes, setGridTypes] = React.useState<GridType|null>(null)
    const [languages, setLanguages] = React.useState<Language|null>(null)
    const [page, setPage] = React.useState<ReactNode|null>(null)

    React.useEffect(() => {
        setToken(localStorage.getItem("token") || sessionStorage.getItem("token"))
    }, [])

    React.useEffect(() => {
        if (player == null && token)
            setPage(<Authentication setPlayer={setPlayer} token={token} setToken={setToken}/>)
        
        else if (player == null)
            setPage(<Login setToken={setToken} setPlayer={setPlayer} />)
        
        else if (player)
            setPage(<Landing setPage={setPage} player={player} setPlayer={setPlayer} setToken={setToken} />)

        else 
            <LoadingScreen />
    }, [token, player])
    

    return (
        <main className="h-full bg-orange-100">
            <div className="h-full container mx-auto">
                { page }
            </div>
        </main>
    )
}