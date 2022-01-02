import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import Node from "../utils/node/Node";
import NodeComponent from "./NodeComponent";
import {
	astar,
	greedy,
	djikstra,
	swarm,
	BFS,
	DFS,
	bidirectionalBFS,
} from "../algorithms/algorithms";
import {
	COLUMNS,
	ROWS,
	START_COL,
	END_COL,
	START_ROW,
	END_ROW,
} from "../utils/constants";
import { nodeType, pathAlgorithm, Vector2 } from "../types";
import "./styles/PathFinder.css";
import { clearAllTimeouts } from "../utils/clearAllTimeouts";
import LinkedStack from "../utils/linkedCollection/LinkedStack";
import { recursiveBacktracker } from "../algorithms/maze/recursiveBacktracker";
import { start } from "repl";

const fillGrid = (grid: Array<Array<Node>>): void => {
	for (let i = 0; i < COLUMNS; i++) {
		for (let j = 0; j < ROWS; j++) {
			grid[i][j] = new Node(i, j);
		}
	}
};

const initNodeNeighbours = (grid: Array<Array<Node>>): void => {
	for (let i = 0; i < COLUMNS; i++) {
		for (let j = 0; j < ROWS; j++) {
			grid[i][j].addNeighbours(grid);
		}
	}
};

enum pathAlgorithmName {
	ASTAR = "astar",
	GREEDY = "greedy",
	DJIKSTRA = "djikstra",
	SWARM = "swarm",
	BFS = "bfs",
	BIDIRECTIONAL_BFS = "bidirectionalBFS",
	DFS = "dfs",
}

const pathPlanners: Record<pathAlgorithmName, pathAlgorithm> = {
	[pathAlgorithmName.ASTAR]: astar,
	[pathAlgorithmName.GREEDY]: greedy,
	[pathAlgorithmName.DJIKSTRA]: djikstra,
	[pathAlgorithmName.SWARM]: swarm,
	[pathAlgorithmName.BFS]: BFS,
	[pathAlgorithmName.BIDIRECTIONAL_BFS]: bidirectionalBFS,
	[pathAlgorithmName.DFS]: DFS,
};

const setAllWalls = (grid: Node[][]): void => {
	grid.forEach((row: Array<Node>, rowIdx: number) => {
		row.forEach((node: Node, nodeIdx: number) => {
			node.isWall = true;
		});
	});
};

