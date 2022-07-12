import { TaskCard } from 'components/TaskCard'
import { Column } from 'models/board'

type TaskColumnProps = Column

export function TaskColumn({ name, tasks }: TaskColumnProps) {
  return (
    <div>
      <strong>{name}</strong>
      <ul>
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </ul>
    </div>
  )
}
