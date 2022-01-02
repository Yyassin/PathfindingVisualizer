/**
 * Linked Data Structure General Node Interface
 */
export interface LinkedNodeInterface<T, K = number> {
	next: LinkedNodeInterface<T> | null; // The next node in the DS
	value: T; // This node's value
	key?: K; // Optional, for key value lookup (NotImplemented).
}

/**
 * Implements a node for linked data structures.
 */
export class LinkedNode<T, K = number> {
	private _next: LinkedNode<T, K> | null; // Pointer to the next node in DS.
	private _value: T; // This node's value
	private _key?: K; // For key value lookup (NotImplemented).

	/**
	 * Creates a new linked node with the specified
	 * key, value and next pointer.
	 * @param value T, the node's value.
	 * @param next LinkedNode<T, K>, pointer to the next node.
	 * @param key  K, the node's key.
	 */
	constructor(value: T, next: LinkedNode<T, K> | null = null, key?: K) {
		this._next = next;
		this._value = value;
		if (key) {
			this._key = key;
		}
	}

	/** Accessors */
	public get value(): T {
		return this._value;
	}
	public set value(value: T) {
		this._value = value;
	}

	public get next(): LinkedNode<T, K> | null {
		return this._next;
	}
	public set next(next: LinkedNode<T, K> | null) {
		this._next = next;
	}
}
