import { EmptyBoard } from 'components/EmptyBoard'
import { useBoard } from 'hooks'

export function BoardContent() {
  const { board } = useBoard()
  return (
    <div className='flex-1'>
      {!board || board.columns.length === 0 ? (
        <EmptyBoard />
      ) : (
        <h1>Kanban board</h1>
      )}
    </div>
  )
}
