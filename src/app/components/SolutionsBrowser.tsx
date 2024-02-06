import React from "react";
import { Entry } from "../models/Entry";
import Arrow from "./Arrow";
import { Solution } from "../models/Solution";
import WoodenButton from "./WoodenButton";

export default function SolutionsBrowser(
    { solutions, setNewEntry, placeWord, setSolutions }:
    { solutions: Solution[], setNewEntry: Function, placeWord: Function, setSolutions: Function }
) {

    const [index, setIndex] = React.useState<number>(0)
    const [word, setWord] = React.useState<string>("")
    const [points, setPoints] = React.useState<number|null>(null)

    React.useEffect(() => {
        if (!solutions.length)
            return
        
        const solution: Solution = solutions[index]
        setWord(solution.entry.word)
        setPoints(solution.points)
        setNewEntry(solution.entry)
    }, [solutions, index])

    function nextSolution() {
        if (index < solutions.length - 1)
            setIndex(index + 1)
    }

    function previousSolution() {
        if (index > 0)
            setIndex(index - 1)
    }

    function ignoreSolutions() {
        if (confirm("Voulez-vous vraiment refuser toutes les solutions proposées?"))
            setSolutions(null)
    }

    return (
        <div className="flex flex-col gap-3">
            <h2 className="font-bold underline">Meilleures solutions ({index + 1} sur {solutions.length}) :</h2>
            <div className="flex justify-between">
                <Arrow className="w-1/12" reversed={true} action={() => previousSolution()} />
                <span className="text-xl font-bold">{ word }</span>
                <Arrow className="w-1/12" reversed={false} action={() => nextSolution()} />
            </div>
            <div className="flex justify-center">               
                <span className="">{points} points</span>
            </div>
            <div className="flex gap-3">
                <WoodenButton text="Accepter" action={() => placeWord()} />
                <WoodenButton text="Refuser" action={() => ignoreSolutions()} />
            </div>

        </div>
    )
}