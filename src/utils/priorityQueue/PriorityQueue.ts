import { PriorityQueueInterface } from "../../types";
import PriorityNode from "./PriorityNode";
import Node from "../node/Node";

/**
 * A priority queue based on a priority min heap.
 */
class PriorityQueue<T> implements PriorityQueueInterface<T> {
	private heap: PriorityNode<T>[]; // The internal min heap.

	/**
	 * Create a new empty priority queue.
	 */
	constructor() {
		this.heap = [];
	}

	/**
	 * Helper methods to get parent, left and right nodes
	 * of a given node in the heap.
	 * @param idx number, the index of the specified node.
	 * @returns number, the index of the requested node.
	 */
	private parent = (idx: number): number => Math.floor((idx - 1) / 2);
	private left = (idx: number): number => 2 * idx + 1;
	private right = (idx: number): number => 2 * idx + 2;
	/**
	 * Helper methods to see if parent, left and right nodes
	 * exist for a given node in the heap
	 * @param idx number, the index of the specified node.
	 * @returns boolean, true if the request node exist or false otherwise.
	 */
	private hasParent = (idx: number): boolean =>
		Math.floor((idx - 1) / 2) >= 0;
	private hasLeft = (idx: number): boolean =>
		this.left(idx) < this.heap.length;
	private hasRight = (idx: number): boolean =>
		this.right(idx) < this.heap.length;

	/**
	 * Swaps the two specified indices in the heap.
	 * @param idxA number, the first index to swap.
	 * @param idxB number, the second index to swap.
	 */
	private swap(idxA: number, idxB: number) {
		[this.heap[idxA], this.heap[idxB]] = [this.heap[idxB], this.heap[idxA]];
	}

	/**
	 * Returns the minimal (highest priority) child of a specified node.
	 * @param idx number, the index of the specified node.
	 * @returns number, the index of the minimal child.
	 */
	private getMinChild(idx: number): number {
		if (!this.hasRight(idx)) return this.left(idx);

		if (
			this.heap[this.right(idx)].getKey() <
			this.heap[this.left(idx)].getKey()
		) {
			return this.right(idx);
		}
		if (
			this.heap[this.right(idx)].getKey() ===
			this.heap[this.left(idx)].getKey()
		) {
			if (
				this.heap[this.right(idx)].getSecondary() <
				this.heap[this.left(idx)].getSecondary()
			) {
				return this.right(idx);
			}
		}
		return this.left(idx);
	}

	/**
	 * Percolate the item at position curIdx down the heap
	 * tree until it reaches the position where the min heap
	 * property is restored.
	 * @param curIdx number, the root index to percolate down.
	 */
	private percDown(curIdx: number): void {
		while (this.hasLeft(curIdx)) {
			const minChildIdx = this.getMinChild(curIdx);
			if (this.heap[minChildIdx].getKey() < this.heap[curIdx].getKey()) {
				this.swap(curIdx, minChildIdx);
			} else if (
				this.heap[minChildIdx].getKey() === this.heap[curIdx].getKey()
			) {
				if (
					this.heap[minChildIdx].getSecondary() <
					this.heap[curIdx].getSecondary()
				) {
					this.swap(curIdx, minChildIdx);
				}
			} else {
				return;
			}
			curIdx = minChildIdx;
		}
	}

	/**
	 * Percolate the most recently added item in the heap
	 * (i.e at position curIdx -> final position) up the tree
	 * until it reaches the position where the heap property is
	 * restored.
	 * @param curIdx number, the root index to percolate up.
	 */
	private percUp(curIdx: number): void {
		while (this.hasParent(curIdx)) {
			const parentIdx = this.parent(curIdx);
			if (this.heap[curIdx].getKey() < this.heap[parentIdx].getKey()) {
				this.swap(curIdx, parentIdx);
			} else if (
				this.heap[curIdx].getKey() === this.heap[parentIdx].getKey()
			) {
				if (
					this.heap[curIdx].getSecondary() <
					this.heap[parentIdx].getSecondary()
				) {
					this.swap(curIdx, parentIdx);
				}
			} else {
				return;
			}
			curIdx = parentIdx;
		}
	}

	/**
	 * Push a item with specified priority into this priority queue.
	 * @param item Node, the item to push.
	 */
	// Specific overload for T == Node
	push(item: T): void;

	/**
	 * Push a item with specified priority into this priority queue.
	 * @param item Node, the item to push.
	 * @param priority number, the associated priority.
	 */
	push(item: T, priority: number, secondary?: number): void;

	/**
	 * Push a item with specified priority into this priority queue.
	 * @param item T, the item to push.
	 * @param priority number, the associated priority.
	 */
	push(item: T, priority?: number, secondary?: number | undefined): void {
		// Overloads with typescript are great :D /s
		if (item instanceof Node) {
			this.heap.push(
				new PriorityNode<T>(item as unknown as T, item.f, item.h)
			);
		} else {
			if (!priority)
				throw new Error(
					"PriorityQueue.push: Priority must be specified."
				);
			this.heap.push(new PriorityNode<T>(item, priority, secondary));
		}

		this.percUp(this.size() - 1);
	}

	/**
	 * Pop the highest priority item from this priority queue.
	 * @returns T | null, the highest priority item or null if empty.
	 */
	pop(): T | null {
		if (this.isEmpty()) return null;
		this.swap(0, this.size() - 1);
		const highestPriority = this.heap.pop();
		this.percDown(0);
		return highestPriority ? highestPriority.getValue() : null;
	}

	/**
	 * Gets the highest priority item from this priority queue
	 * without removing it.
	 * @returns T | null, the highest priority item or null if empty.
	 */
	peek(): T | null {
		return this.isEmpty() ? null : this.heap[0].getValue();
	}

	/**
	 * Checks whether this priority queue is empty.
	 * @returns boolean, true if the queue is empty or false otherwise.
	 */
	isEmpty(): boolean {
		return this.heap.length === 0;
	}

	/**
	 * Gets the size of this priority queue.
	 * @returns number, the size of this priority queue.
	 */
	size(): number {
		return this.heap.length;
	}

	/**
	 * Checks if the specified item is in this priority queue.
	 * @param item T, the specified item to check.
	 * @returns boolean, true if the item is in the priority queue
	 *          or false otherwise.
	 */
	includes(item: T): boolean {
		return this.heap.some((elem) => elem.getValue() === item);
	}

	/**
	 * Returns the specified item value if it exists in the
	 * priority queue, returns null otherwise.
	 * @param item T, the item to check if in the priority queue..
	 * @returns T | null, the item value if in the queue, null otherwise.
	 */
	get(item: T): T | null {
		for (const [idx, elem] of this.heap.entries()) {
			if (elem.getValue() === item) {
				return elem.getValue();
			}
		}
		return null;
	}

	/**
	 * Gets a string representation of this priority queue.
	 * @returns string, a representation of this priority queue.
	 */
	toString(): string {
		let items: Array<string> = [];
		this.heap.forEach((elem) => {
			items.push(`{${elem.getKey()}, ${elem.getValue()}}`);
		});
		return "[" + items.join(",\n ") + "]";
	}
}

export default PriorityQueue;
