export default function Menu({ children, title }: { children: React.ReactNode, title: string}) {
    return (
        <div className="w-full h-full px-3 py-10 flex flex-col items-center">
            <h1 className="font-bold text-center justify-between text-3xl">{ title }</h1>

            <div className="w-full h-full flex flex-col gap-3 px-5 py-12 justify-between">
                { children }
            </div>
        </div>
    )
}