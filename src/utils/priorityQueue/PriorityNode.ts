import { NodeInterface } from "../../types";

/**
 * Implements a node in the priority queue.
 */
class PriorityNode<T> implements NodeInterface<T> {
	private _value: T; // The node's value
	private _key: number; // The node's priority
	private _secondary: number; // The node's secondary priority for tiebreaks

	/**
	 * Creates a new priority node with the specified
	 * value, key and secondary priorities.
	 * @param value T, the node value.
	 * @param key number, the priority.
	 * @param secondary number, the secondary tiebreak priority.
	 */
	constructor(value: T, key: number, secondary: number | undefined) {
		this._value = value;
		this._key = key;
		this._secondary = secondary === undefined ? key : secondary;
	}

	/** Accessors */
	getValue(): T { return this._value; }
	getKey(): number { return this._key; }
	getSecondary(): number { return this._secondary; }
}

export default PriorityNode;
