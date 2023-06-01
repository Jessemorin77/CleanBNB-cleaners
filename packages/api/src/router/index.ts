import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { propertyRouter } from "./property";
import { listRouter } from "./list";
import { userRouter } from "./user";
import { bidRouter } from "./bid";
import { profileRouter } from "./profile";
import { chatRouter } from "./chat";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  property: propertyRouter,
  list: listRouter,
  user: userRouter,
  bid: bidRouter,
  profile: profileRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
