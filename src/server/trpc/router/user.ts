import { z } from "zod";

import { router, publicProcedure } from "../trpc";

import { createTutorialStack, createTutorialTodos } from "../../db/seed";

export const userRouter = router({
	createNewUser: publicProcedure
		.input(z.object({}))
		.mutation(async ({ ctx }) => {
			const user = await ctx.prisma.user.create({
				data: {},
			});
			const tutorialStack = createTutorialStack(user.id);
			const stack = await ctx.prisma.stack.create({
				data: tutorialStack,
			});
			const tutorialTodos = createTutorialTodos(stack.id);
			await ctx.prisma.todo.createMany({
				data: tutorialTodos,
			});
			return { userId: user.id };
		}),
});
