import React, { useContext, useEffect, useState } from "react";
import type { MeshProps } from "@react-three/fiber";
import type { Todo } from "../../types.d";
import { RoundedBox, useTexture } from "@react-three/drei";
import { EventsContext } from "../shared/EventContext";

interface BoxProps extends MeshProps {
	index: number;
	last: number;
	position: [number, number, number];
	dimension: [number, number, number];
	todo: Todo;
	hue: number;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setBaseTodo: React.Dispatch<React.SetStateAction<boolean>>;
	setEditTodo: React.Dispatch<React.SetStateAction<number>>;
}

const TodoBox = ({
	index,
	last,
	position,
	dimension,
	todo,
	hue,
	setVisible,
	setBaseTodo,
	setEditTodo,
	children,
}: BoxProps) => {
	const matcap = useTexture(
		"./matcaps/Matcap_8D8D8D_DDDDDD_CCCCCC_B7B7B7-256px.png"
	);
	const { disableEvents } = useContext(EventsContext);
	const [hovered, setHovered] = useState(false);
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		if (!disableEvents) {
			setHovered(false);
			setSelected(false);
		}
	}, [disableEvents]);

	return (
		<RoundedBox
			position={position}
			args={dimension}
			radius={0.1}
			onClick={(e) => {
				e.stopPropagation();
				if (!disableEvents) {
					if (index === last) {
						setBaseTodo(true);
					} else {
						setEditTodo(index);
					}
					setSelected(true);
				}
			}}
			onPointerMissed={(e) => {
				e.stopPropagation();
				setBaseTodo(false);
				setHovered(false);
				setVisible(false);
			}}
			onPointerEnter={(e) => {
				e.stopPropagation();
				if (!disableEvents) {
					setHovered(true);
					setVisible(true);
				}
			}}
			onPointerLeave={(e) => {
				e.stopPropagation();
				if (!disableEvents) {
					setHovered(false);
					setVisible(false);
				}
			}}>
			<meshMatcapMaterial
				matcap={matcap}
				color={
					selected
						? "#FB8500"
						: hovered && !disableEvents
						? "#FFB703"
						: `hsl(${hue}, 70%, ${todo.priority * 9 + 55}%)`
				}
			/>
			{children}
		</RoundedBox>
	);
};

export default TodoBox;
