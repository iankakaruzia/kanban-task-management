import { ThemeToggle } from 'components/ThemeToggle'
import { trpc } from 'lib/trpc'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { data } = trpc.useQuery(['board.get-boards'])

  console.log({ data })
  return (
    <div className='container'>
      <h1 className='text-body-md'>Kanban Task Management</h1>
      <div className='max-w-xs'>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Home
