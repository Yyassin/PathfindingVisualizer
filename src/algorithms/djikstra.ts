import astar from "./astar";
import Node from "../utils/Node";

// TODO: Add weights later

// astar with heuristic = 0
const djikstra = (startNode: Node, endNode: Node) => {
    const heuristic = () => 0;
    return astar(startNode, endNode, heuristic);
}

export default djikstra;