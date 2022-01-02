import Node from "../utils/node/Node";
import LinkedQueue from "../utils/linkedCollection/LinkedQueue";

const BFS = (startNode: Node, endNode: Node) => {
	const queue = new LinkedQueue<Node>();
	// Make a linkedSet instead of 2.
	const closedSet = new Set<Node>();
	const path = new Array<Node>();
	const visitedNodes = new Array<Node>();

	queue.enq(startNode);
	while (!queue.isEmpty()) {
		// Can't be null otherwise the queue would've been empty
		const currentNode = queue.deq()!;
		if (closedSet.has(currentNode)) continue;
		if (currentNode !== startNode && currentNode !== endNode) {
			visitedNodes.push(currentNode);
		}
		closedSet.add(currentNode);

		if (currentNode === endNode) {
			buildPath(path, currentNode);
			return { path, visitedNodes, success: true };
		}

		updateNeighbours(currentNode, closedSet, queue);
	}

	return { path, visitedNodes, success: false, error: "No path exists!" };
};

// Import this, same as others
const buildPath = (path: Array<Node>, endNode: Node): void => {
	let temp = endNode;
	path.push(temp);
	while (temp.previous != null) {
		path.push(temp.previous);
		temp = temp.previous;
	}
};

const updateNeighbours = (
	node: Node,
	closedSet: Set<Node>,
	queue: LinkedQueue<Node>
) => {
	for (const neighbour of node) {
		if (closedSet.has(neighbour) || neighbour.isWall) continue;
		neighbour.previous = node;

		queue.enq(neighbour);

		/*
            Add to closed even if not visited since we don't want to queue it 
            again (it will always be the same node).
            Add to visited once visited for visual.
        */
	}
};

export default BFS;
