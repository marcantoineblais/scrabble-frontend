"use client"

import React from "react"
import { postRequest } from "../utilities/utilities"
import LoadingScreen from "./LoadingScreen"

export default function Authentication({ token, setToken, setPlayer }: {token: string, setToken: Function, setPlayer: Function }) {

    React.useEffect(() => {
        async function authenticate() {
            try {
                const response = await postRequest(token, "/authenticate")
                const player = (await response.json()) as unknown as Player
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