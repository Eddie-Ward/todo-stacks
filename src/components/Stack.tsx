import { useBounds } from "@react-three/drei";
import React, {
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useState,
} from "react";
import { Stack } from "../../types.d";
import { EventsContext } from "../shared/EventContext";
import { sortStack, todoReducer } from "../shared/todoReducer";
import { todos as initialTodos } from "../utils/todos";
import BaseTodoModal from "./design/modals/BaseTodoModal";
import EditTodoModal from "./design/modals/EditTodoModal";
import NewTodoModal from "./design/modals/NewTodoModal";
import StackFloor from "./StackFloor";
import TodoBox from "./TodoBox";

interface StackProps {
	position: [number, number];
	dimension: [number, number];
	heightScale: number;
	stackId: string;
}

const Stack = ({ position, dimension, heightScale, stackId }: StackProps) => {
	const bounds = useBounds();
	const { setDisableEvents } = useContext(EventsContext);

	const [visible, setVisible] = useState(false);
	const [baseModalOpen, setBaseModalOpen] = useState(false);
	const [editTodo, setEditTodo] = useState(-1);
	const [newTodo, setNewTodo] = useState(false);

	const [stack, dispatch] = useReducer(
		todoReducer,
		sortStack(initialTodos.find((stack) => stack.id === stackId) as Stack)
	);

	useEffect(() => {
		if (baseModalOpen || editTodo !== -1) {
			setDisableEvents(true);
		} else {
			setDisableEvents(false);
		}
		return () => {
			setDisableEvents(false);
			bounds.refresh().clip().fit();
		};
	}, [stack, bounds, editTodo, baseModalOpen, setDisableEvents]);

	const randHue = useMemo(() => {
		return Math.floor(Math.random() * (36 - 0) + 0) * 10;
	}, []);

	const heights = useMemo(() => {
		let curHeight = 0;
		let offsetY = 0;
		const results = [];
		for (let i = 0; i < stack.todos.length; i++) {
			curHeight = stack.todos[i].duration * heightScale;
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
				length={stack.todos.length}
			/>
			{stack.todos.map((todo, index) => (
				<TodoBox
					key={todo.id}
					index={index}
					last={stack.todos.length - 1}
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
					hue={randHue}
					setVisible={setVisible}
					setBaseModal={setBaseModalOpen}
					setEditTodo={setEditTodo}>
					{index === stack.todos.length - 1 && baseModalOpen ? (
						<BaseTodoModal
							id={todo.id}
							index={index}
							title={todo.title}
							body={todo.body}
							duration={todo.duration}
							dispatch={dispatch}
							setEditTodo={setEditTodo}
							setNewTodo={setNewTodo}
						/>
					) : null}
				</TodoBox>
			))}
			{editTodo !== -1 ? (
				<EditTodoModal
					setEditTodo={setEditTodo}
					todo={stack.todos[editTodo]}
				/>
			) : null}
			{newTodo ? <NewTodoModal setNewTodo={setNewTodo} /> : null}
		</>
	);
};

export default Stack;
