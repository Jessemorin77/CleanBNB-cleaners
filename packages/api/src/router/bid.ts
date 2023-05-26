import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const bidRouter = router({
    create: protectedProcedure
      .input(
          z.object({
            listingId: z.string(),
          })
      )
      .mutation(({ ctx, input }) => {
        return ctx.prisma.bid.create({
          data: {
            listingId: input.listingId,
            userId: ctx.auth.userId,
          },
        });
      }),
  });
  