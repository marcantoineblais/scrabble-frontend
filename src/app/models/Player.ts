import { Grid } from "./Grid";

export class Player {
    
    private _username: string;
    private _grids: Grid[];

    constructor(username: string, grids: Grid[]) {
		this._username = username;
		this._grids = grids;
	}

    /**
     * Getter $username
     * @return {string}
     */
	public get username(): string {
		return this._username;
	}

    /**
     * Getter $grids
     * @return {Grid[]}
     */
	public get grids(): Grid[] {
		return this._grids;
	}

    /**
     * Setter $username
     * @param {string} value
     */
	public set username(value: string) {
		this._username = value;
	}

    /**
     * Setter $grids
     * @param {Grid[]} value
     */
	public set grids(value: Grid[]) {
		this._grids = value;
	}
}