import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const userRouter = router({
	createNewUser: publicProcedure.mutation(async ({ ctx }) => {
		const user = await ctx.prisma.user.create({
			data: {},
		});
		return user.id;
	}),
});
