import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
    </>
  )
}

export default MyApp
