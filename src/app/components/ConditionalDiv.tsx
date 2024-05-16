import React, { ReactNode } from "react";

export default function ConditionalDiv(
    { children, className = "", visible }: 
    { children: ReactNode, className?: string, visible: boolean }
) {

    if (visible) {
        return (
            <div className={className}>
                { children }
            </div>
        )
    }

    return null
}