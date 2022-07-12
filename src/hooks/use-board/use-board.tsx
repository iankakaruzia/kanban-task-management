import { createContext, ReactNode, useContext, useState } from 'react'
import { trpc } from 'lib/trpc'

export type Subtask = {
  id: number
  name: string
  isCompleted: boolean
}

export type Task = {
  id: number
  title: string
  subtasks: Subtask[]
}

export type Column = {
  id: number
  name: string
  tasks: Task[]
}

export type Board = {
  id: number
  name: string
  columns: Column[]
}

export type BoardContextData = {
  board: Board | null
  isLoading: boolean
  selectBoard: (boardId: number) => void
  removeBoard: () => void
}

export const BoardContextDefaultValues: BoardContextData = {
  board: null,
  isLoading: false,
  selectBoard: () => null,
  removeBoard: () => null
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

  return (
    <BoardContext.Provider
      value={{
        board: data?.board ?? null,
        isLoading,
        selectBoard,
        removeBoard
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
