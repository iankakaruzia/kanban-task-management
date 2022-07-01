import { createRouter } from 'server/utils/create-router'
import { z } from 'zod'

export const boardRouter = createRouter()
  .mutation('create-board', {
    input: z.object({
      name: z.string()
    }),
    async resolve({ ctx, input }) {
      const board = await ctx.prisma.board.create({
        data: {
          name: input.name
        }
      })

      return { success: true, board }
    }
  })
  .query('get-boards', {
    async resolve({ ctx }) {
      const boards = await ctx.prisma.board.findMany()

      return { success: true, boards }
    }
  })
