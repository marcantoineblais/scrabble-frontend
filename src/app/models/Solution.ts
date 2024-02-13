import { Entry } from "./Entry";

export class Solution {
    public entry: Entry;
    public points: number;
    public blankTiles: number[];

    constructor(entry: Entry, points: number, blankTiles: number[]) {
        this.entry = entry;
        this.points = points;
        this.blankTiles = blankTiles;
    }
}