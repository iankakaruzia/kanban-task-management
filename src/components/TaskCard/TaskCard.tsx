import { Task } from 'models/board'

type TaskCardProps = Task

export function TaskCard({ title, subtasks }: TaskCardProps) {
  function formatSubtasksInfo() {
    const totalSubtasks = subtasks.length
    const subtasksCompleted = subtasks.filter((subtask) => subtask.isCompleted)

    return `${subtasksCompleted.length} of ${totalSubtasks}`
  }

  return (
    <li className='min-w-[280px]'>
      <strong>{title}</strong>
      <span>{formatSubtasksInfo()}</span>
    </li>
  )
}
