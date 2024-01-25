export class Bonus {
    private static _NONE = 0;
    private static _DOUBLE_LETTER = 1;
    private static _TRIPLE_LETTER = 2;
    private static _DOUBLE_WORD = 3;
    private static _TRIPLE_WORD = 4;
    private static _CENTER = 5;

    
    public static get NONE() :number {
        return Bonus._NONE;
    }
    
    public static get DOUBLE_LETTER() :number {
        return Bonus._DOUBLE_LETTER;
    }
    
    public static get TRIPLE_LETTER() :number {
        return Bonus._TRIPLE_LETTER;
    }
    
    public static get DOUBLE_WORD() :number {
        return Bonus._DOUBLE_WORD;
    }
    
    public static get TRIPLE_WORD() :number {
        return Bonus._TRIPLE_WORD;
    }
    
    public static get CENTER() :number {
        return Bonus._CENTER;
    }
}