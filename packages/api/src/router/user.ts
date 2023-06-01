import { Prisma } from "@prisma/client";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  storeUserData: publicProcedure.mutation(async ({ ctx }) => {
    const discordId = ctx.auth.user?.id;
    if (!discordId) {
      throw new Error("Discord ID is not provided");
    }

    // Check if user exists in the database
    const existingUser = await ctx.prisma.userProfile.findUnique({
      where: {
        discordId,
      },
    });

    // If user exists, update user
    if (existingUser) {
      const updateData: Partial<Prisma.userProfileUpdateInput> = {};
      if (email !== undefined) updateData.email = email;
      if (name !== undefined) updateData.name = name;

      await ctx.prisma.userProfile.update({
        where: {
          discordId,
        },
        data: updateData,
      });
    }
    // If user does not exist, create user
    else {
      const createData: Prisma.userProfileCreateInput = { discordId };
      if (email !== undefined) createData.email = email;
      if (name !== undefined) createData.name = name;

      await ctx.prisma.userProfile.create({
        data: createData,
      });
    }

    // Return updated or new user
    const user = await ctx.prisma.userProfile.findUnique({
      where: { discordId },
    });

    return user;
  }),
});
