import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { MeshProps } from "@react-three/fiber";
import type { Todo } from "../../types.d";
import { type TodoActionType } from "../shared/todoReducer";
import { Html, type Plane, RoundedBox, useTexture } from "@react-three/drei";
import Checkmark from "./design/Checkmark";
import BaseTodoModal from "./design/modals/BaseTodo";

interface BoxProps extends MeshProps {
	index: number;
	last: number;
	position: [number, number, number];
	dimension: [number, number, number];
	todo: Todo;
	hue: number;
	dispatch: React.Dispatch<TodoActionType>;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoBox = ({
	index,
	last,
	position,
	dimension,
	todo,
	hue,
	dispatch,
	setVisible,
}: BoxProps) => {
	const matcap = useTexture(
		"./matcaps/Matcap_8D8D8D_DDDDDD_CCCCCC_B7B7B7-256px.png"
	);
	const [hovered, setHovered] = useState(false);

	console.log(position);

	return (
		<RoundedBox
			position={position}
			args={dimension}
			radius={0.1}
			onClick={() => {
				if (index === last) {
					dispatch({ type: "remove_todo", payload: todo.id });
				}
			}}
			onPointerEnter={(e) => {
				e.stopPropagation();
				setVisible(true);
				setHovered(true);
			}}
			onPointerLeave={(e) => {
				e.stopPropagation();
				setVisible(false);
				setHovered(false);
			}}>
			{index === last ? (
				<BaseTodoModal
					title={todo.title}
					body={todo.body}
					duration={todo.duration}
				/>
			) : null}
			<meshMatcapMaterial
				matcap={matcap}
				color={
					hovered
						? "hotpink"
						: `hsl(${hue}, 70%, ${todo.priority * 9 + 55}%)`
				}
			/>
		</RoundedBox>
	);
};

export default TodoBox;
