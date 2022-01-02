import { LinkedNode } from "./LinkedNode";

/**
 * Implements a linked-list based stack.
 */
class LinkedStack<T, K = number> {
	private _front: LinkedNode<T, K> | null; // The stack's front node.
	private _length: number; // The stack's length.
	//private _lookup: Map<K, LinkedNode<T, K>>;  // NotImplemented, key value lookup.

	/**
	 * Creates a new stack.
	 */
	constructor() {
		this._front = null;
		this._length = 0;
		//this._lookup = new Map<K, LinkedNode<T, K>>();
	}

	/**
	 * Returns the length of this stack.
	 */
	public get length(): number {
		return this._length;
	}

	/**
	 * Returns whether this stack is empty.
	 * @returns true if the stack is empty, false otherwise.
	 */
	public isEmpty(): boolean {
		return this._length === 0;
	}

	/**
	 * Pushes the specified item to top of stack.
	 * @param item T, the item to push.
	 */
	public push(item: T): void {
		const node = new LinkedNode<T, K>(item);
		node.next = this._front;
		this._front = node;

		this._length++;
	}

	/**
	 * Pops and returns the item at top of stack.
	 * @returns T, the item at top of stack.
	 */
	public pop(): T | null {
		if (!this._front) {
			return null;
		}

		const returnValue = this._front.value;
		this._front = this._front.next;
		this._length--;

		return returnValue;
	}

	/**
	 * Returns a string representation of this stack.
	 * @returns string, the stack representation.
	 */
	public toString(): string {
		const items = new Array<string>();

		let current = this._front;
		while (current !== null) {
			items.push(String(current.value));
			current = current.next;
		}

		return items.join("->\n ");
	}
}

export default LinkedStack;
