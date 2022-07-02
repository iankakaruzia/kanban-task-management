import { createRouter } from 'server/utils/create-router'
import { z } from 'zod'

export const columnRouter = createRouter().query('get-columns', {
  input: z.object({
    boardId: z.number()
  }),
  async resolve({ ctx, input }) {
    const columns = await ctx.prisma.column.findMany({
      where: {
        boardId: input.boardId
      }
    })

    return { columns }
  }
})
