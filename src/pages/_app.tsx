import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class'>
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
    </ThemeProvider>
  )
}

export default MyApp
