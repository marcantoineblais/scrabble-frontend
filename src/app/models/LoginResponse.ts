import { Player } from "./Player";

export class LoginResponse {
    private _token: string;
    private _player: Player;

	constructor(token: string, player: Player) {
		this._token = token;
		this._player = player;
	}

    /**
     * Getter token
     * @return {string}
     */
	public get token(): string {
		return this._token;
	}

    /**
     * Getter player
     * @return {Player}
     */
	public get player(): Player {
		return this._player;
	}

    /**
     * Setter token
     * @param {string} value
     */
	public set token(value: string) {
		this._token = value;
	}

    /**
     * Setter player
     * @param {Player} value
     */
	public set player(value: Player) {
		this._player = value;
	}
}