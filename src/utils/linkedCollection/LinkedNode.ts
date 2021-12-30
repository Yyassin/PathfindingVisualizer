export interface LinkedNodeInterface<T, K = number> {
    next: LinkedNodeInterface<T> | null,
    value: T,
    key?: K
}

export class LinkedNode<T, K = number> {
    private _next: LinkedNode<T, K> | null;
    private _value: T;
    private _key?: K;

    constructor(value: T, next: LinkedNode<T, K> | null = null, key?: K) {
        this._next = next;
        this._value = value;
        if (key) { this._key = key; }
    }

    public get value(): T { return this._value; }
    public set value(value: T) { this._value = value; }

    public get next(): LinkedNode<T, K> | null { return this._next; }
    public set next(next: LinkedNode<T, K> | null) { this._next = next; }
}
