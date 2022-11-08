import type { Todo, Stack } from "../../types";

export type TodoActionType =
	| { type: "add_todo"; payload: Todo }
	| { type: "remove_todo"; payload: string };

export const sortStack = (stack: Stack) => {
	const res = { ...stack };
	res.todos.sort((a, b) => {
		if (a.priority === b.priority) {
			return b.order - a.order;
		}
		return b.priority - a.priority;
	});
	return res;
};

export const todoReducer: React.Reducer<Stack, TodoActionType> = (
	state,
	action
) => {
	switch (action.type) {
		case "add_todo":
			const moreTodos = [...state.todos];
			moreTodos.push(action.payload);
			moreTodos.sort((a, b) => {
				if (a.priority === b.priority) {
					return b.order - a.order;
				}
				return b.priority - a.priority;
			});
			return {
				...state,
				todos: moreTodos,
			};
		case "remove_todo":
			const lessTodos = state.todos.filter(
				(todo) => todo.id !== action.payload
			);
			lessTodos.sort((a, b) => {
				if (a.priority === b.priority) {
					return b.order - a.order;
				}
				return b.priority - a.priority;
			});
			return {
				...state,
				todos: lessTodos,
			};
		default:
			return state;
	}
};
