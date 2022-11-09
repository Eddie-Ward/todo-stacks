import React, { useContext, useState } from "react";
import type { MeshProps } from "@react-three/fiber";
import type { Todo } from "../../types.d";
import { RoundedBox, useTexture } from "@react-three/drei";
import { type TodoActionType } from "../shared/todoReducer";
import BaseTodoModal from "./design/modals/BaseTodoModal";
import EditTodoModal from "./design/modals/EditTodoModal";
import { EventsContext } from "../shared/EventContext";

interface BoxProps extends MeshProps {
	index: number;
	last: number;
	position: [number, number, number];
	dimension: [number, number, number];
	todo: Todo;
	hue: number;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	dispatch: React.Dispatch<TodoActionType>;
}

const TodoBox = ({
	index,
	last,
	position,
	dimension,
	todo,
	hue,
	setVisible,
	dispatch,
}: BoxProps) => {
	const matcap = useTexture(
		"./matcaps/Matcap_8D8D8D_DDDDDD_CCCCCC_B7B7B7-256px.png"
	);
	const { disableEvents, setDisableEvents } = useContext(EventsContext);
	const [hovered, setHovered] = useState(false);

	const [baseModalOpen, setBaseModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);

	console.log(disableEvents);

	return (
		<RoundedBox
			position={position}
			args={dimension}
			radius={0.1}
			onClick={(e) => {
				e.stopPropagation();
				if (!disableEvents) {
					if (index === last) {
						setBaseModalOpen(!baseModalOpen);
					} else {
						setEditModalOpen(true);
						setDisableEvents(true);
					}
				}
			}}
			onPointerMissed={(e) => {
				e.stopPropagation();
				setBaseModalOpen(false);
				setEditModalOpen(false);
				setHovered(false);
				setDisableEvents(false);
			}}
			onPointerEnter={(e) => {
				e.stopPropagation();
				if (!disableEvents) {
					setVisible(true);
					setHovered(true);
				}
			}}
			onPointerLeave={(e) => {
				e.stopPropagation();
				if (!disableEvents) {
					setVisible(false);
					setHovered(false);
				}
			}}>
			<meshMatcapMaterial
				matcap={matcap}
				color={
					hovered
						? "hotpink"
						: `hsl(${hue}, 70%, ${todo.priority * 9 + 55}%)`
				}
			/>
			{index == last ? (
				baseModalOpen ? (
					<BaseTodoModal
						id={todo.id}
						title={todo.title}
						body={todo.body}
						duration={todo.duration}
						dispatch={dispatch}
					/>
				) : null
			) : editModalOpen ? (
				<EditTodoModal />
			) : null}
		</RoundedBox>
	);
};

export default TodoBox;
