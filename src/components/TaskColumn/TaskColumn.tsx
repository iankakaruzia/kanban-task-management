import NiceModal from '@ebay/nice-modal-react'
import { TaskCard } from 'components/TaskCard'
import { TaskDetails } from 'components/TaskDetails'
import { Column } from 'models/board'

type TaskColumnProps = Column

export function TaskColumn({ name, tasks }: TaskColumnProps) {
  function showTaskDetailsModal(taskId: number) {
    NiceModal.show(TaskDetails, { taskId })
  }

  return (
    <div>
      <div className='flex items-center gap-3 mb-6'>
        <div className='h-[15px] w-[15px] rounded-full bg-gray-300' />
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
