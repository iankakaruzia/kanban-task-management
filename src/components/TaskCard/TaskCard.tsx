import { Task } from 'models/board'
import { getSubtasksInfo } from 'utils/functions/get-subtasks-info'

type TaskCardProps = {
  onClick: (taskId: number) => void
} & Task

export function TaskCard({ title, subtasks, id, onClick }: TaskCardProps) {
  function formatSubtasksInfo() {
    const { subtasksCompleted, totalSubtasks } = getSubtasksInfo(subtasks)

    return `${subtasksCompleted} of ${totalSubtasks} subtasks`
  }

  return (
    <>
      <li
        role='button'
        tabIndex={0}
        onClick={() => onClick(id)}
        className='w-[280px] bg-white dark:bg-gray-500 px-4 py-6 flex flex-col rounded-lg shadow-card'
      >
        <strong className='text-heading-md mb-2'>{title}</strong>
        <span className='text-body-md text-gray-300'>
          {formatSubtasksInfo()}
        </span>
      </li>
    </>
  )
}
