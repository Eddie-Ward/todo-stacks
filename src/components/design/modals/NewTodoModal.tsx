import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../../../utils/trpc";
import Exit from "../svg/Exit";
import Checkmark from "../svg/Checkmark";

interface NewTodoModalProps {
	stackId: string;
	category: string;
	setNewTodo: React.Dispatch<React.SetStateAction<boolean>>;
	setEditStack: React.Dispatch<React.SetStateAction<boolean>>;
}

const newFormDefaultValues = {
	title: "",
	body: "",
	priority: 2,
	duration: 3,
};

const NewTodoModal = ({
	stackId,
	category,
	setNewTodo,
	setEditStack,
}: NewTodoModalProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: newFormDefaultValues,
	});

	const utils = trpc.useContext();
	const addMutation = trpc.todo.addNewTodo.useMutation({
		async onSuccess() {
			await utils.stack.getStackById.invalidate({ stackId });
		},
		async onError(error) {
			console.error(error);
		},
		async onSettled() {
			setNewTodo(false);
		},
	});
	const createNewTodo: SubmitHandler<typeof newFormDefaultValues> = (
		data
	) => {
		addMutation.mutate({
			stackId: stackId,
			title: data.title,
			body: data.body,
			priority: Number(data.priority),
			duration: Number(data.duration),
		});
	};

	return (
		<div className="absolute top-0 left-0 z-10 flex h-screen  w-screen items-center justify-center">
			<article className="relative w-72 rounded-3xl border-4 border-solid border-th-orange-500 bg-th-blue-200 p-4 text-left sm:w-80 sm:p-6">
				<button
					className="btn-icon absolute top-0 right-0 translate-x-1/3 -translate-y-1/3"
					onClick={(e) => {
						e.stopPropagation();
						setNewTodo(false);
					}}>
					<Exit />
				</button>
				<h1 className="mb-2 font-cursive text-2xl font-bold text-th-blue-900">
					New Todo
				</h1>
				<p className="mb-6 font-cursive text-lg font-medium text-th-blue-900">
					{category}
				</p>
				<form
					onSubmit={handleSubmit(createNewTodo)}
					className="mb-8 flex flex-col gap-6">
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
						disabled={addMutation.isLoading}
						className={`w-32 rounded-lg py-1 px-4 font-cursive text-2xl text-white ${
							!addMutation.isLoading
								? "bg-th-orange-500 hover:bg-th-orange-700"
								: "bg-gray-300"
						}`}
						onClick={(e) => {
							e.stopPropagation();
							setEditStack(true);
							setNewTodo(false);
						}}>
						Edit Stack
					</button>
					<button
						type="submit"
						disabled={!isValid || addMutation.isLoading}
						className={`absolute right-0 bottom-0 translate-y-1/3 translate-x-4 rounded-lg ${
							isValid && !addMutation.isLoading
								? "bg-th-orange-500 hover:bg-th-orange-700"
								: "bg-gray-300"
						} `}>
						<Checkmark />
					</button>
				</form>
			</article>
		</div>
	);
};

export default NewTodoModal;
