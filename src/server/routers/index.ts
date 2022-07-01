import { createRouter } from 'server/utils/create-router'
import superjson from 'superjson'
import { boardRouter } from './board-router'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('board.', boardRouter)

// export type definition of API
export type AppRouter = typeof appRouter
