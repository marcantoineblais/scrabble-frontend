"use client"

import React from "react";
import Landing from "./components/Landing";
import Login from "./components/Login";
import ScrabbleGrid from "./components/ScrabbleGrid";

export default function Page() {

    const [player, setPlayer] = React.useState(null)

    return (
        <main className="h-full bg-orange-100">
            <div className="h-full container mx-auto">
                <Login setPlayer={setPlayer}/>
            </div>
        </main>
    )
}