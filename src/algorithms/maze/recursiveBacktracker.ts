import { Vector2 } from "../../types";
import LinkedStack from "../../utils/linkedCollection/LinkedStack";
import Node from "../../utils/node/Node";

type BackTrackerNeighbour = { neighbour: Node | null, dx: number, dy: number }
const getNeighbour = (node: Node, grid: Node[][], visited: Set<Node>): BackTrackerNeighbour => {
    const cols = grid.length;
    const rows = grid[0].length;
    const unvisitedNeighbours = [] as BackTrackerNeighbour[];

    // Add left
    if (node.x > 1) {
        const candidate = grid[node.x - 2][node.y];
        if (!visited.has(candidate)) unvisitedNeighbours.push(
            {neighbour: candidate, dx: -1, dy: 0 }
        )
    };
    // Add right
    if (node.x < cols - 2) {
        const candidate = grid[node.x + 2][node.y];
        if (!visited.has(candidate)) unvisitedNeighbours.push(
            {neighbour: candidate, dx: 1, dy: 0 }
        )
    }
    // Add top
    if (node.y > 1) {
        const candidate = grid[node.x][node.y - 2];
        if (!visited.has(candidate)) unvisitedNeighbours.push(
            {neighbour: candidate, dx: 0, dy: -1 }
        )
    }
    // Add bottom
    if (node.y < rows - 2) {
        const candidate = grid[node.x][node.y + 2];
        if (!visited.has(candidate)) unvisitedNeighbours.push(
            {neighbour: candidate, dx: 0, dy: 1 }
        )
    }

    if (unvisitedNeighbours.length === 0) return {neighbour: null, dx: 0, dy: 0 };

    return unvisitedNeighbours[Math.floor(Math.random() * unvisitedNeighbours.length)];

}

const recursiveBacktracker = (
	grid: Node[][],
	startNode: Vector2,
	endNode: Vector2
): { walls: Vector2[], clearNodes: Vector2[] } => {
    const walls = [] as Vector2[];
    const clearNodes = [] as Vector2[];

    grid.forEach((row: Array<Node>, x: number) => {
		row.forEach((node: Node, y: number) => {
			if (
				(x === startNode.x && y === startNode.y) ||
				(x === endNode.x && y === endNode.y)
			) {
				return;
			}

            if (!(x % 2 == 1 && y % 2 == 1)) {
                walls.push({x, y})
            }
		});
	});


    const stack = new LinkedStack<Node>();
	const visited = new Set<Node>();

    // Choose a starting point in the field
    stack.push(grid[startNode.x][startNode.y]);
	while (!stack.isEmpty()) {
        let curr: Node | null = stack.pop();

        while (curr !== null) {
            visited.add(curr);
            
            const { neighbour, dx, dy } = getNeighbour(curr, grid, visited);
            if (neighbour === null) { curr = neighbour; continue; }

            stack.push(curr);
            // rem wall
            clearNodes.push({ x: curr.x + dx, y: curr.y + dy })
            curr = neighbour;
        }
    }

    // return grid;

    return { walls, clearNodes };
}

export { recursiveBacktracker }