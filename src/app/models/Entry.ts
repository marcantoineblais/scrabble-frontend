export class Entry {

    public word: string;
    public y: number;
    public x: number;
    public vertical: boolean;
    public conflict: boolean;

    
	constructor(word: string, y: number, x: number, vertical: boolean) {
        this.word = word;
        this.y = y;
        this.x = x;
        this.vertical = vertical;
        this.conflict = false;
	}

    public lastX(): number {
        if (this.vertical)
            return this.x;

        return this.x + this.word.length - 1;
    }

    public lastY(): number {
        if (!this.vertical)
            return this.y;

        return this.y + this.word.length - 1;
    }

    public isSelected([y, x]: number[], vertical: boolean): boolean {
        return (
            this.vertical === vertical &&
            this.y <= y && y <= this.lastY() &&
            this.x <= x && x <= this.lastX()   
        );
    }

    public isLetterConflict(entry: Entry): boolean {
        return this.word.split("").some((char, i) => {   
            const y = this.vertical ? this.y + i : this.y;
            const x = this.vertical ? this.x : this.x + i;
            const letterAtCoord = entry.letterAtCoord([y, x]);
            
            return (letterAtCoord && letterAtCoord !== char)
        })
    }

    public letterAtCoord([y, x]: number[]): string|undefined {
        if (this.vertical && this.x === x)
            return this.word.charAt(y - this.y)
        else if (!this.vertical && this.y === y)
            return this.word.charAt(x - this.x)
        else 
            return undefined
    }

    public writeWordOnGrid(grid: string[][]): void {
        const chars: string[] = this.word.split("")
        let y = this.y;
        let x = this.x;

        if (this.vertical && this.lastY() < grid.length)
            chars.forEach(char => grid[y++][x] = char)
        else if (!this.vertical && this.lastX() < grid.length)
            chars.forEach(char => grid[y][x++] = char)
    }
}