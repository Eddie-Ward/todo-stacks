import { router } from "../trpc";
import { stackRouter } from "./stack";
import { todoRouter } from "./todo";
import { userRouter } from "./user";

export const appRouter = router({
	user: userRouter,
	stack: stackRouter,
	todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
