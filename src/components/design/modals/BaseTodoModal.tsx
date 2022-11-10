import type { Todo } from "@prisma/client";
import { Html } from "@react-three/drei";
import React from "react";
import { trpc } from "../../../utils/trpc";
import Add from "../svg/Add";
import Checkmark from "../svg/Checkmark";

interface BaseTodoProps {
	todo: Todo;
	index: number;
	setEditTodo: React.Dispatch<React.SetStateAction<number>>;
	setNewTodo: React.Dispatch<React.SetStateAction<boolean>>;
}

const BaseTodoModal = ({
	todo,
	index,
	setEditTodo,
	setNewTodo,
}: BaseTodoProps) => {
	const utils = trpc.useContext();
	const mutation = trpc.todo.deleteTodoById.useMutation({
		async onSuccess(data) {
			console.log(data);
			await utils.stack.getAllStacksByUser.invalidate();
		},
	});

	const handleDelete = () => {
		mutation.mutate({ id: todo.id });
	};

	return (
		<Html
			as="div"
			className="w-64 rounded-3xl border-4 border-solid border-th-orange-500 bg-th-blue-200 p-4 text-left"
			style={{ translate: "-50% -100%" }}
			position={[0, todo.duration * 0.125 + 0.25, 0]}>
			<h1 className="mb-4 font-cursive text-2xl font-bold text-th-blue-900">
				{todo.title}
			</h1>
			<p className="mb-4 font-cursive text-base font-medium text-th-blue-900">
				{todo.body}
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
					onClick={handleDelete}>
					<Checkmark />
				</button>
			</div>
		</Html>
	);
};

export default BaseTodoModal;
