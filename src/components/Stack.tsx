import { Stack, type Todo } from "@prisma/client";
import { Html, useBounds } from "@react-three/drei";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { EventsContext } from "../shared/EventContext";
import BaseTodoModal from "./design/modals/BaseTodoModal";
import EditTodoModal from "./design/modals/EditTodoModal";
import NewTodoModal from "./design/modals/NewTodoModal";
import Add from "./design/svg/Add";
import StackFloor from "./StackFloor";
import TodoBox from "./TodoBox";

interface StackProps {
	position: [number, number];
	dimension: [number, number];
	heightScale: number;
	stack: Stack & { Todo: Todo[] };
}

const Stack = ({ position, dimension, heightScale, stack }: StackProps) => {
	const bounds = useBounds();
	const { disableEvents, setDisableEvents } = useContext(EventsContext);

	const [visible, setVisible] = useState(false);
	const [baseModalOpen, setBaseModalOpen] = useState(false);
	const [newTodo, setNewTodo] = useState(false);
	const [editTodo, setEditTodo] = useState(-1);

	useEffect(() => {
		if (baseModalOpen || editTodo !== -1 || newTodo) {
			setDisableEvents(true);
		} else {
			setDisableEvents(false);
		}
		return () => {
			setDisableEvents(false);
			bounds.refresh().clip().fit();
		};
	}, [stack, bounds, setDisableEvents, baseModalOpen, newTodo, editTodo]);

	const heights = useMemo(() => {
		let curHeight = 0;
		let offsetY = 0;
		const results = [];
		for (let i = 0; i < stack.Todo.length; i++) {
			curHeight = stack.Todo[i].duration * heightScale;
			results.push(offsetY + curHeight / 2);
			offsetY += curHeight;
		}
		return results;
	}, [stack, heightScale]);

	return (
		<>
			<StackFloor
				position={position}
				dimension={dimension}
				scale={1.5}
				visible={visible || baseModalOpen || editTodo !== -1}
				length={stack.Todo.length}>
				{stack.Todo.length === 0 ? (
					<Html
						style={{ translate: "-50% -100%" }}
						position={[0, 0, 0]}
						zIndexRange={[100, 0]}>
						<button
							className="btn-icon scale-75 bg-green-500 hover:bg-green-600"
							onClick={() => setNewTodo(true)}
							disabled={disableEvents}>
							<Add />
						</button>
					</Html>
				) : null}
			</StackFloor>
			{stack.Todo.map((todo, index) => (
				<TodoBox
					key={todo.id}
					index={index}
					last={stack.Todo.length - 1}
					position={[
						position[0],
						heights[index] + index * 0.01 + 0.02,
						position[1],
					]}
					dimension={[
						dimension[0],
						todo.duration * heightScale,
						dimension[1],
					]}
					todo={todo}
					hue={stack.hue}
					setVisible={setVisible}
					setBaseModal={setBaseModalOpen}
					setEditTodo={setEditTodo}>
					{index === stack.Todo.length - 1 && baseModalOpen ? (
						<BaseTodoModal
							todo={todo}
							index={index}
							setEditTodo={setEditTodo}
							setNewTodo={setNewTodo}
						/>
					) : null}
				</TodoBox>
			))}
			{editTodo !== -1 ? (
				<EditTodoModal
					todo={stack.Todo[editTodo]}
					setEditTodo={setEditTodo}
				/>
			) : null}
			{newTodo ? (
				<NewTodoModal
					stackId={stack.id}
					category={stack.category}
					setNewTodo={setNewTodo}
				/>
			) : null}
		</>
	);
};

export default Stack;
