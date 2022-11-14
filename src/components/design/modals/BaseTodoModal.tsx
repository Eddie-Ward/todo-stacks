import React from "react";
import { Html } from "@react-three/drei";
import type { Todo } from "@prisma/client";
import { trpc } from "../../../utils/trpc";
import Add from "../svg/Add";
import Checkmark from "../svg/Checkmark";

interface BaseTodoProps {
	stackId: string;
	todo: Todo;
	category: string;
	index: number;
	setBaseTodo: React.Dispatch<React.SetStateAction<boolean>>;
	setEditTodo: React.Dispatch<React.SetStateAction<number>>;
	setNewTodo: React.Dispatch<React.SetStateAction<boolean>>;
}

const BaseTodoModal = ({
	stackId,
	todo,
	category,
	index,
	setBaseTodo,
	setNewTodo,
	setEditTodo,
}: BaseTodoProps) => {
	const utils = trpc.useContext();
	const mutation = trpc.todo.deleteTodo.useMutation({
		async onSuccess(data) {
			console.log(data);
			await utils.stack.getStackById.invalidate({ stackId });
		},
	});

	const handleDelete = () => {
		mutation.mutate({ todoId: todo.id });
	};
	return (
		<Html
			as="div"
			className="relative w-56 rounded-3xl border-4 border-solid border-th-orange-500 bg-th-blue-200 p-4 text-left sm:w-64"
			style={{ translate: "-50% -100%" }}
			position={[0, todo.duration * 0.125 + 0.25, 0]}>
			<header>
				<h1 className="mb-2 font-cursive text-2xl font-bold text-th-blue-900">
					{todo.title}
				</h1>
				<p className="mb-3 font-cursive text-lg font-semibold text-th-orange-700">
					{category}
				</p>
			</header>
			<p
				className="mb-5 max-h-40 py-1 font-cursive text-lg font-medium text-th-blue-900"
				style={{
					wordBreak: "break-word",
					whiteSpace: "normal",
					overflow: "auto",
				}}>
				{todo.body}
			</p>
			<button
				className="rounded-lg bg-th-orange-500 py-1 px-4 font-cursive text-2xl text-white hover:bg-th-orange-700"
				onClick={(e) => {
					e.stopPropagation();
					setEditTodo(index);
					setBaseTodo(false);
				}}>
				Edit
			</button>
			<div className="absolute right-0 bottom-0 flex translate-x-4 translate-y-1/3 justify-end gap-0.5 sm:gap-4">
				<button
					className="btn-icon scale-75 bg-green-500 hover:bg-green-600 sm:scale-100"
					onClick={(e) => {
						e.stopPropagation();
						setNewTodo(true);
						setBaseTodo(false);
					}}>
					<Add />
				</button>
				<button
					className="scale-75 rounded-lg bg-th-orange-500 hover:bg-th-orange-700 sm:scale-100"
					onClick={(e) => {
						e.stopPropagation();
						setBaseTodo(false);
						handleDelete();
					}}>
					<Checkmark />
				</button>
			</div>
		</Html>
	);
};

export default BaseTodoModal;
