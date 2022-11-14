import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const todoRouter = router({
	addNewTodo: publicProcedure
		.input(
			z.object({
				stackId: z.string(),
				priority: z.number().gte(1).lte(3),
				duration: z.number().gte(1).lte(5),
				title: z.string().min(1).max(25),
				body: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const newTodo = await ctx.prisma.todo.create({
				data: {
					...input,
				},
			});
			return newTodo;
		}),
	editTodo: publicProcedure
		.input(
			z.object({
				todoId: z.string(),
				priority: z.number().gte(1).lte(3),
				duration: z.number().gte(1).lte(5),
				title: z.string().min(1).max(25),
				body: z.string(),
			})
		)
		.mutation(
			async ({
				ctx,
				input: { todoId, priority, duration, title, body },
			}) => {
				const editedTodo = await ctx.prisma.todo.update({
					where: { id: todoId },
					data: {
						priority,
						duration,
						title,
						body,
					},
				});
				return editedTodo;
			}
		),
	deleteTodo: publicProcedure
		.input(z.object({ todoId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const deletedTodo = await ctx.prisma.todo.delete({
				where: { id: input.todoId },
			});
			return deletedTodo;
		}),
});
