import Node from "../utils/Node";
import LinkedStack from "../utils/linkedCollection/LinkedStack";

const DFS = (startNode: Node, endNode: Node) => {
    const stack = new LinkedStack<Node>();
    // const q = new LinkedQueue<number>();
    // q.enq(5);
    // q.enq(4);
    // q.enq(3);
    // q.enq(2);
    // q.enq(1);

    // while (!q.isEmpty()) {
    //     console.log(q.deq())
    // }

    // Make a linkedSet instead of 2.
    const closedSet = new Set<Node>();
    const path = new Array<Node>();
    const visitedNodes = new Array<Node>();

    stack.push(startNode);
    while (!stack.isEmpty()) {
        // Can't be null otherwise the queue would've been empty
        const currentNode = stack.pop()!;
        if (closedSet.has(currentNode)) continue;
        if (currentNode !== startNode && currentNode !== endNode) { visitedNodes.push(currentNode); }
        closedSet.add(currentNode);

        if (currentNode === endNode) {
            buildPath(path, currentNode);
            return { path, visitedNodes, success: true }
        }

        updateNeighbours(currentNode, closedSet, stack);
    }

    return { path, visitedNodes, success: false, error: "No path exists!" }
}

// Import this, same as others
const buildPath = (path: Array<Node>, endNode: Node): void => {
    let temp = endNode;
    path.push(temp);
    while(temp.previous != null) {
        path.push(temp.previous);
        temp = temp.previous;
    }
}

const updateNeighbours = (node: Node, closedSet: Set<Node>, stack: LinkedStack<Node>) => {
    for (const neighbour of node) {
        if (closedSet.has(neighbour) || neighbour.isWall) continue;
        neighbour.previous = node;

        /*
           Can push dup since want visit in order.
        */
        stack.push(neighbour);
    }
}

export default DFS;