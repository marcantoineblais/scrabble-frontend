import { Entry } from "./Entry";

export class Solution {
    public entry: Entry;
    public points: number;

    constructor(entry: Entry, points: number) {
        this.entry = entry;
        this.points = points;
    }
}