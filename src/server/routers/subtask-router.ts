import { createRouter } from 'server/utils/create-router'
import { z } from 'zod'

export const subtaskRouter = createRouter().mutation('update-subtask', {
  input: z.object({
    subtaskId: z.number(),
    isCompleted: z.boolean()
  }),
  async resolve({ ctx, input }) {
    const subtask = await ctx.prisma.subtask.findUnique({
      where: { id: input.subtaskId }
    })

    if (!subtask || subtask.isCompleted === input.isCompleted) {
      return
    }

    await ctx.prisma.subtask.update({
      where: { id: subtask.id },
      data: { isCompleted: input.isCompleted }
    })
  }
})
