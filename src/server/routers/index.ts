import { createRouter } from 'server/utils/create-router'
import superjson from 'superjson'
import { boardRouter } from './board-router'
import { columnRouter } from './column-router'
import { taskRouter } from './task-router'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('board.', boardRouter)
  .merge('task.', taskRouter)
  .merge('column.', columnRouter)

// export type definition of API
export type AppRouter = typeof appRouter
