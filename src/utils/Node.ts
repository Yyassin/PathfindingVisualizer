import { directionType } from '../types';
import { START_COL, END_COL, START_ROW, END_ROW } from '../utils/constants';

class Node {
    private _x: number;
    private _y: number;
    private _g: number = 0;
    private _h: number = 0;
    private _f: number = 0;

    private _direction: directionType = directionType.RIGHT; 
    private _neighbours: Array<Node> = [] as Node[];
    private _previous: Node | null = null;
    private _altPrevious: Node | null = null;

    private _isStart: boolean;
    private _isEnd: boolean;
    private _isWall: boolean = false;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
        this._isStart = (
            this._x === START_COL &&
            this._y === START_ROW
        );
        this._isEnd = (
            this._x === END_COL &&
            this._y === END_ROW
        )   

        this._isWall = false;
    }

    public get x(): number { return this._x; }
    public set x(x: number) { this._x = x; }

    public get y(): number { return this._y; }
    public set y(y: number) { this._y = y; }

    public get g(): number { return this._g; }
    public set g(g: number) { this._g = g; }

    public get h(): number { return this._h; }
    public set h(h: number) { this._h = h; }

    public get f(): number { return this._f; }
    public set f(f: number) { this._f = f; }

    public get direction(): directionType { return this._direction; }
    public set direction(direction: directionType) { this._direction = direction; }
    
    public get previous(): Node | null { return this._previous; }
    public set previous(previous: Node | null) { this._previous = previous; }

    public get altPrevious(): Node | null { return this._altPrevious; }
    public set altPrevious(altPrevious: Node | null) { this._altPrevious = altPrevious; }

    public get isWall(): boolean { return this._isWall; }
    public set isWall(isWall: boolean) {
        if (this.isStart || this.isEnd) this._isWall = false;
        this._isWall = isWall;
    }
    public toggleWall(): void {
        this._isWall = !this._isWall;
    }
    
    public get isStart(): boolean { return this._isStart; }
    public set isStart(isStart: boolean) { this._isStart = isStart; }

    public get isEnd(): boolean { return this._isEnd; }
    public set isEnd(isEnd: boolean) { this._isEnd = isEnd; }


    [Symbol.iterator](): NeighboursIterator<Node> {
        return new NeighboursIterator(this._neighbours);
    }

    public addNeighbours(grid: Array<Array<Node>>){
        const cols = grid.length;
        const rows = grid[0].length;

        // Add left
        if (this.x > 0) this._neighbours.push(grid[this.x - 1][this.y]);
        // Add right
        if (this.x < cols - 1) this._neighbours.push(grid[this.x + 1][this.y]);
        // Add top
        if (this.y > 0) this._neighbours.push(grid[this.x][this.y - 1]);
        // Add bottom
        if (this.y < rows - 1) this._neighbours.push(grid[this.x][this.y + 1]);
    }

    public toString() {
        return "{ " + 
            `x: ${this.x}, ` +
            `y: ${this.y}, ` +
            `f: ${this.f}, ` +
            `g: ${this.g} ` +
            `h: ${this.h} ` +
        " }"
    }
}

class NeighboursIterator<T> implements Iterator<T> {
    private index: number;
    private done: boolean;
    private values: T[];

    constructor(values: T[]) {
        this.index = 0;
        this.done = false;
        this.values = values;
    }

    public next(): IteratorResult<T, number | undefined> {
        if (this.done) 
            return {
                done: this.done,
                value: undefined
            };
        if (this.index === this.values.length) {
            this.done = true;
            return {
                done: this.done,
                value: this.index
            };
        }

        const value = this.values[this.index++];
        return {
            done: this.done, // false
            value
        }
    }
}

export default Node;
