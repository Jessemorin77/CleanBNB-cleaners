import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const chatRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userProfile.findMany();
  }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.userProfile.findUnique({
      where: { id: input },
    });
  }),

  createMessage: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
        content: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.message.create({
        data: {
          content: input.content,
          chat: {
            connect: {
              id: input.chatId,
            },
          },
          user: {
            connect: {
              discordId: ctx.auth.userId,
            },
          },
        },
      });
    }),

  getMessagesByChatId: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.message.findMany({
        where: {
          chatId: input,
        },
      });
    }),
});
