import { router } from "../trpc";
import { exampleRouter } from "./example";
import { stackRouter } from "./stack";
import { todoRouter } from "./todo";

export const appRouter = router({
	example: exampleRouter,
	stack: stackRouter,
	todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
