import { ThemeToggle } from 'components/ThemeToggle'
import type { NextPage } from 'next'

const Home: NextPage = () => {
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
