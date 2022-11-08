import type { Stack } from "../../types";

export type StackActionType =
	| { type: "add_stack"; payload: Stack }
	| { type: "remove_stack"; payload: string };

export const stackReducer: React.Reducer<string[], StackActionType> = (
	state,
	action
) => {
	switch (action.type) {
		case "add_stack":
			return [...state, action.payload.id];
		case "remove_stack":
			return state.filter((id) => id !== action.payload);
		default:
			return state;
	}
};
