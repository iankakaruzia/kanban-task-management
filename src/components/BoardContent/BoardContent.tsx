import { Board } from 'components/Board'
import { EmptyBoard } from 'components/EmptyBoard'
import { Spinner } from 'components/Spinner'
import { useBoard } from 'hooks'

export function BoardContent() {
  const { board, isLoading } = useBoard()
  return (
    <div className='flex-1 max-w-full min-h-full'>
      {isLoading ? (
        <div className='flex items-center justify-center h-full'>
          <Spinner size='large' />
        </div>
      ) : board?.columns.length ? (
        <Board />
      ) : (
        <EmptyBoard />
      )}
    </div>
  )
}
