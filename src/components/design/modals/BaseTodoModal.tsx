import { Html } from "@react-three/drei";
import React from "react";
import type { Duration } from "../../../../types";
import { type TodoActionType } from "../../../shared/todoReducer";
import Add from "../svg/Add";
import Checkmark from "../svg/Checkmark";

interface BaseTodoProps {
	id: string;
	index: number;
	title: string;
	body: string;
	duration: Duration;
	dispatch: React.Dispatch<TodoActionType>;
	setEditTodo: React.Dispatch<React.SetStateAction<number>>;
	setNewTodo: React.Dispatch<React.SetStateAction<boolean>>;
}

const BaseTodoModal = ({
	id,
	index,
	title,
	body,
	duration,
	dispatch,
	setEditTodo,
	setNewTodo,
}: BaseTodoProps) => {
	return (
		<Html
			as="div"
			className="w-64 rounded-3xl border-4 border-solid border-th-orange-500 bg-th-blue-200 p-4 text-left"
			style={{ translate: "-50% -100%" }}
			position={[0, duration * 0.125 + 0.25, 0]}>
			<h1 className="mb-4 font-cursive text-2xl font-bold text-th-blue-900">
				{title}
			</h1>
			<p className="mb-4 font-cursive text-base font-medium text-th-blue-900">
				{body}
			</p>
			<button
				className="rounded-lg bg-th-orange-500 py-1 px-4 font-cursive text-2xl text-white hover:bg-th-orange-700"
				onClick={() => setEditTodo(index)}>
				Edit
			</button>
			<div className="absolute right-0 bottom-0 flex translate-x-4 translate-y-1/3 justify-end gap-4">
				<button
					className="btn-icon bg-green-500 hover:bg-green-600"
					onClick={() => setNewTodo(true)}>
					<Add />
				</button>
				<button
					className="rounded-lg bg-th-orange-500 hover:bg-th-orange-700"
					onClick={() =>
						dispatch({ type: "remove_todo", payload: id })
					}>
					<Checkmark />
				</button>
			</div>
		</Html>
	);
};

export default BaseTodoModal;
