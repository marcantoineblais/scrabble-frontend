import { ReactNode } from "react";

export default function FormInput({ children, name }: { children: ReactNode, name: string }) {
    return (
        <div className="w-full flex flex-col gap-1">
            <h3>{ name }</h3>
            { children }
        </div>
    )
}