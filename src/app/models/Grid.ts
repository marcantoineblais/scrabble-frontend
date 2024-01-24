class Grid {

    private _id: number;
    private _grid: string[][];
    private _playerLetters: string;
    private _gridType: GridType;

    constructor(id: number, grid: string[][], playerLetters: string, gridType: GridType) {
        this._id = id;
        this._grid = grid;
        this._playerLetters = playerLetters;
        this._gridType = gridType;
}


    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter grid
     * @return {string[][]}
     */
	public get grid(): string[][] {
		return this._grid;
	}

    /**
     * Getter playerLetters
     * @return {string}
     */
	public get playerLetters(): string {
		return this._playerLetters;
	}

    /**
     * Getter gridType
     * @return {GridType}
     */
	public get gridType(): GridType {
		return this._gridType;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Setter grid
     * @param {string[][]} value
     */
	public set grid(value: string[][]) {
		this._grid = value;
	}

    /**
     * Setter playerLetters
     * @param {string} value
     */
	public set playerLetters(value: string) {
		this._playerLetters = value;
	}

    /**
     * Setter gridType
     * @param {GridType} value
     */
	public set gridType(value: GridType) {
		this._gridType = value;
	}
}