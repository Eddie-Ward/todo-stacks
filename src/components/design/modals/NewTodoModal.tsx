import React from "react";
import { Html } from "@react-three/drei";
import { type SubmitHandler, useForm } from "react-hook-form";
import Exit from "../svg/Exit";
import Checkmark from "../svg/Checkmark";
import { trpc } from "../../../utils/trpc";

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
	const mutation = trpc.todo.addNewTodo.useMutation({
		async onSuccess(data) {
			console.log(data);
			await utils.stack.getStackById.invalidate({ stackId });
			setNewTodo(false);
		},
	});
	const createNewTodo: SubmitHandler<typeof newFormDefaultValues> = (
		data
	) => {
		mutation.mutate({
			stackId: stackId,
			title: data.title,
			body: data.body,
			priority: Number(data.priority),
			duration: Number(data.duration),
		});
	};

	return (
		<Html
			calculatePosition={(el, camera) => {
				return [
					camera.position.x,
					camera.position.y,
					camera.position.z,
				];
			}}>
			<div className="flex h-screen w-screen  items-center justify-center">
				<div className="relative rounded-3xl border-4 border-solid border-th-orange-500 bg-th-blue-200 p-6 text-left">
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
								cols={20}
								{...register("body", {
									maxLength: {
										value: 250,
										message: "Please enter a shorter body",
									},
								})}
								className="input-text"
							/>
						</div>
						<div className="flex justify-between">
							<div className="relative">
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
									className="input-select">
									<option label="High" value={1} />
									<option label="Medium" value={2} />
									<option label="Low" value={3} />
								</select>
							</div>
							<div className="relative">
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
									className="input-select">
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
								setNewTodo(false);
							}}>
							Edit Stack
						</button>
						<button
							type="submit"
							disabled={!isValid}
							className={`absolute right-0 bottom-0 translate-y-1/3 translate-x-4 rounded-lg ${
								isValid
									? "bg-th-orange-500 hover:bg-th-orange-700"
									: "bg-gray-300"
							} `}>
							<Checkmark />
						</button>
					</form>
				</div>
			</div>
		</Html>
	);
};

export default NewTodoModal;
