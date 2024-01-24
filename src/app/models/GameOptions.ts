class GameOptions {

    private _languages: Language[];
    private _gridTypes: GridType[];
    
	constructor(languages: Language[], gridTypes: GridType[]) {
		this._languages = languages;
		this._gridTypes = gridTypes;
	}

    /**
     * Getter languages
     * @return {Language[]}
     */
	public get languages(): Language[] {
		return this._languages;
	}

    /**
     * Getter gridTypes
     * @return {GridType[]}
     */
	public get gridTypes(): GridType[] {
		return this._gridTypes;
	}

    /**
     * Setter languages
     * @param {Language[]} value
     */
	public set languages(value: Language[]) {
		this._languages = value;
	}

    /**
     * Setter gridTypes
     * @param {GridType[]} value
     */
	public set gridTypes(value: GridType[]) {
		this._gridTypes = value;
	}
}