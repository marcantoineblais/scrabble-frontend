import { GridType } from "./GridType";
import { Language } from "./Language";
import { Player } from "./Player";

export class Grid {

    private _id: number|null;
    private _name: string;
    private _grid: string[][];
    private _playerLetters: string;
    private _gridType: GridType;
    private _language: Language;
    private _player: Player|null;

    constructor(id: number|null, name: string, grid: string[][], playerLetters: string, gridType: GridType, language: Language, player: Player|null) {
        this._id = id;
        this._name = name;
        this._grid = grid;
        this._playerLetters = playerLetters;
        this._gridType = gridType;
        this._language = language;
        this._player = player;
    }

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number|null {
		return this._id;
	}
    
    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
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
     * Getter language
     * @return {Language}
     */
	public get language(): Language {
		return this._language;
	}

    /**
     * Getter player
     * @return {Player}
     */
	public get player(): Player|null {
		return this._player;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}
    
    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
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
    
    /**
     * Setter language
     * @param {Language} value
     */
	public set language(value: Language) {
		this._language = value;
	}

    /**
     * Setter player
     * @param {Player} value
     */
	public set player(value: Player) {
		this._player = value;
	}
}