import { Subtask } from 'models/board'
import { getSubtasksInfo } from 'utils/functions/get-subtasks-info'
import { classNames } from 'utils/styles/class-names'

type SubtasksProps = {
  subtasks: Subtask[]
}

export function Subtasks({ subtasks }: SubtasksProps) {
  const { subtasksCompleted, totalSubtasks } = getSubtasksInfo(subtasks)
  return (
    <div>
      <span className='block mb-4 text-body-md text-gray-300 dark:text-white'>
        Subtasks ({subtasksCompleted} of {totalSubtasks})
      </span>

      <ul className='flex flex-col gap-2'>
        {subtasks.map((subtask) => (
          <li
            key={subtask.id}
            className='flex items-center cursor-pointer hover:bg-purple-500 hover:bg-opacity-25 bg-gray-100 dark:bg-gray-600 dark:hover:bg-purple-500 dark:hover:bg-opacity-25 p-3 rounded transition-all'
          >
            <input
              checked={subtask.isCompleted}
              id={`subtask-${subtask.id}`}
              type='checkbox'
              onChange={(e) => console.log({ value: e.target.value })}
              className='w-4 h-4 cursor-pointer text-purple-500 bg-white dark:bg-gray-500 focus:ring-purple-500 focus:ring-2 rounded checked:bg-purple-500 dark:checked:bg-purple-500 border-gray-300 border-opacity-25'
            />
            <label
              htmlFor={`subtask-${subtask.id}`}
              className={classNames(
                'ml-4 text-body-md text-gray-700 dark:text-white cursor-pointer',
                subtask.isCompleted && 'opacity-50 line-through'
              )}
            >
              {subtask.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
