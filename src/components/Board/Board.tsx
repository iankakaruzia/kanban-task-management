import { TaskColumn } from 'components/TaskColumn'
import { useBoard } from 'hooks'

export function Board() {
  const { board } = useBoard()

  if (!board) {
    return null
  }

  return (
    <div className='flex gap-6 overflow-x-auto scroll-smooth h-full px-4 py-6'>
      {board.columns.map((column) => (
        <TaskColumn key={column.id} {...column} color='red' />
      ))}
    </div>
  )
}
