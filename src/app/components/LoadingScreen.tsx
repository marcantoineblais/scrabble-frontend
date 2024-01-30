"use client"

import React from "react"

export default function LoadingScreen({ visible }: { visible: boolean }) {

    const [display, setDisplay] = React.useState<string>("")

    React.useEffect(() => {
        if (visible)
            setDisplay("")
        else
            setDisplay("hidden")
    }, [visible])

    return (
        <div className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/30 ${display}`}>
            <svg className="w-20 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                <path fill="currentColor" d="M167.07,81.76c4-1.71,8.07-3.28,12.27-4.64a143.16,143.16,0,0,1,73.21-16.37,189.21,189.21,0,0,1,95.89,25.94L386.9,116.4a190,190,0,0,1,48.86,83.84q3.39,25.26,6.79,50.51A143.16,143.16,0,0,1,426.18,324q-2.08,6.39-4.72,12.46,16.44,16.68,32.82,33.4a231.42,231.42,0,0,0,31.55-117c0-128.49-104.16-232.65-232.64-232.65A231.57,231.57,0,0,0,136.46,51.56Q151.79,66.63,167.07,81.76Z"/>
                <path fill="currentColor" d="M347,439.78,329.87,423c-1.36.49-2.73,1-4.12,1.42a143,143,0,0,1-73.2,16.36,189,189,0,0,1-95.9-25.94Q137.42,400,118.2,385.1a189.79,189.79,0,0,1-48.87-83.84l-6.78-50.51a143,143,0,0,1,16.36-73.2c.38-1.17.78-2.33,1.19-3.48q-15.82-15.93-31.58-31.9a231.46,231.46,0,0,0-28,110.66c0,128.48,104.15,232.64,232.64,232.64A231.56,231.56,0,0,0,364.72,457Z"/>
            </svg>
        </div>
    )
}