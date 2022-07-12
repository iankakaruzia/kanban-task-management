import { TaskColumn } from 'components/TaskColumn/TaskColumn'
import { useBoard } from 'hooks'

export function Board() {
  const { board } = useBoard()

  if (!board) {
    return null
  }

  return (
    <div className='flex overflow-x-scroll'>
      {board.columns.map((column) => (
        <TaskColumn key={column.id} {...column} />
      ))}
    </div>
  )
}
