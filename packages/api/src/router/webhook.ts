import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const webhookRouter = router({
    storeWebhookData: publicProcedure
        .input(
            z.object({
                discordId: z.string(),
                email: z.string(),
                name: z.string(),
                accessToken: z.string(),
                refreshToken: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const {
                discordId,
                email,
                name,
                accessToken,
                refreshToken,
            } = input;

            // Check if user exists in the database
            const existingUser = await ctx.prisma.user.findUnique({
                where: {
                    discordId,
                },
            });

            // If user exists, update user
            if (existingUser) {
                await ctx.prisma.user.update({
                    where: {
                        discordId,
                    },
                    data: {
                        email,
                        name,
                    },
                });
            }
            // If user does not exist, create user
            else {
                await ctx.prisma.user.create({
                    data: {
                        discordId,
                        email,
                        name,
                    },
                });
            }

            // Store token in separate table
            return await ctx.prisma.token.create({
                data: {
                    userId: discordId,
                    accessToken,
                    refreshToken,
                },
            });
        }
        ),
});