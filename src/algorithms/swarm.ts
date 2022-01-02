import PriorityQueue from "../utils/priorityQueue/PriorityQueue";
import Node from "../utils/node/Node";
import { directionType, heuristicFunction } from "../types";
import { manhattanHeuristic } from "./common";

const swarm = (
	startNode: Node,
	endNode: Node,
	heuristic: heuristicFunction = (nodeA: Node, nodeB: Node) =>
		Math.pow(manhattanHeuristic(nodeA, nodeB), 8)
) => {
	const openSet = new PriorityQueue<Node>();
	const closedSet = new Set<Node>();
	const path = new Array<Node>();
	const visitedNodes = new Array<Node>();

	let currentNode: Node | null = null;
	startNode.direction = directionType.RIGHT;
	openSet.push(startNode);
	while (!openSet.isEmpty()) {
		// Can't be null otherwise the set would've been empty
		currentNode = openSet.pop()!;
		closedSet.add(currentNode);

		if (currentNode !== startNode && currentNode !== endNode) {
			visitedNodes.push(currentNode);
		}

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

const getDistance = (node: Node, endNode: Node) => {
	if (endNode.y < node.y) {
		// up
		switch (node.direction) {
			case directionType.RIGHT:
				return [2, directionType.UP];
			case directionType.LEFT:
				return [2, directionType.UP];
			case directionType.UP:
				return [1, directionType.UP];
			case directionType.DOWN:
				return [3, directionType.UP];
			default:
				break;
		}
	}
	if (endNode.y > node.y) {
		// down
		switch (node.direction) {
			case directionType.RIGHT:
				return [2, directionType.DOWN];
			case directionType.LEFT:
				return [2, directionType.DOWN];
			case directionType.UP:
				return [3, directionType.DOWN];
			case directionType.DOWN:
				return [1, directionType.DOWN];
			default:
				break;
		}
	}
	if (endNode.x < node.x) {
		// left
		switch (node.direction) {
			case directionType.RIGHT:
				return [3, directionType.LEFT];
			case directionType.LEFT:
				return [1, directionType.LEFT];
			case directionType.UP:
				return [2, directionType.LEFT];
			case directionType.DOWN:
				return [2, directionType.LEFT];
			default:
				break;
		}
	}
	if (endNode.x > node.x) {
		// right
		switch (node.direction) {
			case directionType.RIGHT:
				return [1, directionType.RIGHT];
			case directionType.LEFT:
				return [3, directionType.RIGHT];
			case directionType.UP:
				return [2, directionType.RIGHT];
			case directionType.DOWN:
				return [2, directionType.RIGHT];
			default:
				break;
		}
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

		let distance: any = getDistance(node, neighbour);
		//console.log(node, neighbour, distance);

		/* Update the g value for all neighbours */
		const tempF = node.f + distance[0] * heuristic(neighbour, endNode);

		if (openSet.includes(neighbour) && tempF >= openSet.get(neighbour)!.f) {
			continue;
		}

		neighbour.f = tempF;
		neighbour.direction = distance[1];
		neighbour.previous = node;

		openSet.push(neighbour);
	}
};

export default swarm;
