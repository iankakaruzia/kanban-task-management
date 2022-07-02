import { createRouter } from 'server/utils/create-router'
import { z } from 'zod'

export const taskRouter = createRouter()
  .mutation('create-task', {
    input: z.object({
      title: z.string(),
      columnId: z.number(),
      description: z.string().optional(),
      subtasks: z.array(z.string()).optional()
    }),
    async resolve({ ctx, input }) {
      const task = await ctx.prisma.task.create({
        data: {
          title: input.title,
          columnId: input.columnId,
          description: input.description
        }
      })

      if (input.subtasks && input.subtasks.length > 0) {
        await ctx.prisma.subtask.createMany({
          data: input.subtasks.map((name) => ({
            name,
            taskId: task.id
          }))
        })
      }

      return { task }
    }
  })
  .mutation('update-task', {
    input: z.object({
      taskId: z.number(),
      title: z.string().optional(),
      columnId: z.number().optional(),
      description: z.string().optional(),
      subtasks: z.array(z.string()).optional()
    }),
    async resolve({ ctx, input }) {
      if (input.title || input.columnId || input.description) {
        await ctx.prisma.task.update({
          where: { id: input.taskId },
          data: {
            ...(input.title && { title: input.title }),
            ...(input.columnId && { columnId: input.columnId }),
            ...(input.description && { description: input.description })
          }
        })
      }

      if (input.subtasks && input.subtasks.length > 0) {
        const taskSubtasks = await ctx.prisma.subtask.findMany({
          where: { taskId: input.taskId }
        })

        const subtasksToBeDeleted = taskSubtasks.filter(
          (subtask) => !input.subtasks?.includes(subtask.name)
        )

        const subtasksToBeAdded = input.subtasks.filter(
          (subtask) =>
            !taskSubtasks.map((subtask) => subtask.name).includes(subtask)
        )

        if (subtasksToBeDeleted.length) {
          await ctx.prisma.subtask.deleteMany({
            where: {
              taskId: input.taskId,
              name: {
                in: subtasksToBeDeleted.map((subtask) => subtask.name)
              }
            }
          })
        }

        if (subtasksToBeAdded.length) {
          await ctx.prisma.subtask.createMany({
            data: subtasksToBeAdded.map((name) => ({
              name,
              taskId: input.taskId
            }))
          })
        }
      }
    }
  })
  .mutation('delete-task', {
    input: z.object({
      taskId: z.number()
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.task.delete({
        where: { id: input.taskId }
      })
    }
  })
  .query('get-task', {
    input: z.object({
      taskId: z.number()
    }),
    async resolve({ ctx, input }) {
      const task = await ctx.prisma.task.findUnique({
        where: { id: input.taskId },
        include: {
          column: true,
          subtasks: true
        }
      })

      return { task }
    }
  })
