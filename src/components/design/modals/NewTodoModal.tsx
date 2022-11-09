import { Html } from "@react-three/drei";
import React, { useMemo } from "react";
import { Priority, Duration, type Todo } from "../../../../types.d";
import Exit from "../svg/Exit";
import { useForm } from "react-hook-form";
import Checkmark from "../svg/Checkmark";
import Delete from "../svg/Delete";

interface NewTodoModalProps {
	setNewTodo: React.Dispatch<React.SetStateAction<boolean>>;
}

const newFormDefaultValues = {
	priority: Priority,
	duration: Duration,
	title: "",
	body: "",
};

const NewTodoModal = ({ setNewTodo }: NewTodoModalProps) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: newFormDefaultValues,
	});

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
					<h1 className="mb-6 font-cursive text-2xl font-bold text-th-blue-900">
						New Todo
					</h1>
					<form action="" className="mb-8 flex flex-col gap-6">
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
									htmlFor="priority"
									className={`absolute top-0 left-0 translate-x-2 -translate-y-4 font-cursive text-xl font-semibold ${
										errors.duration
											? "text-red-600"
											: "text-th-orange-700"
									}`}>
									{errors.duration?.message || "Duration"}
								</label>
								<select
									id="priority"
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
						<div className="absolute right-0 bottom-0 flex translate-x-4 translate-y-1/3 justify-end gap-4">
							<button className="btn-icon bg-red-500 hover:bg-red-600">
								<Delete />
							</button>
							<button
								type="submit"
								disabled={!isValid}
								className={` rounded-lg ${
									isValid
										? "bg-th-orange-500 hover:bg-th-orange-700"
										: "bg-gray-300"
								} `}>
								<Checkmark />
							</button>
						</div>
					</form>
				</div>
			</div>
		</Html>
	);
};

export default NewTodoModal;
