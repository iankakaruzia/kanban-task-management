import NiceModal from '@ebay/nice-modal-react'
import { TaskCard } from 'components/TaskCard'
import { TaskDetails } from 'components/TaskDetails'
import { Column } from 'models/board'
import { classNames } from 'utils/styles/class-names'

type TaskColumnProps = {
  color: string
} & Column

export function TaskColumn({ name, tasks, color }: TaskColumnProps) {
  function showTaskDetailsModal(taskId: number) {
    NiceModal.show(TaskDetails, { taskId })
  }

  return (
    <div>
      <div className='flex items-center gap-3 mb-6'>
        <div
          className={classNames(
            'h-[15px] w-[15px] rounded-full',
            color && `bg-${color}-500`
          )}
        />
        <strong className='text-gray-300 text-heading-sm uppercase'>
          {name} ({tasks.length})
        </strong>
      </div>
      <ul className='flex flex-col gap-5'>
        {tasks.map((task) => (
          <TaskCard onClick={showTaskDetailsModal} key={task.id} {...task} />
        ))}
      </ul>
    </div>
  )
}
