import React from "react";
import Arrow from "./Arrow";
import { Solution } from "../models/Solution";
import WoodenButton from "./WoodenButton";

export default function SolutionsBrowser(
    { solutions, setSelectedSolution }:
    { solutions: Solution[], setSelectedSolution: Function }
) {

    const [index, setIndex] = React.useState<number>(0)
    const [word, setWord] = React.useState<string>("")
    const [points, setPoints] = React.useState<number | null>(null)

    React.useEffect(() => {
        setIndex(0)
    }, [solutions])

    React.useEffect(() => {
        if (!solutions.length)
            return

        const solution: Solution = solutions[index]

        setWord(solution.entry.word)
        setPoints(solution.points)
        setSelectedSolution(solution)
    }, [solutions, index, setSelectedSolution])

    function nextSolution() {
        if (index < solutions.length - 1)
            setIndex(index + 1)
    }

    function previousSolution() {
        if (index > 0)
            setIndex(index - 1)
    }

    return (
        <div className="w-full h-full flex flex-col items-center gap-10">
            <h2 className="font-bold">Meilleures solutions ({index + 1} sur {solutions.length}) :</h2>
            <div className="w-full grow flex flex-col justify-center gap-3">
                <div className="flex justify-between">
                    <Arrow className="w-[2rem]" reversed={true} action={() => previousSolution()} visible={index > 0} />
                    <span className="text-xl font-bold">{ word }</span>
                    <Arrow className="w-[2rem]" reversed={false} action={() => nextSolution()} visible={index < solutions.length - 1} />
                </div>
                <div className="flex justify-center">
                    <span className="">{points} points</span>
                </div>
            </div>
        </div>
    )
}