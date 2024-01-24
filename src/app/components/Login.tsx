"use client"

import React from "react";
import MenuList from "./Menu";
import WoodenButton from "./WoodenButton";
import { postRequest } from "../utilities/utilities";

export default function Login({ setToken, setPlayer }: { setToken: Function, setPlayer: Function}) {

    const formRef = React.useRef<HTMLFormElement|null>(null)

    async function login() {
        if (!formRef.current)
            return

        const form = formRef.current
        const rememberMe = form.rememberMe.checked
        const body = {
            username: form.username.value,
            password: form.password.value
        }

        try {
            const response = await postRequest(JSON.stringify(body), "/login")
            const loginResponse = await (response).json() as unknown as LoginResponse
            setToken(loginResponse.token)
            setPlayer(loginResponse.player)
            

            if (rememberMe)
                localStorage.setItem("token", loginResponse.token)
            else
                sessionStorage.setItem("token", loginResponse.token)

        } catch (ex) {
            console.error(ex)
        }
    }

    return (
        <MenuList title="Connexion">
            <img src="/cheetah.jpg" alt="cheetah" className="flex-grow object-cover"/>

            <form ref={formRef} className="w-full" onSubmit={(e) => e.preventDefault()}>
                <div className="w-full flex flex-col gap-3">
                    <input className="p-1 rounded" name="username" type="text" placeholder="Nom d'utilisateur" />
                    <input className="p-1 rounded" name="password" type="password" placeholder="Mot de passe" />
                    <label className="w-fit flex items-center" htmlFor="rememberMe"><input className="me-2" id="rememberMe" name="rememberMe" type="checkbox" />Se souvenir de moi</label>
                    <WoodenButton text="Envoyer" action={login}/>
                </div>
            </form>
        </MenuList>
    )
}