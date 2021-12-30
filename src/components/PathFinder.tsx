import React, { FC, ReactElement, useState, useEffect, useRef } from 'react';
import Node from "../utils/Node";
import NodeComponent from "./NodeComponent";
import { astar, greedy, djikstra, swarm, BFS, DFS, bidirectionalBFS } from '../algorithms/algorithms';
import { COLUMNS, ROWS, START_COL, END_COL, START_ROW, END_ROW } from '../utils/constants';
import { nodeType, pathAlgorithm } from '../types';
import "./styles/PathFinder.css"

const fillGrid = (grid: Array<Array<Node>>): void => {
    for (let i = 0; i < COLUMNS; i++) {
        for (let j = 0; j < ROWS; j++) {
            grid[i][j] = new Node(i, j);
        }
    }
}

const initNodeNeighbours = (grid: Array<Array<Node>>): void => {
    for (let i = 0; i < COLUMNS; i++) {
        for (let j = 0; j < ROWS; j++) {
            grid[i][j].addNeighbours(grid);
        }
    }
}

enum pathAlgorithmName {
    ASTAR="astar", 
    GREEDY="greedy",
    DJIKSTRA="djikstra",
    SWARM="swarm",
    BFS="bfs",
    BIDIRECTIONAL_BFS="bidirectionalBFS",
    DFS="dfs"
}

const pathPlanners: Record<pathAlgorithmName, pathAlgorithm> = {
    [pathAlgorithmName.ASTAR] : astar,
    [pathAlgorithmName.GREEDY] : greedy,
    [pathAlgorithmName.DJIKSTRA] : djikstra,
    [pathAlgorithmName.SWARM] : swarm,
    [pathAlgorithmName.BFS] : BFS,
    [pathAlgorithmName.BIDIRECTIONAL_BFS] : bidirectionalBFS,
    [pathAlgorithmName.DFS] : DFS
}

