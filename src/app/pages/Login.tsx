"use client"

import React from "react";
import WoodenButton from "../components/WoodenButton";
import { postRequest } from "../utilities/utilities";
import { Player } from "../models/Player";
import { LoginRequest } from "../models/LoginRequest";

export default function Login({ setPlayer }: { setPlayer: Function}) {

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
            }
        } catch (ex) {
            console.error(ex)
        }
    }

    return (
        <>
            <img src="/cheetah.jpg" alt="cheetah" className="flex-grow object-cover"/>

            <form ref={formRef} className="w-full" onSubmit={(e) => e.preventDefault()}>
                <div className="w-full flex flex-col gap-3">
                    <input className="p-1 rounded" name="username" type="text" placeholder="Nom d'utilisateur" />
                    <input className="p-1 rounded" name="password" type="password" placeholder="Mot de passe" />
                    <label className="w-fit flex items-center" htmlFor="rememberMe"><input className="me-2" id="rememberMe" name="rememberMe" type="checkbox" />Se souvenir de moi</label>
                    <WoodenButton text="Envoyer" action={login}/>
                </div>
            </form>
        </>
    )
}