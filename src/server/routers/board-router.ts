import { createRouter } from 'server/utils/create-router'
import { z } from 'zod'

export const boardRouter = createRouter()
  .mutation('create-board', {
    input: z.object({
      name: z.string(),
      columns: z.array(z.string()).optional()
    }),
    async resolve({ ctx, input }) {
      const board = await ctx.prisma.board.create({
        data: {
          name: input.name
        }
      })

      if (input.columns && input.columns.length > 0) {
        await ctx.prisma.column.createMany({
          data: input.columns.map((name) => ({
            name,
            boardId: board.id
          }))
        })
      }

      return { board }
    }
  })
  .mutation('update-board', {
    input: z.object({
      boardId: z.number(),
      name: z.string().optional(),
      columns: z.array(z.string()).optional()
    }),
    async resolve({ ctx, input }) {
      if (input.name) {
        await ctx.prisma.board.update({
          where: { id: input.boardId },
          data: {
            name: input.name
          }
        })
      }

      if (input.columns && input.columns.length > 0) {
        const boardColumns = await ctx.prisma.column.findMany({
          where: {
            boardId: input.boardId
          }
        })

        const columnsToBeDeleted = boardColumns.filter(
          (column) => !input.columns?.includes(column.name)
        )

        const columnsToBeAdded = input.columns.filter(
          (column) =>
            !boardColumns.map((column) => column.name).includes(column)
        )

        if (columnsToBeDeleted.length) {
          await ctx.prisma.column.deleteMany({
            where: {
              boardId: input.boardId,
              name: {
                in: columnsToBeDeleted.map((column) => column.name)
              }
            }
          })
        }

        if (columnsToBeAdded.length) {
          await ctx.prisma.column.createMany({
            data: columnsToBeAdded.map((name) => ({
              name,
              boardId: input.boardId
            }))
          })
        }
      }
    }
  })
  .mutation('delete-board', {
    input: z.object({
      boardId: z.number()
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.board.delete({
        where: { id: input.boardId }
      })
    }
  })
  .query('get-boards', {
    async resolve({ ctx }) {
      const boards = await ctx.prisma.board.findMany()

      return { boards }
    }
  })
  .query('get-board', {
    input: z.object({
      boardId: z.number()
    }),
    async resolve({ ctx, input }) {
      const board = await ctx.prisma.board.findUnique({
        where: { id: input.boardId },
        include: {
          columns: true
        }
      })

      return { board }
    }
  })
  .query('get-board-tasks', {
    input: z.object({
      boardId: z.number()
    }),
    async resolve({ ctx, input }) {
      const board = await ctx.prisma.board.findUnique({
        where: { id: input.boardId },
        include: {
          columns: {
            select: {
              id: true,
              name: true,
              tasks: {
                select: {
                  id: true,
                  title: true,
                  subtasks: true
                }
              }
            }
          }
        }
      })

      return { board }
    }
  })
