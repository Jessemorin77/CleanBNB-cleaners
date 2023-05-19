import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { propertyRouter } from "./property";
import { listRouter } from "./list.ts";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  property: propertyRouter,
  list: listRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
