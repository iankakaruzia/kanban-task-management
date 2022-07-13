import { Task } from 'models/board'

type TaskCardProps = Task

export function TaskCard({ title, subtasks }: TaskCardProps) {
  function formatSubtasksInfo() {
    const totalSubtasks = subtasks.length
    const subtasksCompleted = subtasks.filter((subtask) => subtask.isCompleted)

    return `${subtasksCompleted.length} of ${totalSubtasks} subtasks`
  }

  return (
    <li className='w-[280px] bg-white dark:bg-gray-500 px-4 py-6 flex flex-col rounded-lg shadow-card'>
      <strong className='text-heading-md mb-2'>{title}</strong>
      <span className='text-body-md text-gray-300'>{formatSubtasksInfo()}</span>
    </li>
  )
}
