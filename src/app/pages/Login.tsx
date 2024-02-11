"use client"

import React from "react";
import WoodenButton from "../components/WoodenButton";
import { postRequest } from "../utilities/utilities";
import { Player } from "../models/Player";
import { LoginRequest } from "../models/LoginRequest";

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
            }
        } catch (ex) {
            console.error(ex)
        }
    }

    return (
        <div className="h-full px-5 mt-5 flex flex-col justify-between">
            <div className="flex flex-col gap-5">
                <img src="/cheetah.jpg" alt="cheetah" className="object-contain"/>

                <form ref={formRef} className="w-full" onSubmit={(e) => e.preventDefault()}>
                    <div className="w-full flex flex-col gap-3">
                        <input className="p-1 rounded" name="username" type="text" placeholder="Nom d'utilisateur" />
                        <input className="p-1 rounded" name="password" type="password" placeholder="Mot de passe" />
                        <label className="w-fit flex items-center" htmlFor="rememberMe"><input className="me-2" id="rememberMe" name="rememberMe" type="checkbox" />Se souvenir de moi</label>
                        <div className="w-full mt-5 flex flex-col"> 
                            <WoodenButton text="Se connecter" action={login}/>
                        </div>
                    </div>
                </form>
            </div>

            <div className="w-full flex flex-col">
                <p>Vous n&apos;avez pas de compte?</p>
                <WoodenButton text="S'inscrire" action={() => console.log("inscription")}/>
            </div>
        </div>
    )
}