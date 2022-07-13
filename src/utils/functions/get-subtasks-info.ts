import { Subtask } from 'models/board'

export function getSubtasksInfo(subtasks: Subtask[]) {
  const totalSubtasks = subtasks.length
  const subtasksCompleted = subtasks.filter((subtask) => subtask.isCompleted)

  return {
    totalSubtasks,
    subtasksCompleted: subtasksCompleted.length
  }
}
