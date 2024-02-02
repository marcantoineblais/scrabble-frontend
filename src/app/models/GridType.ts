export class GridType {

    public id: number;
    public doubleLetter: number[][];
    public tripleLetter: number[][];
    public doubleWord: number[][];
    public tripleWord: number[][];

	constructor(id: number, doubleLetter: number[][], tripleLetter: number[][], doubleWord: number[][], tripleWord: number[][]) {
		this.id = id;
		this.doubleLetter = doubleLetter;
		this.tripleLetter = tripleLetter;
		this.doubleWord = doubleWord;
		this.tripleWord = tripleWord;
	}
}