export const createTutorialStack = (userId: string) => ({
	userId,
	category: "Tutorial",
	hue: 25,
	priorityAsc: false,
	durationAsc: false,
});

export const createTutorialTodos = (stackId: string) => [
	{
		stackId,
		priority: 1,
		duration: 2,
		title: "Welcome to TodoStacks!",
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
		duration: 2,
		title: "Rules of the app",
		body: "The app is designed so that you can only see and check off the topmost todo. You can still edit todos lower in the stack.",
	},
	{
		stackId,
		priority: 2,
		duration: 3,
		title: "Sorting a stack",
		body: " You can edit the stack's category name or to sort by priority and by duration of the todo. These correspond to the block's color and height.",
	},
	{
		stackId,
		priority: 3,
		duration: 2,
		title: "Creating new stacks",
		body: "You can also create new stacks as well as delete old ones. Be careful, this is irreversible!",
	},
	{
		stackId,
		priority: 3,
		duration: 3,
		title: "Local storage",
		body: "Your unique user ID is stored in the browser's local storage. A new one is generated when the storage is empty.",
	},
];
