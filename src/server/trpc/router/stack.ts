import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const stackRouter = router({
	getAllStackIdsByUser: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const user = await ctx.prisma.user.findUnique({
				where: {
					id: input.id,
				},
				include: {
					Stack: {
						select: {
							id: true,
						},
						orderBy: {
							createdAt: "asc",
						},
					},
				},
			});
			if (!user) {
				throw new TRPCError({
					message: "User not found",
					code: "NOT_FOUND",
				});
			}
			return user;
		}),
	getStackById: publicProcedure
		.input(z.object({ stackId: z.string() }))
		.query(async ({ ctx, input }) => {
			const stack = await ctx.prisma.stack.findUnique({
				where: {
					id: input.stackId,
				},
				include: {
					Todo: true,
				},
			});
			if (!stack) {
				throw new TRPCError({
					message: "Stack not found",
					code: "NOT_FOUND",
				});
			}
			const sortStack = { ...stack };
			sortStack.Todo.sort((a, b) => {
				if (a.priority === b.priority) {
					if (a.duration === b.duration) {
						return a.updatedAt.getTime() - b.updatedAt.getTime();
					}
					return sortStack.durationAsc
						? a.duration - b.duration
						: b.duration - a.duration;
				}
				return sortStack.priorityAsc
					? a.priority - b.priority
					: b.priority - a.priority;
			});
			return sortStack;
		}),
	addNewStack: publicProcedure
		.input(
			z.object({
				userId: z.string(),
				category: z.string().min(1).max(20),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const hue = Math.floor(Math.random() * (36 - 0) + 0) * 10;
			const newStack = await ctx.prisma.stack.create({
				data: {
					...input,
					hue,
				},
			});
			return newStack;
		}),
	editStack: publicProcedure
		.input(
			z.object({
				stackId: z.string(),
				category: z.string().min(1).max(20),
				priorityAsc: z.boolean(),
				durationAsc: z.boolean(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const editedStack = await ctx.prisma.stack.update({
				where: {
					id: input.stackId,
				},
				data: {
					category: input.category,
					priorityAsc: input.priorityAsc,
					durationAsc: input.durationAsc,
				},
			});
			return editedStack;
		}),
	deleteStack: publicProcedure
		.input(
			z.object({
				stackId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const deletedStack = await ctx.prisma.stack.delete({
				where: {
					id: input.stackId,
				},
			});
			return deletedStack;
		}),
});