const PathFinder: FC<{}> = (): ReactElement => {
    const [ grid, setGrid ] = useState([] as Node[][]);
    const [ visitedNodes, setVisitedNodes ] = useState([] as Node[]);
    const [ selectedPathAlgorithmName, setSelectedPathAlgorithmName ] = useState(pathAlgorithmName.ASTAR);
    const mouseDown = useRef(false);
    const selectedNodeType = useRef(nodeType.NORMAL)
    const startLocation = useRef({x: START_COL, y: START_ROW})
    const endLocation = useRef({x: END_COL, y: END_ROW})


    useEffect(() => {
        initGrid();

        window.addEventListener("mousedown", e => mouseDown.current = true);
        window.addEventListener("mouseup", e => mouseDown.current = false);
    }, []);

    const initGrid = (): void => {
        const grid: Array<Array<Node>> = Array.from(Array(COLUMNS), () => new Array(ROWS));

        fillGrid(grid);
        setGrid(grid);
        initNodeNeighbours(grid);

        setVisitedNodes(visitedNodes);
    }

    const resetGrid = (): void => {
        clearVisited();
        initGrid(); // TODO: pass start and end so same.
    }

    const clearVisited = (): void => {
        const visited = document.getElementsByClassName("node-visited");
        const path = document.getElementsByClassName("node-shortest-path");

        // The collection is live, changes as we remove
        while (visited.length) {
            visited[0].classList.remove("node-visited");
        }
        while (path.length) {
            path[0].classList.remove("node-shortest-path");
        }
    }

    const visualizePath = (path: Array<Node>) => {
        path.forEach((node: Node, idx: number) => {
            setTimeout(() => {
                document.getElementById(`node-${node.x}-${node.y}`)!
                    .classList.add("node-shortest-path");
            }, 10 * idx);
        })
    }

    const visualize = () => {
        const startNode = grid[startLocation.current.x][startLocation.current.y];
        const endNode = grid[endLocation.current.x][endLocation.current.y];
        const { path, visitedNodes } = pathPlanners[selectedPathAlgorithmName](startNode, endNode);
                
        clearVisited();

        visitedNodes.forEach((node: Node, idx: number) => {
            setTimeout(() => {
                document.getElementById(`node-${node.x}-${node.y}`)!
                    .classList.add("node-visited");
            }, 20 * idx);
        })
        setTimeout(() => {
            visualizePath(path);
        }, 20 * visitedNodes.length);
    };

    const clickHandler = (x: number, y: number) => {
        if (x === startLocation.current.x && y === startLocation.current.y) {
            selectedNodeType.current = nodeType.START;
        } 
        else if ((x === endLocation.current.x && y === endLocation.current.y)) {
            selectedNodeType.current = nodeType.END;
        } else {
            selectedNodeType.current = nodeType.NORMAL;
            grid[x][y].toggleWall();
            setGrid([...grid]);
        }
    }

    const actionHandler = (x: number, y: number) => {
        if (!mouseDown.current) { return; }

        switch(selectedNodeType.current) {
            case nodeType.START:
                grid[startLocation.current.x][startLocation.current.y].isStart = false;
                grid[x][y].isStart = true;
                grid[x][y].isWall = false;
                startLocation.current = { x, y };
                break;

            case nodeType.END:
                grid[endLocation.current.x][endLocation.current.y].isEnd = false;
                grid[x][y].isEnd = true;
                grid[x][y].isWall = false;
                endLocation.current = { x, y };
                break;

            case nodeType.NORMAL:
                grid[x][y].toggleWall();
                break;

            default: break;
        }
        setGrid([...grid]);
        
    };

    const gridNodes = () => 
    (
       <div className="wrapper">
           {grid.map((row: Array<Node>, rowIdx: number) => {
               return (
                   <div className="col-wrapper" key={rowIdx}>
                       {row.map((node: Node, nodeIdx: number) => {
                           return <NodeComponent 
                                       onClick={() => clickHandler(node.x, node.y)}
                                       action={() => actionHandler(node.x, node.y)}
                                       key={nodeIdx}
                                       isStart={node.isStart}
                                       isEnd={node.isEnd}
                                       isWall={node.isWall}
                                       row={node.y}
                                       col={node.x}
                                   />
                       })}
                   </div>
               )
           })}
       </div>
    );
    
    return (
        <div className="path-finder">
            <button onClick={ visualize }>Vis</button>
            <button onClick={ () => resetGrid() }>Reset Board</button>
            <button onClick={ () => clearVisited() }>Clear Path</button>
            <button onClick={ () => setSelectedPathAlgorithmName(pathAlgorithmName.ASTAR) }>{ pathAlgorithmName.ASTAR }</button>
            <button onClick={ () => setSelectedPathAlgorithmName(pathAlgorithmName.GREEDY) }>{ pathAlgorithmName.GREEDY }</button>
            <button onClick={ () => setSelectedPathAlgorithmName(pathAlgorithmName.DJIKSTRA) }>{ pathAlgorithmName.DJIKSTRA }</button>
            <button onClick={ () => setSelectedPathAlgorithmName(pathAlgorithmName.SWARM) }>{ pathAlgorithmName.SWARM }</button>
            <button onClick={ () => setSelectedPathAlgorithmName(pathAlgorithmName.BFS) }>{ pathAlgorithmName.BFS }</button>
            <button onClick={ () => setSelectedPathAlgorithmName(pathAlgorithmName.BIDIRECTIONAL_BFS) }>{ pathAlgorithmName.BIDIRECTIONAL_BFS }</button>
            <button onClick={ () => setSelectedPathAlgorithmName(pathAlgorithmName.DFS) }>{ pathAlgorithmName.DFS }</button>
            <h2>{ selectedPathAlgorithmName }</h2>
            { gridNodes() }
        </div>
    )
}

export default PathFinder;