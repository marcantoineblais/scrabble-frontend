import Image from "next/image";
import logo from "../../images/logo.svg"
import React from "react";


export default function cheetahLogo() {

    return (
        <div className="max-w-full flex items-center justify-center">
            <Image src={logo} alt="Cheetah vue de face" className="w-fit h-full max-h-48 max-w-[40%] object-contain" />
            <h1 className="grow font-bold font-serif italic text-emerald-800 text-4xl lg:text-7xl">Scrabble<br></br>Cheetah</h1>
        </div>
    )
}