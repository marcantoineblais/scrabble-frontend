"use client"

import React from "react"
import { getRequest } from "../utilities/utilities"
import LoadingScreen from "./LoadingScreen"
import { Player } from "../models/Player"

export default function Authentication({ setPlayer, setPage }: { setPlayer: Function, setPage: Function }) {

    const [attempted, setAttempted] = React.useState<boolean>(false)

    React.useEffect(() => {
        async function authenticate() {
            try {
                const response = await getRequest("/authenticate")

                if (response.ok) {
                    const player: Player = await response.json()
                    setPlayer(player)
                    setPage("landing")
                }
            } catch (ex) {
                console.error(ex)
            } finally {
                setAttempted(true)
            }
        }

        authenticate()
    }, [setPlayer, setPage])

    return (
        <LoadingScreen visible={!attempted} />
    )
}