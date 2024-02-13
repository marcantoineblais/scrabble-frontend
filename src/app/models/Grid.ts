import { GridType } from "./GridType";
import { Language } from "./Language";
import { Player } from "./Player";

export class Grid {

    public id: number;
    public name: string;
    public grid: string[][];
    public playerLetters: string;
    public gridType: GridType;
    public blankTiles: number[][];
    public language: Language;
    public player: Player;

	constructor(
        id: number = 0, 
        name: string = "", 
        grid: string[][] = [[]], 
        playerLetters: string = "", 
        gridType: GridType = new GridType(), 
        blankTiles: number[][] = [],
        language: Language = new Language(), 
        player: Player = new Player()
    ) {
		this.id = id;
		this.name = name;
		this.grid = grid;
		this.playerLetters = playerLetters;
		this.gridType = gridType;
        this.blankTiles = blankTiles;
		this.language = language;
		this.player = player;
	}
}