import { createSSGHelpers } from '@trpc/react/ssg'
import type { GetServerSidePropsContext, NextPage } from 'next'
import superjson from 'superjson'
import { Layout } from 'components/Layout'
import { appRouter } from 'server/routers'
import { prisma } from 'lib/prisma'

const Home: NextPage = () => {
  return <Layout />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ssg = createSSGHelpers({
    router: appRouter,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ctx: { req: context.req as any, res: context.res as any, prisma },
    transformer: superjson
  })

  const { boards } = await ssg.fetchQuery('board.get-boards')

  if (boards.length) {
    const firstBoard = boards[0]

    await ssg.fetchQuery('board.get-board-tasks', {
      boardId: firstBoard.id
    })
  }

  return {
    props: {
      trpcState: ssg.dehydrate(),
      boardId: boards.length ? boards[0].id : null
    }
  }
}

export default Home
