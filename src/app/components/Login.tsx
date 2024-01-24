"use client"

import React from "react";
import MenuList from "./MenuList";
import WoodenButton from "./WoodenButton";

export default function Login() {

    const formRef = React.useRef<HTMLFormElement|null>(null)

    async function login() {
        if (!formRef.current)
            return

        const url = "http://localhost:8080/login"
        const form = formRef.current
        const body = {
            username: form.username.value,
            password: form.password.value
        }

        console.log(body);
        
        try {

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            const data = await response.json()
            console.log(data);
        } catch (ex) {
            console.error(ex)
        }
    }

    return (
        <MenuList title="Connexion">
            <div className="h-full flex flex-col gap-3 px-5 py-12 justify-between">
                <img src="/cheetah.jpg" alt="cheetah" className="flex-grow object-cover"/>

                <form ref={formRef} className="w-full" onSubmit={(e) => e.preventDefault()}>
                    <div className="w-full flex flex-col gap-3">
                        <input className="p-1 rounded" name="username" type="text" placeholder="Nom d'utilisateur" />
                        <input className="p-1 rounded" name="password" type="password" placeholder="Mot de passe" />
                        <label className="w-fit flex items-center" htmlFor="rememberMe"><input className="me-2" id="rememberMe" name="rememberMe" type="checkbox" />Se souvenir de moi</label>
                        <WoodenButton text="Envoyer" action={login}/>
                    </div>
                </form>
            </div>
        </MenuList>
    )
}