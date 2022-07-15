import { Modal } from 'components/Modal'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { trpc } from 'lib/trpc'
import { Skeleton } from 'components/Skeleton'
import { Subtasks } from 'components/Subtasks'
import { TaskOptions } from 'components/TaskOptions'
import { useBoard } from 'hooks'
import { Select } from 'components/Select'
import { useState } from 'react'

type TaskDetailsProps = {
  taskId: number
}

export const TaskDetails = NiceModal.create<TaskDetailsProps>(({ taskId }) => {
  const [updatedColumnId, setUpdatedColumnId] = useState<number | null>(null)
  const modal = useModal()
  const { invalidateBoard, board } = useBoard()
  const { data, isLoading } = trpc.useQuery(['task.get-task', { taskId }])
  const mutation = trpc.useMutation(['task.update-task-column'], {
    onSuccess: () => {
      invalidateBoard()
    }
  })

  function onClose() {
    if (updatedColumnId && updatedColumnId !== data?.task?.columnId) {
      mutation.mutate({
        taskId,
        columnId: updatedColumnId
      })
    } else {
      invalidateBoard()
    }

    modal.hide()
  }

  function handleChangeStatus({ id }: { id: number }) {
    setUpdatedColumnId(id)
  }

  return (
    <Modal
      isOpen={modal.visible}
      onClose={onClose}
      title={data?.task?.title}
      isLoading={isLoading}
      titleClassNames='pr-4'
    >
      {isLoading && (
        <Skeleton>
          <Skeleton.Line className='w-40 h-6' />
        </Skeleton>
      )}

      {data?.task && (
        <div className='absolute top-6 right-8'>
          <TaskOptions
            isLoading={isLoading}
            taskId={data.task.id}
            taskTitle={data.task.title}
            onDeleteTask={onClose}
          />
        </div>
      )}

      {(!data || data.task === null) && !isLoading && <p>Unable to fetch</p>}

      {data?.task?.description && (
        <p className='text-gray-300 text-body-lg font-medium mb-6'>
          {data.task.description}
        </p>
      )}

      {data?.task?.subtasks.length && (
        <Subtasks taskId={data.task.id} subtasks={data.task.subtasks} />
      )}

      {board && data?.task?.column && (
        <Select
          label='Current Status'
          options={board.columns}
          defaultOption={data.task.column}
          onChange={handleChangeStatus}
          className='mt-6'
        />
      )}
    </Modal>
  )
})
