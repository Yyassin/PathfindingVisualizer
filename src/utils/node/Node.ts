import { directionType } from "../../types";
import { START_COL, END_COL, START_ROW, END_ROW } from "../constants";

/**
 * Class that implements a given node in the grid.
 */
class Node {
	static readonly WEIGHT: number = 15;									// Cost of a weight node				

	private _x: number;                                             // The node's x coordinate.
	private _y: number;                                             // The node's y coordinate.
	private _g: number = 0;                                         // The node's g value: exact cost from start to this node.
	private _h: number = 0;                                         // The node's h value: heuristic cost from the node to end.
	private _f: number = 0;                                         // The node's f value: g + h - heuristic cost from start to end.

	private _direction: directionType = directionType.RIGHT;        // Swarm: direction to next nearest node
	private _neighbours: Array<Node> = [] as Node[];				// This node's neighbours
	private _previous: Node | null = null;							// The node preceeding this one in the path.
	private _altPrevious: Node | null = null;						// Bidirectional BFS: Previous used by the end node to allow distinguishing
																	// when building the path

	private _isStart: boolean;										// Start node flag
	private _isEnd: boolean;										// End node flag
	private _isWall: boolean = false;								// Wall node flag
	private _isWeight: boolean = false;								// Weight node flag

	/**
	 * Creates a new node at the specified grid coordinates.
	 * @param x number, the x coordinate.
	 * @param y number, the y coordinate.
	 */
	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
		this._isStart = this._x === START_COL && this._y === START_ROW;
		this._isEnd = this._x === END_COL && this._y === END_ROW;
	}

	/**
	 * Accessors for data members.
	 */
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
	public toggleWall(): void { this._isWall = !this._isWall; this._isWeight = false; }

	public get isWeight(): boolean { return this._isWeight; }
	public set isWeight(isWeight: boolean) {
		if (this.isStart || this.isEnd) this._isWeight = false;
		this._isWeight = isWeight;
	}
	public toggleWeight(): void { this._isWeight = !this._isWeight; this._isWall = false; }
	
	public get isStart(): boolean { return this._isStart; }
	public set isStart(isStart: boolean) { this._isStart = isStart; }

	public get isEnd(): boolean { return this._isEnd; }
	public set isEnd(isEnd: boolean) { this._isEnd = isEnd; }


	/**
	 * Implements an iterator through this nodes neighbours.
	 * so we can do for (const node of neighbours)
	 */
	[Symbol.iterator](): NeighboursIterator<Node> {
		return new NeighboursIterator(this._neighbours);
	}

	/**
	 * Initializes this node's neighbour array given 
	 * the specified grid.
	 * @param grid Array<Array<Node>>, the grid.
	 */
	public addNeighbours(grid: Array<Array<Node>>) {
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

	/**
	 * Stringifies this node's relevant parameters.
	 * @returns string, the stringified node.
	 */
	public toString(): string {
		return (
			"{ " +
                `x: ${this.x}, ` +
                `y: ${this.y}, ` +
                `f: ${this.f}, ` +
                `g: ${this.g} ` +
                `h: ${this.h} ` +
			" }"
		);
	}
}

/**
 * Implements an iterator for a node's neighbour array.
 */
class NeighboursIterator<T> implements Iterator<T> {
	/* Iterator state */
	private index: number;
	private done: boolean;
	private values: T[];

	/**
	 * Creates a new iterator.
	 * @param values T[], the values to iterate over.
	 */
	constructor(values: T[]) {
		this.index = 0;
		this.done = false;
		this.values = values;
	}

	/** Yields the next item in the iterator. */
	public next(): IteratorResult<T, number | undefined> {
		// If we're done
		if (this.done) {
			return {
				done: this.done,
				value: undefined,
			};
		}

		// Last item
		if (this.index === this.values.length) {
			this.done = true;
			return {
				done: this.done,
				value: this.index,
			};
		}

		// Yield the next item 
		const value = this.values[this.index++];
		return {
			done: this.done, // false
			value,
		};
	}
}

export default Node;
