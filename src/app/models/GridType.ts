export class GridType {
    private _id: number;
    private _doubleLetter: number[][];
    private _tripleLetter: number[][];
    private _doubleWord: number[][];
    private _tripleWord: number[][];

	constructor(id: number, doubleLetter: number[][], tripleLetter: number[][], doubleWord: number[][], tripleWord: number[][]) {
		this._id = id;
		this._doubleLetter = doubleLetter;
		this._tripleLetter = tripleLetter;
		this._doubleWord = doubleWord;
		this._tripleWord = tripleWord;
	}

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter doubleLetter
     * @return {number[][]}
     */
	public get doubleLetter(): number[][] {
		return this._doubleLetter;
	}

    /**
     * Getter tripleLetter
     * @return {number[][]}
     */
	public get tripleLetter(): number[][] {
		return this._tripleLetter;
	}

    /**
     * Getter doubleWord
     * @return {number[][]}
     */
	public get doubleWord(): number[][] {
		return this._doubleWord;
	}

    /**
     * Getter tripleWord
     * @return {number[][]}
     */
	public get tripleWord(): number[][] {
		return this._tripleWord;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Setter doubleLetter
     * @param {number[][]} value
     */
	public set doubleLetter(value: number[][]) {
		this._doubleLetter = value;
	}

    /**
     * Setter tripleLetter
     * @param {number[][]} value
     */
	public set tripleLetter(value: number[][]) {
		this._tripleLetter = value;
	}

    /**
     * Setter doubleWord
     * @param {number[][]} value
     */
	public set doubleWord(value: number[][]) {
		this._doubleWord = value;
	}

    /**
     * Setter tripleWord
     * @param {number[][]} value
     */
	public set tripleWord(value: number[][]) {
		this._tripleWord = value;
	}
}