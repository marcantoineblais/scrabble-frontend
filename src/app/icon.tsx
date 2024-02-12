
import { ImageResponse } from "next/server"
import CheetahLogo from "./components/CheetahLogo"

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 64,
    height: 64,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse((
        <div className="flex justify-center items-center bg-orange-100 rounded-full">
            <CheetahLogo className="text-emerald-900" />
        </div>
        ), {
            ...size,
        }
    )
}