import Node from "../utils/Node";
import LinkedQueue from "../utils/linkedCollection/LinkedQueue";

const bidirectionalBFS = (startNode: Node, endNode: Node) => {
    const queueStart = new LinkedQueue<Node>();
    const queueEnd = new LinkedQueue<Node>();

    const closedStart = new Set<Node>();
    const closedEnd = new Set<Node>();
    const path = new Array<Node>();
    const visitedNodes = new Array<Node>();

    queueStart.enq(startNode);
    queueEnd.enq(endNode);
    
    while (!(queueStart.isEmpty() || queueEnd.isEmpty())) {
         // Can't be null otherwise the queue would've been empty
        const currentStart = queueStart.deq()!;
        if (closedStart.has(currentStart)) continue;
        if (currentStart !== startNode && currentStart !== endNode) { visitedNodes.push(currentStart); }
        closedStart.add(currentStart);

        if (currentStart === endNode || closedEnd.has(currentStart)) {
            buildPath(path, currentStart);
            return { path, visitedNodes, success: true }
        }

        updateNeighbours(currentStart, closedStart, queueStart, "start");

        const currentEnd = queueEnd.deq()!;
        if (closedEnd.has(currentEnd)) continue;
        if (currentEnd !== startNode && currentEnd !== endNode) { visitedNodes.push(currentEnd); }
        closedEnd.add(currentEnd);

        if (currentEnd === startNode || closedStart.has(currentEnd)) {
            buildPath(path, currentEnd);
            return { path, visitedNodes, success: true }
        }

        updateNeighbours(currentEnd, closedEnd, queueEnd, "end");
    }

    return { path, visitedNodes, success: false, error: "No path exists!" }
}

const updateNeighbours = (node: Node, closedSet: Set<Node>, queue: LinkedQueue<Node>, type: string) => {
    for (const neighbour of node) {
        if (closedSet.has(neighbour) || neighbour.isWall) continue;
        
        if (type == "start") {
            neighbour.previous = node;
        } else {
            neighbour.altPrevious = node;
        }
        
        queue.enq(neighbour);
        
        /*
            Add to closed even if not visited since we don't want to queue it 
            again (it will always be the same node).
            Add to visited once visited for visual.
        */
    }
}

const buildPath = (path: Array<Node>, intersectionNode: Node) => {
    let temp = intersectionNode;
    path.push(temp);
    while(temp.altPrevious !== null) {
        path.push(temp.altPrevious);
        temp = temp.altPrevious;
    }
    path.reverse();

    temp = intersectionNode;
    path.push(temp);
    while(temp.previous !== null) {
        path.push(temp.previous);
        temp = temp.previous;
    }
}

export default bidirectionalBFS;