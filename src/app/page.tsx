import Landing from "./components/Landing";
import Login from "./components/Login";
import ScrabbleGrid from "./components/ScrabbleGrid";

export default function Page() {
    return (
        <main className="h-full bg-orange-100">
            <div className="h-full container mx-auto">
                <ScrabbleGrid />
            </div>
        </main>
    )
}