const randomMazeGenerator = (
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

const PathFinder: FC<{}> = (): ReactElement => {
	const [grid, setGrid] = useState([] as Node[][]);
	const [visitedNodes, setVisitedNodes] = useState([] as Node[]);
	const [selectedPathAlgorithmName, setSelectedPathAlgorithmName] = useState(
		pathAlgorithmName.ASTAR
	);
	const wKeyDown = useRef(false);
	const mouseDown = useRef(false);
	const selectedNodeType = useRef(nodeType.NORMAL);
	const startLocation = useRef({ x: START_COL, y: START_ROW });
	const endLocation = useRef({ x: END_COL, y: END_ROW });

	const weightedPlanners = [
		pathAlgorithmName.ASTAR,
		pathAlgorithmName.DJIKSTRA,
		pathAlgorithmName.GREEDY,
	];
	const isWeightedAlgorithm = weightedPlanners.includes(
		selectedPathAlgorithmName
	);

    // TODO: Is running ref to block walling during runs

	const timeoutId = useRef(0);

    const recursiveBacktrackerMaze = () => {
        clearVisited();
        clearWalls();
 
        if (startLocation.current.x % 2 == 0) {
            grid[startLocation.current.x][startLocation.current.y].isStart = false;
            if (startLocation.current.x + 1 < grid.length) {
                startLocation.current.x += 1
            } else {
                startLocation.current.x -= 1
            }; 
        }
        if (startLocation.current.y % 2 == 0) { 
            grid[startLocation.current.x][startLocation.current.y].isStart = false;
            if (startLocation.current.y + 1 < grid[0].length) {
                startLocation.current.y += 1
            } else {
                startLocation.current.y -= 1
            }; 
        }
        if (endLocation.current.x % 2 == 0) { 
            grid[endLocation.current.x][endLocation.current.y].isEnd = false;
            if (endLocation.current.x + 1 < grid.length) {
                endLocation.current.x += 1
            } else {
                endLocation.current.x -= 1
            }; 
        }
        if (endLocation.current.y % 2 == 0) { 
            grid[endLocation.current.x][endLocation.current.y].isEnd = false;
            if (endLocation.current.y + 1 < grid[0].length) {
                endLocation.current.y += 1
            } else {
                endLocation.current.y -= 1
            }; 
        }

        grid[startLocation.current.x][startLocation.current.y].isStart = true;
        grid[endLocation.current.x][endLocation.current.y].isEnd = true;
        setGrid([...grid]);



        //setGrid([...recursiveBacktracker(grid, startLocation.current, endLocation.current)]);
        setTimeout(() => {
            const { walls, clearNodes } = recursiveBacktracker(grid, startLocation.current, endLocation.current);
            const DELAY_WALLS = 5;
            const DELAY_CLEAR = 20;

            walls.forEach((wall, idx) => {
                grid[wall.x][wall.y].isWall = true;
                setTimeout(() => {
                    document
                        .getElementById(`node-${wall.x}-${wall.y}`)!
                        .classList.add("node-wall");
                }, DELAY_WALLS * idx);
            });

            clearNodes.forEach((node, idx) => {
                grid[node.x][node.y].isWall = false;
                setTimeout(() => {
                    document
                        .getElementById(`node-${node.x}-${node.y}`)!
                        .classList.remove("node-wall");
                }, (walls.length) * DELAY_WALLS + DELAY_CLEAR * idx);
            });

            // setTimeout(() => setGrid([...grid]), walls.length * DELAY_WALLS + clearNodes.length * DELAY_CLEAR)

        }, 100);


    }

    const randomMaze = () => {
        clearVisited();
        const walls = randomMazeGenerator(grid, startLocation.current, endLocation.current);

        walls.forEach((wall, idx) => {
            grid[wall.x][wall.y].isWall = true;
			setTimeout(() => {
				document
					.getElementById(`node-${wall.x}-${wall.y}`)!
					.classList.add("node-wall");
			}, 10 * idx);
		});
    }

	const armTimeout = () => {
		timeoutId.current = setTimeout(() => {}, 0) as unknown as number;
	};

	const clearTimeouts = () => {
		const lastTimeout = setTimeout(() => {}, 0) as unknown as number;
		clearAllTimeouts(timeoutId.current, lastTimeout);
	};

    const clearWeights = (wall: boolean = false) => {
        grid.forEach((row: Array<Node>, rowIdx: number) => {
            row.forEach((node: Node, nodeIdx: number) => {
                wall ? node.isWall = false : node.isWeight = false;
            });
        });

        setGrid([...grid]);
    };

	const setSelectedPathAlgorithmNameWrapped = (name: pathAlgorithmName) => {
		if (!weightedPlanners.includes(name)) {
			clearWeights();
		}

		setSelectedPathAlgorithmName(name);
	};

	const initGrid = (): void => {
		const grid: Array<Array<Node>> = Array.from(
			Array(COLUMNS),
			() => new Array(ROWS)
		);

		fillGrid(grid);
		setGrid(grid);
		initNodeNeighbours(grid);

		setVisitedNodes(visitedNodes);

		startLocation.current = { x: START_COL, y: START_ROW };
		endLocation.current = { x: END_COL, y: END_ROW };
	};

	useEffect(() => {
		initGrid();

		window.addEventListener("mousedown", (e) => (mouseDown.current = true));
		window.addEventListener("mouseup", (e) => (mouseDown.current = false));

		return () => {
			window.removeEventListener("mousedown", () => {});
			window.removeEventListener("mouseup", () => {});
		};
	}, []);

	useEffect(() => {
		window.addEventListener("keydown", (e) => {
			if (isWeightedAlgorithm) {
				e.key === "w" && (wKeyDown.current = true);
			} else {
				wKeyDown.current = false;
			}
		});
		window.addEventListener(
			"keyup",
			(e) =>
				isWeightedAlgorithm &&
				e.key === "w" &&
				(wKeyDown.current = false)
		);

		return () => {
			window.removeEventListener("keydown", () => {});
			window.removeEventListener("keyup", () => {});
		};
	}, [isWeightedAlgorithm]);

	const resetGrid = (): void => {
        clearWalls();
		clearTimeouts();
		clearVisited();
		initGrid(); // TODO: pass start and end so same.
	};

    const clearWalls = (): void => {
        clearTimeouts();
        clearWeights(true);
        clearVisited();
		const walls = document.getElementsByClassName("node-wall");

		// The collection is live, changes as we remove
		while (walls.length) {
			walls[0].classList.remove("node-wall");
		}
	};

	const clearVisited = (): void => {
		clearTimeouts();
		const visited = document.getElementsByClassName("node-visited");
		const path = document.getElementsByClassName("node-shortest-path");

		// The collection is live, changes as we remove
		while (visited.length) {
			visited[0].classList.remove("node-visited");
		}
		while (path.length) {
			path[0].classList.remove("node-shortest-path");
		}
	};

	const visualizePath = (path: Array<Node>) => {
		path.forEach((node: Node, idx: number) => {
			setTimeout(() => {
				document
					.getElementById(`node-${node.x}-${node.y}`)!
					.classList.add("node-shortest-path");
			}, 10 * idx);
		});
	};

	const visualize = () => {
		const startNode =
			grid[startLocation.current.x][startLocation.current.y];
		const endNode = grid[endLocation.current.x][endLocation.current.y];
		const { path, visitedNodes } = pathPlanners[selectedPathAlgorithmName](
			startNode,
			endNode
		);

		clearVisited();

		armTimeout();

		visitedNodes.forEach((node: Node, idx: number) => {
			setTimeout(() => {
				document
					.getElementById(`node-${node.x}-${node.y}`)!
					.classList.add("node-visited");
			}, 20 * idx);
		});
		setTimeout(() => {
			visualizePath(path);
		}, 20 * visitedNodes.length);
	};

	const clickHandler = (x: number, y: number) => {
		if (x === startLocation.current.x && y === startLocation.current.y) {
			selectedNodeType.current = nodeType.START;
		} else if (x === endLocation.current.x && y === endLocation.current.y) {
			selectedNodeType.current = nodeType.END;
		} else {
			selectedNodeType.current = nodeType.NORMAL;
			wKeyDown.current
				? grid[x][y].toggleWeight()
				: grid[x][y].toggleWall();
			setGrid([...grid]);
		}
	};

	const actionHandler = (x: number, y: number) => {
		if (!mouseDown.current) {
			return;
		}

		switch (selectedNodeType.current) {
			case nodeType.START:
				grid[startLocation.current.x][startLocation.current.y].isStart =
					false;
				grid[x][y].isStart = true;
				grid[x][y].isWall = false;
				startLocation.current = { x, y };
				break;

			case nodeType.END:
				grid[endLocation.current.x][endLocation.current.y].isEnd =
					false;
				grid[x][y].isEnd = true;
				grid[x][y].isWall = false;
				endLocation.current = { x, y };
				break;

			case nodeType.NORMAL:
				wKeyDown.current
					? grid[x][y].toggleWeight()
					: grid[x][y].toggleWall();
				break;

			default:
				break;
		}
		setGrid([...grid]);
	};

	const gridNodes = () => {
		return (
			<div className="wrapper">
				{grid.map((row: Array<Node>, rowIdx: number) => {
					return (
						<div className="col-wrapper" key={rowIdx}>
							{row.map((node: Node, nodeIdx: number) => {
								return (
									<NodeComponent
										onClick={() =>
											clickHandler(node.x, node.y)
										}
										action={() =>
											actionHandler(node.x, node.y)
										}
										key={nodeIdx}
										isStart={node.isStart}
										isEnd={node.isEnd}
										isWall={node.isWall}
										isWeight={node.isWeight}
										row={node.y}
										col={node.x}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div className="path-finder">
			<button onClick={visualize}>Vis</button>
			<button onClick={() => randomMaze()}>
				Random Maze
			</button>
            <button onClick={() => recursiveBacktrackerMaze()}>
				Recursive Backtracker Maze
			</button>
			<button onClick={() => resetGrid()}>Reset Board</button>
			<button onClick={() => clearVisited()}>Clear Path</button>
            <button onClick={() => clearWalls()}>Clear Walls</button>
			<button
				onClick={() =>
					setSelectedPathAlgorithmNameWrapped(pathAlgorithmName.ASTAR)
				}
			>
				{pathAlgorithmName.ASTAR}
			</button>
			<button
				onClick={() =>
					setSelectedPathAlgorithmNameWrapped(
						pathAlgorithmName.GREEDY
					)
				}
			>
				{pathAlgorithmName.GREEDY}
			</button>
			<button
				onClick={() =>
					setSelectedPathAlgorithmNameWrapped(
						pathAlgorithmName.DJIKSTRA
					)
				}
			>
				{pathAlgorithmName.DJIKSTRA}
			</button>
			<button
				onClick={() =>
					setSelectedPathAlgorithmNameWrapped(pathAlgorithmName.SWARM)
				}
			>
				{pathAlgorithmName.SWARM}
			</button>
			<button
				onClick={() =>
					setSelectedPathAlgorithmNameWrapped(pathAlgorithmName.BFS)
				}
			>
				{pathAlgorithmName.BFS}
			</button>
			<button
				onClick={() =>
					setSelectedPathAlgorithmNameWrapped(
						pathAlgorithmName.BIDIRECTIONAL_BFS
					)
				}
			>
				{pathAlgorithmName.BIDIRECTIONAL_BFS}
			</button>
			<button
				onClick={() =>
					setSelectedPathAlgorithmNameWrapped(pathAlgorithmName.DFS)
				}
			>
				{pathAlgorithmName.DFS}
			</button>
			<h2>{selectedPathAlgorithmName}</h2>
			{gridNodes()}
		</div>
	);
};

export default PathFinder;
