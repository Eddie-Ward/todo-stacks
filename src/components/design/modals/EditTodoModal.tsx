import React, { useMemo } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { Todo } from "@prisma/client";
import { trpc } from "../../../utils/trpc";
import Exit from "../svg/Exit";
import Checkmark from "../svg/Checkmark";
import Delete from "../svg/Delete";

interface EditTodoModalProps {
	stackId: string;
	todo: Todo;
	category: string;
	setEditTodo: React.Dispatch<React.SetStateAction<number>>;
	setEditStack: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTodoModal = ({
	stackId,
	todo,
	category,
	setEditTodo,
	setEditStack,
}: EditTodoModalProps) => {
	const formDefaultValues = useMemo(() => {
		return {
			title: todo?.title || "",
			body: todo?.body || "",
			priority: todo?.priority || 2,
			duration: todo?.duration || 3,
		};
	}, [todo]);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: formDefaultValues,
	});

	const utils = trpc.useContext();
	const editMutation = trpc.todo.editTodo.useMutation({
		async onSuccess() {
			await utils.stack.getStackById.invalidate({ stackId });
			setEditTodo(-1);
		},
		async onError(error) {
			console.error(error);
		},
		async onSettled() {
			setEditTodo(-1);
		},
	});
	const deleteMutation = trpc.todo.deleteTodo.useMutation({
		async onSuccess() {
			await utils.stack.getStackById.invalidate({ stackId });
		},
		async onError(error) {
			console.error(error);
		},
		async onSettled() {
			setEditTodo(-1);
		},
	});

	const editTodo: SubmitHandler<typeof formDefaultValues> = (data) => {
		editMutation.mutate({
			todoId: todo.id,
			title: data.title,
			body: data.body,
			priority: Number(data.priority),
			duration: Number(data.duration),
		});
	};

	const deleteTodo = () => {
		deleteMutation.mutate({ todoId: todo.id });
	};

	return (
		<div className="absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center">
			<div className="relative w-72 rounded-3xl border-4 border-solid border-th-orange-500 bg-th-blue-200 p-4 text-left sm:w-80 sm:p-6">
				<button
					className="btn-icon absolute top-0 right-0 translate-x-1/3 -translate-y-1/3"
					onClick={(e) => {
						e.stopPropagation();
						setEditTodo(-1);
					}}>
					<Exit />
				</button>
				<h1 className="mb-2 font-cursive text-2xl font-bold text-th-blue-900">
					Edit Todo
				</h1>
				<p className="mb-6 font-cursive text-lg font-medium text-th-blue-900">
					{category}
				</p>
				<form
					onSubmit={handleSubmit(editTodo)}
					className="mb-4 flex flex-col gap-6">
					<div className="relative">
						<label
							htmlFor="title"
							className={`absolute top-0 left-0 translate-x-2 -translate-y-4 font-cursive text-xl font-semibold ${
								errors.title
									? "text-red-600"
									: "text-th-orange-700"
							}`}>
							{errors.title?.message || "Title"}
						</label>
						<input
							id="title"
							{...register("title", {
								required: "Please enter a title",
								maxLength: {
									value: 25,
									message: "Please enter a shorter title",
								},
							})}
							className="input-text w-full"
						/>
					</div>
					<div className="relative">
						<label
							htmlFor="body"
							className={`absolute top-0 left-0 translate-x-2 -translate-y-4 font-cursive text-xl font-semibold ${
								errors.body
									? "text-red-600"
									: "text-th-orange-700"
							}`}>
							{errors.body?.message || "Body"}
						</label>
						<textarea
							id="body"
							rows={5}
							{...register("body", {
								maxLength: {
									value: 250,
									message: "Please enter a shorter body",
								},
							})}
							className="input-text w-full"
						/>
					</div>
					<div className="flex justify-between gap-8">
						<div className="relative grow">
							<label
								htmlFor="priority"
								className={`absolute top-0 left-0 translate-x-2 -translate-y-4 font-cursive text-xl font-semibold ${
									errors.priority
										? "text-red-600"
										: "text-th-orange-700"
								}`}>
								{errors.priority?.message || "Priority"}
							</label>
							<select
								id="priority"
								{...register("priority", {
									required: "Required",
								})}
								className="input-select w-full">
								<option label="High" value={1} />
								<option label="Medium" value={2} />
								<option label="Low" value={3} />
							</select>
						</div>
						<div className="relative grow">
							<label
								htmlFor="duration"
								className={`absolute top-0 left-0 translate-x-2 -translate-y-4 font-cursive text-xl font-semibold ${
									errors.duration
										? "text-red-600"
										: "text-th-orange-700"
								}`}>
								{errors.duration?.message || "Duration"}
							</label>
							<select
								id="duration"
								{...register("duration", {
									required: "Required",
								})}
								className="input-select w-full">
								<option label="Fast" value={1} />
								<option label="Short" value={2} />
								<option label="Medium" value={3} />
								<option label="Long" value={4} />
								<option label="Very Long" value={5} />
							</select>
						</div>
					</div>
					<button
						type="button"
						className="w-32 rounded-lg bg-th-orange-500 py-1 px-4 font-cursive text-2xl text-white hover:bg-th-orange-700"
						onClick={(e) => {
							e.stopPropagation();
							setEditStack(true);
							setEditTodo(-1);
						}}
						disabled={
							editMutation.isLoading || deleteMutation.isLoading
						}>
						Edit Stack
					</button>
					<div className="absolute right-0 bottom-0 flex translate-x-4 translate-y-1/3 justify-end gap-4">
						<button
							type="button"
							disabled={
								editMutation.isLoading ||
								deleteMutation.isLoading
							}
							className={`btn-icon ${
								!editMutation.isLoading &&
								!deleteMutation.isLoading
									? "bg-red-500 hover:bg-red-600"
									: "bg-gray-300"
							}`}
							onClick={(e) => {
								e.stopPropagation();
								deleteTodo();
							}}>
							<Delete />
						</button>
						<button
							type="submit"
							disabled={
								!isValid ||
								editMutation.isLoading ||
								deleteMutation.isLoading
							}
							className={`rounded-lg ${
								isValid &&
								!editMutation.isLoading &&
								!deleteMutation.isLoading
									? "bg-th-orange-500 hover:bg-th-orange-700"
									: "bg-gray-300"
							} `}>
							<Checkmark />
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditTodoModal;
