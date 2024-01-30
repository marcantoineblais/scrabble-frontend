import { Grid } from "./Grid";

export class Player {
    
    public username: string;
    public grids: Grid[];

    constructor($username: string, $grids: Grid[]) {
		this.username = $username;
		this.grids = $grids;
	}
}