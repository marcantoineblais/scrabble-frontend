export default function Menu({ children, title }: { children: React.ReactNode, title: string}) {
    return (
        <div className="max-h-full w-full flex flex-col">
            <h1 className="font-bold text-center justify-between text-3xl">{ title }</h1>

            { children }
        </div>
    )
}