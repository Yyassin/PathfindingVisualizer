import { Vector2 } from "../../types";
import Node from "../../utils/node/Node";

export const randomGenerator = (
	grid: Node[][],
	startNode: Vector2,
	endNode: Vector2
): Vector2[] => {
	const walls = [] as Vector2[];
	grid.forEach((row: Array<Node>, x: number) => {
		row.forEach((node: Node, y: number) => {
			if (
				(x === startNode.x && y === startNode.y) ||
				(x === endNode.x && y === endNode.y)
			) {
				return;
			}

            if (Math.random() < 0.33) { walls.push({x, y})}
		});
	});
    
    walls.sort(() => Math.random() - 0.5);
    return walls;
};