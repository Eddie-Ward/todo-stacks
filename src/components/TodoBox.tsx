import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { MeshProps } from "@react-three/fiber";
import type { Todo } from "../../types.d";
import { type TodoActionType } from "../shared/todoReducer";
import { Html, type Plane, RoundedBox, useTexture } from "@react-three/drei";

interface BoxProps extends MeshProps {
	index: number;
	last: number;
	position: [number, number, number];
	todo: Todo;
	hue: number;
	dispatch: React.Dispatch<TodoActionType>;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoBox = ({
	index,
	last,
	position,
	todo,
	hue,
	dispatch,
	setVisible,
}: BoxProps) => {
	const matcap = useTexture(
		"./matcaps/Matcap_8D8D8D_DDDDDD_CCCCCC_B7B7B7-256px.png"
	);
	const [hovered, setHovered] = useState(false);

	return (
		<RoundedBox
			position={position}
			args={[1, todo.duration * 0.25, 1]}
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
				<Html
					as="div"
					className="w-40 bg-t-light-blue text-center"
					style={{ translate: "-50% -100%" }}
					position={[0, todo.duration * 0.125 + 0.25, 0]}>
					<h1>{todo.title}</h1>
					<p>{todo.body}</p>
				</Html>
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
