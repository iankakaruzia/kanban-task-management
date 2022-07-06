import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { withTRPC } from '@trpc/next'
import superjson from 'superjson'
import { AppRouter } from 'server/routers'
import { SidebarProvider } from 'hooks'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class'>
      <SidebarProvider>
        <Head>
          <title>Kanban Task Management</title>
          <link
            rel='shortcut icon'
            href='/assets/favicon-32x32.png'
            type='image/png'
          />
          <meta
            name='description'
            content='Have full control over your tasks and projects.'
          />
        </Head>
        <Component {...pageProps} />
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    if (typeof window !== 'undefined') {
      return {
        transformer: superjson,
        url: '/api/trpc'
      }
    }
    const ONE_DAY_SECONDS = 60 * 60 * 24
    ctx?.res?.setHeader(
      'Cache-Control',
      `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`
    )

    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc'

    return {
      transformer: superjson,
      url,
      headers: {
        'x-ssr': '1'
      }
    }
  },
  ssr: true
})(MyApp)
