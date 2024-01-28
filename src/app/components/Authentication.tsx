"use client"

import React from "react"
import { postRequest } from "../utilities/utilities"
import LoadingScreen from "./LoadingScreen"
import { Player } from "../models/Player"

export default function Authentication({ token, setToken, setPlayer }: {token: string, setToken: Function, setPlayer: Function }) {

    React.useEffect(() => {
        async function authenticate() {
            try {
                const response = await postRequest(token, "/authenticate")
                const player: Player = await response.json()
                setPlayer(player)   
            } catch (ex) {
                sessionStorage.clear()
                localStorage.clear()
                setToken(null)
                console.error(ex)
            }
        }

        authenticate()
    }, [setPlayer, token])

    return (
        <LoadingScreen />
    )
}