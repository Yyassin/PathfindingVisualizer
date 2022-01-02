import astar from "./astar";
import Node from "../utils/node/Node";
import { heuristicFunction } from "../types";

// TODO: Add weights later

// astar with heuristic = 0
const djikstra = (startNode: Node, endNode: Node) => {
	const heuristic: heuristicFunction = () => 0;
	return astar(startNode, endNode, heuristic);
};

export default djikstra;
