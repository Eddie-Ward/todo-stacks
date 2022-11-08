import { Edges, Plane, useBounds } from "@react-three/drei";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { ClassRegistry } from "superjson/dist/class-registry";
import { Stack } from "../../types.d";
import { sortStack, todoReducer } from "../shared/todoReducer";
import { todos as initialTodos } from "../utils/todos";
import BaseTodoModal from "./design/modals/BaseTodo";
import TodoBox from "./TodoBox";

interface StackProps {
	position: [number, number];
	dimension: [number, number];
	heightScale: number;
	stackId: string;
}

const Stack = ({ position, dimension, heightScale, stackId }: StackProps) => {
	const bounds = useBounds();

	const [visible, setVisible] = useState(false);
	const [stack, dispatch] = useReducer(
		todoReducer,
		sortStack(initialTodos.find((stack) => stack.id === stackId) as Stack)
	);

	console.log(stack);
	console.log(heightScale);

	useEffect(() => {
		return () => {
			bounds.refresh().clip().fit();
		};
	}, [stack, bounds]);

	const randHue = useMemo(() => {
		return Math.floor(Math.random() * (36 - 0) + 0) * 10;
	}, []);

	const heights = useMemo(() => {
		let curHeight = 0;
		let offsetY = 0;
		const results = [];
		for (let i = 0; i < stack.todos.length; i++) {
			console.log(stack.todos[i].duration);
			curHeight = stack.todos[i].duration * heightScale;
			results.push(offsetY + curHeight / 2);
			offsetY += curHeight;
		}
		return results;
	}, [stack, heightScale]);

	console.log(heights);

	return (
		<>
			<Plane
				position={[position[0], 0.01, position[1]]}
				args={dimension}
				scale={1.5}
				rotation={[-Math.PI / 2, 0, 0]}
				visible={stack.todos.length > 0 ? visible : true}>
				<meshBasicMaterial
					transparent={true}
					color="#FB8500"
					opacity={0.5}
				/>
				<Edges color="#FB8500" />
			</Plane>
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
					dispatch={dispatch}
					setVisible={setVisible}
				/>
			))}
		</>
	);
};

export default Stack;
