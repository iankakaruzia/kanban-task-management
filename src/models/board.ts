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
