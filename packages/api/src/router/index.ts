import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { propertyRouter } from "./property";
import { listRouter } from "./list";
import { userRouter } from "./user";
import { webhookRouter } from "./webhook";
export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  property: propertyRouter,
  list: listRouter,
  user: userRouter,
  webhook: webhookRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
