import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const stackRouter = router({
	getAllStacksByUser: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const user = await ctx.prisma.user.findUnique({
				where: {
					id: input.id,
				},
				include: {
					Stack: {
						orderBy: {
							createdAt: "asc",
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
});
