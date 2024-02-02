import { GridType } from "./GridType";
import { Language } from "./Language";

export class GameOptions {

    public languages: Language[];
    public gridTypes: GridType[];

	constructor(languages: Language[], gridTypes: GridType[]) {
		this.languages = languages;
		this.gridTypes = gridTypes;
	}
}