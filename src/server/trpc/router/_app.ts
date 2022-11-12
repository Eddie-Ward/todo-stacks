import { router } from "../trpc";
import { stackRouter } from "./stack";
import { todoRouter } from "./todo";

export const appRouter = router({
	stack: stackRouter,
	todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
