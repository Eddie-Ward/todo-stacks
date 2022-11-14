import React, { useContext } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { UserContext } from "../../../shared/UserContext";
import { trpc } from "../../../utils/trpc";
import Checkmark from "../svg/Checkmark";
import Exit from "../svg/Exit";

interface NewStackModalProps {
	setNewStack: React.Dispatch<React.SetStateAction<boolean>>;
}

const formDefaultValues = { category: "" };

const NewStackModal = ({ setNewStack }: NewStackModalProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: formDefaultValues,
	});

	const userId = useContext(UserContext);
	console.log(userId);
	const utils = trpc.useContext();
	const newMutation = trpc.stack.addNewStack.useMutation({
		async onSuccess(data) {
			console.log(data);
			await utils.stack.getAllStackIdsByUser.invalidate();
			setNewStack(false);
		},
	});

	const newStack: SubmitHandler<typeof formDefaultValues> = (data) => {
		console.log(userId);
		newMutation.mutate({
			userId,
			category: data.category,
		});
	};

	return (
		<div className="absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center">
			<div className="relative rounded-3xl border-4 border-solid border-th-orange-500 bg-th-blue-200 p-6 text-left">
				<button
					className="btn-icon absolute top-0 right-0 translate-x-1/3 -translate-y-1/3"
					onClick={(e) => {
						e.stopPropagation();
						setNewStack(false);
					}}>
					<Exit />
				</button>
				<h1 className="mb-6 font-cursive text-2xl font-bold text-th-blue-900">
					New Stack
				</h1>
				<form
					onSubmit={handleSubmit(newStack)}
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
	);
};

export default NewStackModal;
