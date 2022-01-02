import Node from "./utils/node/Node";

export interface Vector2 {
    x: number,
    y: number
}

export interface NodeInterface<T> {
    getValue(): T
    getKey(): number
}

export interface PriorityQueueInterface<T> {
    push(item: T | Node, priority?: number, secondary?: number): void
    peek(): T | null
    pop(): T | null
    size(): number
    isEmpty(): boolean
    includes(item: T): boolean
    toString(): string
}

export enum nodeType {
    START="start",
    END="end",
    NORMAL="normal"
}

export enum directionType {
    LEFT="left",
    RIGHT="right",
    UP="up",
    DOWN="down"
}

export type pathAlgorithm = (startNode: Node, endNode: Node) => 
    { path: Array<Node>, visitedNodes: Array<Node>, success: boolean, error?: string | undefined };

export type heuristicFunction = (nodeA: Node, nodeB: Node) => number;

