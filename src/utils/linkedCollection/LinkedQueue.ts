import { LinkedNode } from "./LinkedNode";

/**
 * Implements a linked-list based queue.
 */
class LinkedQueue<T, K = number> {
	private _front: LinkedNode<T, K> | null;    // The queue's front node.
	private _rear: LinkedNode<T, K> | null;     // The queue's rear node.
	private _length: number;                    // The queue's length.
	//private _lookup: Map<K, LinkedNode<T, K>>;  // NotImplemented, key value lookup.

    /**
     * Creates a new linked queue.
     */
	constructor() {
		this._front = null; 
		this._rear = null;
		this._length = 0;
		//this._lookup = new Map<K, LinkedNode<T, K>>();
	}

    /**
     * Returns the length of this queue.
     */
	public get length(): number {
		return this._length;
	}

    /**
     * Returns whether this queue is empty.
     * @returns true if the queue is empty, false otherwise.
     */
	public isEmpty(): boolean {
		return this._length === 0;
	}

    /**
     * Enqueues the specified item to the queue rear.
     * @param item T, the item to enqueue.
     */
	public enq(item: T): void {
		const node = new LinkedNode<T, K>(item);
		if (!this._front) {
			this._rear = node;
			this._front = this._rear;
		} else {
			this._rear!.next = node;
			this._rear = this._rear!.next;
		}

		this._length++;
	}

    /**
     * Dequeues the node at the front of the queue.
     * @returns T, the front node's value.
     */
	public deq(): T | null {
		if (!this._front) {
			return null;
		}

		const returnValue = this._front.value;
		this._front = this._front.next;
		this._length--;

		return returnValue;
	}

    /**
     * Returns a string representation of this queue.
     * @returns string, the queue representation.
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

export default LinkedQueue;
