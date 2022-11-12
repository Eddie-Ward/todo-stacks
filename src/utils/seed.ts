export const createTutorialStack = (userId: string) => ({
	userId,
	category: "Tutorial",
	hue: 25,
});

export const createTutorialTodos = (stackId: string) => [
	{
		stackId,
		priority: 1,
		duration: 2,
		title: "Welcome to the TodoStacks!",
		body: "This stack is meant to guide you through using the app. Click the checkmark to mark this as complete, then click the next block.",
	},
	{
		stackId,
		priority: 1,
		duration: 3,
		title: "Checking off a todo",
		body: "Congrats, you just cleared your first todo! You can also click the Edit button to edit or delete a todo or edit the stack's name. Click the checkmark to move on to the next block.",
	},
	{
		stackId,
		priority: 2,
		duration: 4,
		title: "Sorting a stack",
		body: "The app is designed so that you can only see and check off the topmost todo. You can still edit todos lower in the stack. You can edit the stack to sort by priority and duration of the todo. These correspond to the block's color and height.",
	},
];
