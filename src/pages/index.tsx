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

  await ssg.fetchQuery('board.get-boards')

  return {
    props: {
      trpcState: ssg.dehydrate()
    }
  }
}

export default Home
