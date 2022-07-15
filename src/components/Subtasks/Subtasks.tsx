import { trpc } from 'lib/trpc'
import { Subtask } from 'models/board'
import { ChangeEvent } from 'react'
import { getSubtasksInfo } from 'utils/functions/get-subtasks-info'
import { classNames } from 'utils/styles/class-names'

type SubtasksProps = {
  taskId: number
  subtasks: Subtask[]
}

export function Subtasks({ subtasks, taskId }: SubtasksProps) {
  const utils = trpc.useContext()
  const mutation = trpc.useMutation('subtask.update-subtask', {
    async onMutate({ subtaskId, isCompleted }) {
      await utils.cancelQuery(['task.get-task', { taskId }])
      const snapshotOfPreviousTask = utils.getQueryData([
        'task.get-task',
        { taskId }
      ])

      utils.setQueryData(['task.get-task', { taskId }], (oldData) => {
        if (!oldData || !oldData.task) {
          return { task: null }
        }

        return {
          task: {
            ...oldData.task,
            subtasks: oldData?.task?.subtasks.map((subtask) => {
              if (subtask.id === subtaskId) {
                return {
                  ...subtask,
                  isCompleted
                }
              }
              return subtask
            })
          }
        }
      })

      return { snapshotOfPreviousTask }
    },
    onError(error, variables, context) {
      utils.setQueryData(['task.get-task', { taskId }], {
        task: context?.snapshotOfPreviousTask?.task ?? null
      })
    },
    onSuccess: () => {
      utils.invalidateQueries(['task.get-task', { taskId }])
    }
  })
  const { subtasksCompleted, totalSubtasks } = getSubtasksInfo(subtasks)

  function handleChange(
    subtaskId: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    mutation.mutate({ subtaskId, isCompleted: event.target.checked })
  }

  return (
    <div>
      <span className='block mb-4 text-body-md text-gray-300 dark:text-white'>
        Subtasks ({subtasksCompleted} of {totalSubtasks})
      </span>

      <ul className='flex flex-col gap-2'>
        {subtasks.map((subtask) => (
          <li
            key={subtask.id}
            className='flex items-center cursor-pointer hover:bg-purple-500 hover:bg-opacity-25 bg-gray-100 dark:bg-gray-600 dark:hover:bg-purple-500 dark:hover:bg-opacity-25 rounded transition-all'
          >
            <label
              className='p-3 w-full cursor-pointer'
              htmlFor={`subtask-${subtask.id}`}
            >
              <input
                checked={subtask.isCompleted}
                id={`subtask-${subtask.id}`}
                type='checkbox'
                onChange={(event) => handleChange(subtask.id, event)}
                className='w-4 h-4 text-purple-500 bg-white dark:bg-gray-500 focus:ring-purple-500 focus:ring-2 rounded checked:bg-purple-500 dark:checked:bg-purple-500 border-gray-300 border-opacity-25'
              />
              <span
                className={classNames(
                  'ml-4 text-body-md text-gray-700 dark:text-white cursor-pointer p-3',
                  subtask.isCompleted && 'opacity-50 line-through'
                )}
              >
                {subtask.name}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
