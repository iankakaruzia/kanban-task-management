import { createContext, ReactNode, useContext, useState } from 'react'
import { trpc } from 'lib/trpc'
import { Board } from 'models/board'

export type BoardContextData = {
  board: Board | null
  isLoading: boolean
  selectBoard: (boardId: number) => void
  removeBoard: () => void
  invalidateBoard: () => void
}

export const BoardContextDefaultValues: BoardContextData = {
  board: null,
  isLoading: false,
  selectBoard: () => null,
  removeBoard: () => null,
  invalidateBoard: () => null
}

export const BoardContext = createContext<BoardContextData>(
  BoardContextDefaultValues
)

export type BoardProviderProps = {
  children: ReactNode
  boardId: number | null
}

function BoardProvider({ children, boardId: ssrBoardId }: BoardProviderProps) {
  const [boardId, setBoardId] = useState(ssrBoardId ?? -1)
  const utils = trpc.useContext()
  const { data, isLoading } = trpc.useQuery(
    ['board.get-board-tasks', { boardId }],
    {
      enabled: boardId !== -1
    }
  )

  function selectBoard(selectedBoardId: number) {
    setBoardId(selectedBoardId)
  }

  function removeBoard() {
    setBoardId(-1)
  }

  function invalidateBoard() {
    if (boardId !== -1) {
      utils.invalidateQueries(['board.get-board-tasks', { boardId }])
    }
  }

  return (
    <BoardContext.Provider
      value={{
        board: data?.board ?? null,
        isLoading,
        selectBoard,
        removeBoard,
        invalidateBoard
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

function useBoard() {
  const context = useContext(BoardContext)

  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider')
  }

  return context
}

export { BoardProvider, useBoard }
