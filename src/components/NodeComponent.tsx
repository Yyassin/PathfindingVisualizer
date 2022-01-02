import React from "react";
import "./styles/Node.css";

type NodeProps = {
	isStart: boolean;
	isEnd: boolean;
	isWall: boolean;
    isWeight: boolean;
	row: number;
	col: number;
	action: () => void;
	onClick: () => void;
};

const NodeComponent = (props: NodeProps) => {
	const classes = props.isStart
		? "node-start"
		: props.isEnd
		? "node-end"
		: props.isWall
		? "node-wall"
        : props.isWeight
		? "node-weight"
		: "";

	return (
		<div
			onMouseDown={props.onClick}
			onMouseEnter={props.action}
			className={`node ${classes}`}
			id={`node-${props.col}-${props.row}`}
		></div>
	);
};

export default NodeComponent;
