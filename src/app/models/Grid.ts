import { GridType } from "./GridType";
import { Language } from "./Language";
import { Player } from "./Player";

export class Grid {

    public id: number;
    public name: string;
    public grid: string[][];
    public playerLetters: string;
    public gridType: GridType;
    public language: Language;
    public player: Player;

	constructor($id: number, $name: string, $grid: string[][], $playerLetters: string, $gridType: GridType, $language: Language, $player: Player) {
		this.id = $id;
		this.name = $name;
		this.grid = $grid;
		this.playerLetters = $playerLetters;
		this.gridType = $gridType;
		this.language = $language;
		this.player = $player;
	}
}