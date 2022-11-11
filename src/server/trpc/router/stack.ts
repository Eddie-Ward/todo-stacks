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
					Todo: {
						orderBy: [
							{ priority: "desc" },
							{ duration: "desc" },
							{ updatedAt: "desc" },
						],
					},
				},
			});
			if (!stack) {
				throw new TRPCError({
					message: "Stack not found",
					code: "NOT_FOUND",
				});
			}
			return stack;
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
			})
		)
		.mutation(async ({ ctx, input }) => {
			const editedStack = await ctx.prisma.stack.update({
				where: {
					id: input.stackId,
				},
				data: {
					category: input.category,
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
