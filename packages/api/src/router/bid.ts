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
      })
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
//updatedBid.listing.property.ownerId
  accept: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.bid
      .update({
        where: { id: input },
        data: { bidStatus: "accepted" },
        include: { listing: true },
      })
      .then((updatedBid) => {
        // Create a chat between the owner and the cleaner
        return ctx.prisma.chat.create({
          data: {
            users: {
              connect: [
                { discordId: ctx.auth.userId }, // Connect the owner
                { discordId: updatedBid.userId }, // Connect the cleaner
              ],
            },
          },
        });
      });
  }),

  decline: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.bid.update({
      where: { id: input },
      data: { bidStatus: "declined" },
    });
  }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.bid.delete({ where: { id: input } });
  }),
});
