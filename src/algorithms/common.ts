import Node from "../utils/node/Node";

// Manhattan distance
export const manhattanHeuristic = (nodeA: Node, nodeB: Node): number => {
	return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y);
};


// const p = new PriorityQueue<String>();
// p.push("2", 1, 2);
// p.push("3", 3, 0);
// p.push("5", 100, 0);
// p.push("1", 1, 1);
// p.push("4", 3, 1);

// while (!p.isEmpty()) {
//     console.log(p.pop());
// }

// const q = new LinkedQueue<number>();
// q.enq(5);
// q.enq(4);
// q.enq(3);
// q.enq(2);
// q.enq(1);

// while (!q.isEmpty()) {
//     console.log(q.deq())
// }

// const q = new LinkedQueue<number>();
// q.enq(5);
// q.enq(4);
// q.enq(3);
// q.enq(2);
// q.enq(1);

// while (!q.isEmpty()) {
//     console.log(q.deq())
// }
