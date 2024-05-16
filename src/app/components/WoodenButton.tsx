export default function WoodenButton({ text, action, small = false }: { text: string, action: Function, small?: boolean }) {
    return (
        <button 
            className={`w-full max-w-[320px] bg-tile-texture text-white px-3 py-1 rounded hover:brightness-50 ${!small && "text-xl"}`} 
            onClick={() => action()}
        >
            { text }
        </button>
    )
}