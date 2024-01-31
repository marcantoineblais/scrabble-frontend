import { ReactNode } from "react";

export default function FormInput({ children, name }: { children: ReactNode, name: string }) {
    return (
        <div className="w-full flex flex-col gap-3">
            <h2 className="font-bold">{ name }</h2>
            { children }
        </div>
    )
}