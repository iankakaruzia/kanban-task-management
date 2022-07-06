import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'

export function Layout() {
  return (
    <main className='min-h-screen flex flex-col'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />
        <h1>Kanban board</h1>
      </div>
    </main>
  )
}
