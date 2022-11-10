import { Html, useBounds } from "@react-three/drei";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { EventsContext } from "../shared/EventContext";
import { trpc } from "../utils/trpc";
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
	stackId: string;
}

const Stack = ({ position, dimension, heightScale, stackId }: StackProps) => {
	const { data } = trpc.stack.getStackById.useQuery(
		{ stackId },
		{ refetchOnWindowFocus: false }
	);

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
	}, [bounds, setDisableEvents, baseModalOpen, newTodo, editTodo]);

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
				visible={visible || baseModalOpen || editTodo !== -1}
				length={data.Todo.length}>
				{data.Todo.length === 0 ? (
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
					setBaseModal={setBaseModalOpen}
					setEditTodo={setEditTodo}>
					{index === data.Todo.length - 1 && baseModalOpen ? (
						<BaseTodoModal
							stackId={stackId}
							todo={todo}
							category={data.category}
							index={index}
							setEditTodo={setEditTodo}
							setNewTodo={setNewTodo}
						/>
					) : null}
				</TodoBox>
			))}
			{editTodo !== -1 ? (
				<EditTodoModal
					stackId={stackId}
					todo={data.Todo[editTodo]}
					category={data.category}
					setEditTodo={setEditTodo}
				/>
			) : null}
			{newTodo ? (
				<NewTodoModal
					stackId={stackId}
					category={data.category}
					setNewTodo={setNewTodo}
				/>
			) : null}
		</>
	) : null;
};

export default Stack;
