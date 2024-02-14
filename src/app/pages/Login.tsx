"use client"

import React from "react";
import WoodenButton from "../components/WoodenButton";
import { postRequest } from "../utilities/utilities";
import { Player } from "../models/Player";
import { LoginRequest } from "../models/LoginRequest";
import CheetahLogo from "../components/CheetahLogo";

export default function Login({ setPlayer, setPage }: { setPlayer: Function, setPage: Function }) {

    const formRef = React.useRef<HTMLFormElement|null>(null)

    async function login() {
        if (!formRef.current)
            return

        const form = formRef.current
        const username = form.username.value
        const password = form.password.value
        const rememberMe = form.rememberMe.checked

        if (!username || !password) {
            alert("Tous les champs sont requis")
            return
        }

        const loginRequest: LoginRequest = new LoginRequest(
            username,
            password,
            rememberMe
        )

        try {
            const response = await postRequest(JSON.stringify(loginRequest), "/login")
            
            if (response.ok) {
                const player: Player = await response.json()
                setPlayer(player)
                setPage("landing")                
            } else {
                alert("Nom d'utilisateur ou mot de passe incorrect.")
            }
        } catch (ex) {
            console.error(ex)
        }
    }

    function signIn() {
        setPage("signIn")
    }

    return (
        <div className="grow px-5 flex flex-col justify-between gap-7">
            <div className="flex flex-col gap-5">
                <CheetahLogo className="text-emerald-900" />

                <form ref={formRef} className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                    <input className="p-1 rounded" name="username" type="text" placeholder="Nom d'utilisateur" />
                    <input className="p-1 rounded" name="password" type="password" placeholder="Mot de passe" />
                    <label className="w-fit flex items-center" htmlFor="rememberMe">
                        <input className="me-2" id="rememberMe" name="rememberMe" type="checkbox" />
                        Se souvenir de moi
                    </label>
                    <WoodenButton text="Se connecter" action={login}/>
                </form>
            </div>

            <div className="w-full flex flex-col">
                <p>Vous n&apos;avez pas de compte?</p>
                <WoodenButton text="S'inscrire" action={() => signIn()}/>
            </div>
        </div>
    )
}