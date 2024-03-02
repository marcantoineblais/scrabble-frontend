export default function WoodenButton({ text, action, small = false }: { text: string, action: Function, small?: boolean }) {
    return (
        <button 
            className={`w-full bg-tile-texture text-white px-3 py-1 rounded hover:brightness-50 ${!small && "text-xl"}`} 
            onClick={() => action()}
        >
            { text }
        </button>
    )
}