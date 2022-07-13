import { TaskCard } from 'components/TaskCard'
import { Column } from 'models/board'

type TaskColumnProps = Column

export function TaskColumn({ name, tasks }: TaskColumnProps) {
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
          <TaskCard key={task.id} {...task} />
        ))}
      </ul>
    </div>
  )
}
