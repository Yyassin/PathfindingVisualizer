import { NodeInterface } from '../../types';


class PriorityNode<T> implements NodeInterface<T> {
    private _value: T;
    private _key: number;
    private _secondary: number; 

    constructor(value: T, key: number, secondary: number | undefined) {
        this._value = value;
        this._key = key;
        this._secondary = (secondary === undefined) ? key : secondary;
    }

    getValue(): T { return this._value; }

    getKey(): number { return this._key; }

    getSecondary(): number { return this._secondary; } 
}

export default PriorityNode;
