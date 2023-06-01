import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const profileRouter = router({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userProfile.findMany();
  }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.userProfile.findFirst({ where: { id: input } });
  }),

  create: protectedProcedure
    .input(
      z.object({
        discordId: z.string(),
        email: z.string().optional(),
        name: z.string().optional(),
        image: z.string().optional(),
        experience: z.string().optional(),
        workType: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userProfile.create({ data: input });
    }),

    update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string().optional(),
        name: z.string().optional(),
        image: z.string().optional(),
        experience: z.string().optional(),
        workType: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.userProfile.update({
        where: { id },
        data,
      });
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.userProfile.delete({ where: { id: input } });
  }),
});
