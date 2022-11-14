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
		async onSuccess() {
			await utils.stack.getStackById.invalidate({ stackId });
		},
		async onError(error) {
			console.error(error);
		},
		async onSettled() {
			setBaseTodo(false);
		},
	});

	const handleDelete = () => {
		mutation.mutate({ todoId: todo.id });
	};
	return (
		<Html
			as="article"
			className="relative w-56 rounded-3xl border-4 border-solid border-th-orange-500 bg-th-blue-200 p-3 text-left sm:w-64 sm:p-4"
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
				className="mb-5 max-h-32 py-1 font-cursive text-lg font-medium text-th-blue-900 sm:max-h-40"
				style={{
					wordBreak: "break-word",
					whiteSpace: "normal",
					overflow: "auto",
				}}>
				{todo.body}
			</p>
			<button
				className={`rounded-lg  py-1 px-4 font-cursive text-2xl text-white  ${
					!mutation.isLoading
						? "bg-th-orange-500 hover:bg-th-orange-700"
						: "bg-gray-300"
				}`}
				onClick={(e) => {
					e.stopPropagation();
					setEditTodo(index);
					setBaseTodo(false);
				}}
				disabled={mutation.isLoading}>
				Edit
			</button>
			<div className="absolute right-0 bottom-0 flex translate-x-4 translate-y-1/3 justify-end gap-0.5 sm:gap-4">
				<button
					className={`btn-icon scale-75 sm:scale-100 ${
						!mutation.isLoading
							? "bg-green-500 hover:bg-green-600"
							: "bg-gray-300"
					}`}
					onClick={(e) => {
						e.stopPropagation();
						setNewTodo(true);
						setBaseTodo(false);
					}}
					disabled={mutation.isLoading}>
					<Add />
				</button>
				<button
					className={`scale-75 rounded-lg sm:scale-100 ${
						!mutation.isLoading
							? "bg-th-orange-500 hover:bg-th-orange-700"
							: "bg-gray-300"
					}`}
					onClick={(e) => {
						e.stopPropagation();
						handleDelete();
					}}
					disabled={mutation.isLoading}>
					<Checkmark />
				</button>
			</div>
		</Html>
	);
};

export default BaseTodoModal;
