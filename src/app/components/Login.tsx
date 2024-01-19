"use client"

import React from "react";
import MenuList from "./MenuList";
import WoodenButton from "./WoodenButton";

export default function Login() {

    const formRef = React.useRef<HTMLFormElement|null>(null)

    async function login() {
        if (!formRef.current)
            return

        const form = formRef.current
        const username = form.username.value
        const password = form.password.value

        const response = await fetch(form.action, {
            method: "POST",
            headers: {
                
            }
        })
    }

    return (
        <MenuList title="Connexion">
            <div className="h-full flex flex-col gap-3 px-5 py-12 justify-between">
                <img src="/cheetah.jpg" alt="cheetah" className="flex-grow object-cover"/>

                <form className="w-full" action={"/login"}>
                    <div className="w-full flex flex-col gap-3">
                        <input className="p-1 rounded" name="username" type="text" placeholder="Nom d'utilisateur"></input>
                        <input className="p-1 rounded" name="password" type="password" placeholder="Mot de passe"></input>
                        <WoodenButton text="Envoyer" action={login}/>
                    </div>
                </form>
            </div>
        </MenuList>
    )
}