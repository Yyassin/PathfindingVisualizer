import { LinkedNode } from "./LinkedNode";

class LinkedStack<T, K = number> {
    private _front: LinkedNode<T, K> | null;
    private _length: number;
    private _lookup: Map<K, LinkedNode<T, K>>;

    constructor() {
        this._front = null;
        this._length = 0;
        this._lookup = new Map<K, LinkedNode<T, K>>();
    }

    public get length(): number { return this._length; }

    public isEmpty(): boolean { return this._length === 0; }

    public push(item: T): void {
        const node = new LinkedNode<T, K>(item);
        node.next = this._front;
        this._front = node;

        this._length++;
    }

    public pop(): T | null {
        if (!this._front) { return null; }

        const returnValue = this._front.value;
        this._front = this._front.next;
        this._length--;

        return returnValue;
    }

    public toString(): string {
        const items = new Array<string>();

        let current = this._front;
        while (current !== null) {
            items.push(String(current.value));
            current = current.next;
        }

        return items.join('->\n '); 
    }
}

export default LinkedStack;