import { Duration, Priority, type Stack } from "../../types.d";

export const stacks: string[] = ["chores_stack", "dev_stack"];

export const todos: Stack[] = [
	{
		id: "chores_stack",
		category: "Chores",
		description: "The daily tasks",
		hue: 30,
		todos: [
			{
				id: "0",
				stackId: "chores_stack",
				priority: Priority.High,
				duration: Duration.Medium,
				title: "Groceries",
				body: "Buy vegetables, meat, and fruit for the week",
			},
			{
				id: "1",
				stackId: "chores_stack",
				priority: Priority.Medium,
				duration: Duration.Long,
				title: "Laundry",
				body: "Set time for doing laundry for the week",
			},
			{
				id: "2",
				stackId: "chores_stack",
				priority: Priority.Low,
				duration: Duration.Medium,
				title: "Clean bathroom",
				body: "Set time for doing laundry for the week",
			},
			{
				id: "3",
				stackId: "chores_stack",
				priority: Priority.Low,
				duration: Duration.Long,
				title: "Mow the lawn",
				body: "Frontyard, backyard, and mind the newly planted flowers",
			},
			{
				id: "4",
				stackId: "chores_stack",
				priority: Priority.High,
				duration: Duration.Fast,
				title: "Pay rent",
				body: "Avoid the late fee!",
			},
		],
	},
	{
		id: "dev_stack",
		category: "Stack App",
		description: "Features for stacks app",
		hue: 50,
		todos: [
			{
				id: "5",
				stackId: "dev_stack",
				priority: Priority.High,
				duration: Duration.Long,
				title: "3D Model of stacks",
				body: "Implement working mockup of stacks in three.js",
			},
			{
				id: "6",
				stackId: "dev_stack",
				priority: Priority.High,
				duration: Duration.Medium,
				title: "Modal Popups",
				body: "Figure out HTML component from Drei to mark todos",
			},
			{
				id: "7",
				stackId: "dev_stack",
				priority: Priority.Medium,
				duration: Duration.VeryLong,
				title: "Set up database",
				body: "Create prisma schema and figure out tRPC routes",
			},
			{
				id: "8",
				stackId: "dev_stack",
				priority: Priority.Low,
				duration: Duration.VeryLong,
				title: "App styling",
				body: "Use Tailwind and three.js shader to make app look nicer",
			},
			{
				id: "9",
				stackId: "dev_stack",
				priority: Priority.Low,
				duration: Duration.Long,
				title: "Add auth",
				body: "Allow users to enter a code to keep their todo-list",
			},
		],
	},
];
