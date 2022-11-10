export enum Priority {
	High = 1,
	Medium,
	Low,
}

export enum Duration {
	Fast = 1,
	Short,
	Medium,
	Long,
	VeryLong,
}

export interface Stack {
	id: string;
	category: string;
	description: string;
	hue: number;
	todos: Todo[];
}

export interface Todo {
	id: string;
	stackId: string;
	priority: Priority;
	duration: Duration;
	title: string;
	body: string;
}
