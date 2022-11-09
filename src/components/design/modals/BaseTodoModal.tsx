import { Html } from "@react-three/drei";
import React from "react";
import type { Duration } from "../../../../types";
import { type TodoActionType } from "../../../shared/todoReducer";
import Checkmark from "../svg/Checkmark";

interface BaseTodoProps {
	id: string;
	title: string;
	body: string;
	duration: Duration;
	dispatch: React.Dispatch<TodoActionType>;
}

const BaseTodoModal = ({
	id,
	title,
	body,
	duration,
	dispatch,
}: BaseTodoProps) => {
	return (
		<Html
			as="div"
			className="w-64 rounded-3xl border-4 border-solid border-t-light-orange bg-t-light-blue p-4 text-left"
			style={{ translate: "-50% -100%" }}
			position={[0, duration * 0.125 + 0.25, 0]}>
			<h1 className="mb-4 font-cursive text-2xl font-bold text-t-dark-blue">
				{title}
			</h1>
			<p className="mb-4 font-cursive text-base font-medium text-t-dark-blue">
				{body}
			</p>
			<button className="rounded-lg bg-t-light-orange py-1 px-4 font-cursive text-2xl text-white hover:bg-t-dark-orange">
				Edit
			</button>
			<button
				className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 rounded-lg bg-t-light-orange hover:bg-t-dark-orange"
				onClick={() => dispatch({ type: "remove_todo", payload: id })}>
				<Checkmark />
			</button>
		</Html>
	);
};

export default BaseTodoModal;
