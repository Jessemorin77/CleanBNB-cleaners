import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const bidRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.bid.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.bid.findFirst({ where: { id: input } });
  }),
  get: publicProcedure
    .input(z.object({ bidId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.bid.findUnique({
        where: {
          id: input.bidId,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        listingId: z.string(),
        bidAmount: z.number().optional(),
        bidMessage: z.string().optional(),
        bidStatus: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.bid.create({
        data: {
          ...input,
          bidDate: new Date(),
          userId: ctx.auth.userId,
        },
      });
    }),
});

