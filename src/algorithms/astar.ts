import PriorityQueue from "../utils/priorityQueue/PriorityQueue";
import Node from "../utils/node/Node";
import { heuristicFunction } from "../types";
import { manhattanHeuristic } from "./common";

const astar = (
	startNode: Node,
	endNode: Node,
	heuristic: heuristicFunction = manhattanHeuristic
) => {
	const openSet = new PriorityQueue<Node>();
	const closedSet = new Set<Node>();
	const path = new Array<Node>();
	const visitedNodes = new Array<Node>();

	let currentNode: Node | null = null;
	openSet.push(startNode);
	while (!openSet.isEmpty()) {
		// Can't be null otherwise the set would've been empty
		currentNode = openSet.pop()!;

		if (closedSet.has(currentNode)) continue;
		if (currentNode !== startNode && currentNode !== endNode) {
			visitedNodes.push(currentNode);
		}

		closedSet.add(currentNode);

		// We've reached the last node, path found.
		if (currentNode === endNode) {
			buildPath(path, currentNode);
			return { path, visitedNodes, success: true };
		}

		updateNeighbours(currentNode, endNode, closedSet, openSet, heuristic);
	}

	return { path, visitedNodes, success: false, error: "No path exists!" };
};

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
	endNode: Node,
	closedSet: Set<Node>,
	openSet: PriorityQueue<Node>,
	heuristic: heuristicFunction
) => {
	for (const neighbour of node) {
		// Don't visit if already visited or wall
		if (closedSet.has(neighbour) || neighbour.isWall) continue;

		/* Update the g value for all neighbours */
        const cost = neighbour.isWeight ? Node.WEIGHT : 1;
		const tempG = node.g + cost;

		if (openSet.includes(neighbour) && tempG >= openSet.get(neighbour)!.g) {
			continue;
		}

		neighbour.g = tempG;
		neighbour.h = heuristic(neighbour, endNode);
		neighbour.f = neighbour.g + neighbour.h;
		neighbour.previous = node;

		openSet.push(neighbour);
	}
};

export default astar;
