export default function WoodenButton({ text, action }: { text: string, action: Function }) {
    return (
        <button 
            className="w-full bg-tile-texture text-xl text-white px-3 py-1 rounded hover:brightness-50" 
            onClick={() => action()}
        >
            { text }
        </button>
    )
}