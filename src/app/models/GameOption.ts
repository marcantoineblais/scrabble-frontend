import { GridType } from "./GridType";
import { Language } from "./Language";

export class GameOption {
    
    public gridType: GridType;
    public language: Language;
    public name: string;

	constructor(gridType: GridType, language: Language, name: string) {
		this.gridType = gridType;
		this.language = language;
		this.name = name;
	}
}