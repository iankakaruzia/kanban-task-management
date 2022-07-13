import { Modal } from 'components/Modal'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { trpc } from 'lib/trpc'
import { Skeleton } from 'components/Skeleton'
import { Subtasks } from 'components/Subtasks'

type TaskDetailsProps = {
  taskId: number
}

export const TaskDetails = NiceModal.create<TaskDetailsProps>(({ taskId }) => {
  console.log({ taskId })
  const modal = useModal()
  const { data, isLoading } = trpc.useQuery(['task.get-task', { taskId }])

  function onClose() {
    modal.hide()
  }

  return (
    <Modal
      isOpen={modal.visible}
      onClose={onClose}
      title={data?.task?.title}
      isLoading={isLoading}
    >
      {isLoading && (
        <Skeleton>
          <Skeleton.Line className='w-40 h-6' />
        </Skeleton>
      )}

      {(!data || data.task === null) && !isLoading && <p>Unable to fetch</p>}

      {data?.task?.description && (
        <p className='text-gray-300 text-body-lg font-medium mb-6'>
          {data.task.description}
        </p>
      )}

      {data?.task?.subtasks.length && (
        <Subtasks subtasks={data.task.subtasks} />
      )}
    </Modal>
  )
})