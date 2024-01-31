export class Entry {

    public word: string;
    public y: number;
    public x: number;
    public vertical: boolean;
    public placed: boolean;

    
	constructor($word: string, $y: number, $x: number, $vertical: boolean, $placed: boolean) {
        this.word = $word;
        this.y = $y;
        this.x = $x;
        this.vertical = $vertical;
        this.placed = $placed;
	}
}