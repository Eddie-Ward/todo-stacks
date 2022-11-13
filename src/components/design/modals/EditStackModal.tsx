import React, { useMemo } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../../../utils/trpc";
import Checkmark from "../svg/Checkmark";
import Delete from "../svg/Delete";
import Exit from "../svg/Exit";
import Descending from "../svg/Descending";
import Ascending from "../svg/Ascending";

interface EditStackModalProps {
	stackId: string;
	category: string;
	priorityAsc: boolean;
	durationAsc: boolean;
	setEditStack: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditStackModal = ({
	stackId,
	category,
	priorityAsc,
	durationAsc,
	setEditStack,
}: EditStackModalProps) => {
	const formDefaultValues = useMemo(() => {
		return {
			category: category ?? "",
			priorityAsc: priorityAsc ? 1 : 0,
			durationAsc: durationAsc ? 1 : 0,
		};
	}, [category, priorityAsc, durationAsc]);

	const {
		register,
		watch,
		setValue,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: formDefaultValues,
	});

	const prioritySort = watch("priorityAsc");
	const durationSort = watch("durationAsc");

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
			priorityAsc: !!data.priorityAsc,
			durationAsc: !!data.durationAsc,
		});
	};

	const deleteStack = () => {
		deleteMutation.mutate({ stackId });
	};

	return (
		<div className="absolute top-0 left-0 z-10 flex  h-screen w-screen items-center justify-center">
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
					<div className="flex justify-between gap-3">
						<div className="flex items-center">
							<span className="mr-1 font-cursive text-xl font-semibold text-th-orange-700">
								Priority:
							</span>
							<button
								type="button"
								className="btn-icon scale-75"
								{...register("priorityAsc", {
									valueAsNumber: true,
								})}
								onClick={(e) => {
									e.stopPropagation();
									setValue(
										"priorityAsc",
										prioritySort === 0 ? 1 : 0,
										{
											shouldDirty: true,
											shouldTouch: true,
										}
									);
								}}>
								{prioritySort ? <Ascending /> : <Descending />}
							</button>
						</div>
						<div className="flex items-center">
							<span className="mr-1 font-cursive text-xl font-semibold text-th-orange-700">
								Duration:
							</span>
							<button
								type="button"
								className="btn-icon scale-75"
								{...register("durationAsc", {
									valueAsNumber: true,
								})}
								onClick={(e) => {
									e.stopPropagation();
									setValue(
										"durationAsc",
										durationSort === 0 ? 1 : 0,
										{
											shouldDirty: true,
											shouldTouch: true,
										}
									);
								}}>
								{durationSort ? <Ascending /> : <Descending />}
							</button>
						</div>
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
							className={`rounded-lg ${
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
	);
};

export default EditStackModal;
