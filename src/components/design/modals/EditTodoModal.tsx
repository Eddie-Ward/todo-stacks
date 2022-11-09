import { Html } from "@react-three/drei";
import React from "react";
import type { Todo } from "../../../../types";
import Exit from "../svg/Exit";

interface EditTodoModalProps {
	setEditTodo: React.Dispatch<React.SetStateAction<number>>;
	todo: Todo;
}

const EditTodoModal = ({ setEditTodo, todo }: EditTodoModalProps) => {
	return (
		<Html
			calculatePosition={(el, camera) => {
				return [
					camera.position.x,
					camera.position.y,
					camera.position.z,
				];
			}}>
			<div className="bg-gray flex h-screen w-screen  items-center justify-center bg-black bg-opacity-5">
				<div className="relative rounded-3xl border-4 border-solid border-t-light-orange bg-t-light-blue p-8 text-left">
					<button
						className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 rounded-lg bg-t-light-orange hover:bg-t-dark-orange"
						onClick={(e) => {
							e.stopPropagation();
							setEditTodo(-1);
						}}>
						<Exit />
					</button>
					<h1 className="mb-4 font-cursive text-2xl font-bold text-t-dark-blue">
						Edit Todo
					</h1>
					<p className="font-cursive text-base font-medium text-t-dark-blue">
						{todo.title}
					</p>
				</div>
			</div>
		</Html>
	);
};

export default EditTodoModal;
