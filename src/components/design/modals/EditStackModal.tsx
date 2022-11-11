import React, { useMemo } from "react";
import { Html } from "@react-three/drei";
import { type SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../../../utils/trpc";
import Checkmark from "../svg/Checkmark";
import Delete from "../svg/Delete";
import Exit from "../svg/Exit";

interface EditStackModalProps {
	stackId: string;
	category: string;
	setEditStack: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditStackModal = ({
	stackId,
	category,
	setEditStack,
}: EditStackModalProps) => {
	const formDefaultValues = useMemo(() => {
		return {
			category: category ?? "",
		};
	}, [category]);

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
	const editMutation = trpc.stack.editStack.useMutation({
		async onSuccess(data) {
			console.log(data);
			await utils.stack.getStackById.invalidate({ stackId });
			setEditStack(false);
		},
	});
	const deleteMutation = trpc.stack.deleteStack.useMutation({
		async onSuccess(data) {
			console.log(data);
			await utils.stack.getAllStackIdsByUser.invalidate();
			setEditStack(false);
		},
	});

	const editTodo: SubmitHandler<typeof formDefaultValues> = (data) => {
		editMutation.mutate({
			stackId,
			category: data.category,
		});
	};

	const deleteStack = () => {
		deleteMutation.mutate({ stackId });
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
			<div className="flex h-screen  w-screen items-center justify-center">
				<div className="relative rounded-3xl border-4 border-solid border-th-orange-500 bg-th-blue-200 p-6 text-left">
					<button
						className="btn-icon absolute top-0 right-0 translate-x-1/3 -translate-y-1/3"
						onClick={(e) => {
							e.stopPropagation();
							setEditStack(false);
						}}>
						<Exit />
					</button>
					<h1 className="mb-6 font-cursive text-2xl font-bold text-th-blue-900">
						Edit Stack
					</h1>
					<form
						onSubmit={handleSubmit(editTodo)}
						className="mb-8 flex flex-col gap-6">
						<div className="relative">
							<label
								htmlFor="title"
								className={`absolute top-0 left-0 translate-x-2 -translate-y-4 font-cursive text-xl font-semibold ${
									errors.category
										? "text-red-600"
										: "text-th-orange-700"
								}`}>
								{errors.category?.message || "Category"}
							</label>
							<input
								id="category"
								{...register("category", {
									required: "Please enter a name",
									minLength: {
										value: 1,
										message: "Please enter a name",
									},
									maxLength: {
										value: 25,
										message: "Please enter a shorter name",
									},
								})}
								className="input-text w-full"
							/>
						</div>
						<div className="absolute right-0 bottom-0 flex translate-x-4 translate-y-1/3 justify-end gap-4">
							<button
								type="button"
								className="btn-icon bg-red-500 hover:bg-red-600"
								onClick={(e) => {
									e.stopPropagation();
									deleteStack();
								}}>
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

export default EditStackModal;
