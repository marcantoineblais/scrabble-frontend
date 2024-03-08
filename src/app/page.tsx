"use client"

import React, { ReactNode } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Authentication from "./components/Authentication";
import LoadingScreen from "./components/LoadingScreen";
import Menu from "./components/Menu";
import GridSelection from "./pages/GridSelection";
import Game from "./pages/Game";
import SavedGames from "./components/SavedGames";
import { Player } from "./models/Player";
import { Grid } from "./models/Grid";
import SignIn from "./pages/SignIn";

export default function Page() {

  const [player, setPlayer] = React.useState<Player | null>(null)
  const [currentGrid, setCurrentGrid] = React.useState<Grid | null>(null)
  const [page, setPage] = React.useState<string>("")
  const [title, setTitle] = React.useState<string>("")
  const [children, setChildren] = React.useState<ReactNode | null>(null)

  React.useEffect(() => {
    switch (page) {
      case "authentication":
        setChildren(<Authentication setPage={setPage} setPlayer={setPlayer} />)
        setTitle("")

      case "signIn":
        setChildren(<SignIn setPage={setPage} />)
        setTitle("Inscription")
        break

      case "landing":
        setChildren(<Landing grids={player?.grids || []} setCurrentGrid={setCurrentGrid} setPage={setPage} setPlayer={setPlayer} />)
        setTitle("Scrabble Cheetah")
        break

      case "gridSelection":
        setChildren(<GridSelection setCurrentGrid={setCurrentGrid} setPage={setPage} setPlayer={setPlayer} />)
        setTitle("")
        break

      case "savedGames":
        setChildren(<SavedGames grids={player?.grids || []} setCurrentGrid={setCurrentGrid} setPage={setPage} setPlayer={setPlayer} />)
        setTitle("Sauvegardes")
        break

      case "game":
        setChildren(<Game setPage={setPage} currentGrid={currentGrid || new Grid()} setPlayer={setPlayer} />)
        setTitle("")
        break

      default:
        setChildren(<Login setPlayer={setPlayer} setPage={setPage} />)
        setTitle("Scrabble Cheetah")
        break;
    }
  }, [page, currentGrid, player])

  return (
    <>
      <Authentication setPlayer={setPlayer} setPage={setPage} />
      <main className="min-h-screen flex bg-orange-50 overflow-hidden touch-pan-up touch-pan-down touch-pinch-zoom">
        <div className="grow flex py-3 container max-w-screen-md mx-auto">
          <Menu title={title}>{children}</Menu>
        </div>
      </main>
    </>
  )
}