import React, { useContext, useEffect, useMemo, useState } from "react";
import { useBounds } from "@react-three/drei";
import BaseStackInfoModal from "./design/modals/BaseStackInfoModal";
import BaseTodoModal from "./design/modals/BaseTodoModal";
import NewTodoModal from "./design/modals/NewTodoModal";
import EditTodoModal from "./design/modals/EditTodoModal";
import EditStackModal from "./design/modals/EditStackModal";
import StackFloor from "./StackFloor";
import TodoBox from "./TodoBox";
import { EventsContext } from "../shared/EventContext";
import { trpc } from "../utils/trpc";

interface StackProps {
	position: [number, number];
	dimension: [number, number];
	heightScale: number;
	stackId: string;
}

const Stack = ({ position, dimension, heightScale, stackId }: StackProps) => {
	const { data } = trpc.stack.getStackById.useQuery(
		{ stackId },
		{ refetchOnWindowFocus: false }
	);

	const bounds = useBounds();
	const { setDisableEvents } = useContext(EventsContext);
	const [visible, setVisible] = useState(false);
	const [baseTodo, setBaseTodo] = useState(false);
	const [newTodo, setNewTodo] = useState(false);
	const [editTodo, setEditTodo] = useState(-1);
	const [editStack, setEditStack] = useState(false);

	useEffect(() => {
		if (baseTodo || editTodo !== -1 || newTodo || editStack) {
			setDisableEvents(true);
		} else {
			setDisableEvents(false);
		}
		return () => {
			setDisableEvents(false);
			bounds.refresh().clip().fit();
		};
	}, [bounds, setDisableEvents, baseTodo, newTodo, editTodo, editStack]);

	const heights = useMemo(() => {
		let curHeight = 0;
		let offsetY = 0;
		const results = [];
		if (data) {
			for (let i = 0; i < data.Todo.length; i++) {
				curHeight = data.Todo[i].duration * heightScale;
				results.push(offsetY + curHeight / 2);
				offsetY += curHeight;
			}
		}
		return results;
	}, [data, heightScale]);

	return data ? (
		<>
			<StackFloor
				position={position}
				dimension={dimension}
				scale={1.5}
				hue={data.hue}
				visible={visible || baseTodo || editTodo !== -1}
				length={data.Todo.length}
				category={data.category}
				setNewTodo={setNewTodo}
			/>
			{data.Todo.map((todo, index) => (
				<TodoBox
					key={todo.id}
					index={index}
					last={data.Todo.length - 1}
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
					hue={data.hue}
					setVisible={setVisible}
					setBaseTodo={setBaseTodo}
					setEditTodo={setEditTodo}>
					{index === data.Todo.length - 1 ? (
						<>
							{baseTodo ? (
								<BaseTodoModal
									stackId={stackId}
									todo={todo}
									category={data.category}
									index={index}
									setBaseTodo={setBaseTodo}
									setNewTodo={setNewTodo}
									setEditTodo={setEditTodo}
								/>
							) : null}
							<BaseStackInfoModal
								visible={visible}
								category={data.category}
								length={data.Todo.length}
							/>
						</>
					) : null}
				</TodoBox>
			))}
			{newTodo ? (
				<NewTodoModal
					stackId={stackId}
					category={data.category}
					setNewTodo={setNewTodo}
					setEditStack={setEditStack}
				/>
			) : null}
			{editTodo !== -1 ? (
				<EditTodoModal
					stackId={stackId}
					todo={data.Todo[editTodo]}
					category={data.category}
					setEditTodo={setEditTodo}
					setEditStack={setEditStack}
				/>
			) : null}
			{editStack ? (
				<EditStackModal
					stackId={stackId}
					category={data.category}
					setEditStack={setEditStack}
				/>
			) : null}
		</>
	) : null;
};

export default Stack;
