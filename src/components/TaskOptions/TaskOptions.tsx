import { Menu, Transition } from '@headlessui/react'
import { DeleteModal } from 'components/DeleteModal'
import NiceModal from '@ebay/nice-modal-react'
import toast from 'react-hot-toast'
import { trpc } from 'lib/trpc'
import Image from 'next/image'
import { Fragment } from 'react'
import { DELETE_BOARD_MODAL_ID } from 'utils/constants/modal-ids'
import { classNames } from 'utils/styles/class-names'

type TaskOptionsProps = {
  isLoading: boolean
  taskId: number
  taskTitle: string
  onDeleteTask: () => void
}

export function TaskOptions({
  isLoading,
  taskId,
  taskTitle,
  onDeleteTask
}: TaskOptionsProps) {
  const utils = trpc.useContext()
  const mutation = trpc.useMutation('task.delete-task', {
    onSuccess: () => {
      utils.cancelQuery(['task.get-task', { taskId }])

      NiceModal.hide(DELETE_BOARD_MODAL_ID)
      onDeleteTask()
    }
  })

  function showDeleteBoardModal() {
    NiceModal.show(DELETE_BOARD_MODAL_ID)
  }

  function onDelete() {
    mutation.mutate(
      { taskId },
      {
        onSuccess: () => {
          toast.success('Task deleted successfully')
        }
      }
    )
  }

  return (
    <>
      <Menu as='div' className='relative inline-block text-left'>
        <Menu.Button
          className='p-2 rounded-full disabled:cursor-not-allowed disabled:opacity-25'
          disabled={isLoading}
          aria-label='Task options'
        >
          <div className='w-[3.69px] md:w-[4.62px] h-4 md:h-5 relative'>
            <Image
              src='/assets/icon-vertical-ellipsis.svg'
              alt=''
              layout='fill'
            />
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 md:-right-20 top-10 md:top-12 bg-white dark:bg-gray-600 w-48 flex flex-col items-start rounded-lg p-4'>
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <button
                  className={classNames(
                    'mb-4 font-medium text-body-lg text-gray-300',
                    active && 'ring-2 ring-gray-600 dark:ring-white'
                  )}
                >
                  Edit Task
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <button
                  onClick={showDeleteBoardModal}
                  className={classNames(
                    'font-medium text-body-lg text-red-500',
                    active && 'ring-2 ring-red-500'
                  )}
                >
                  Delete Task
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>

      <DeleteModal
        title='Delete this task?'
        id={DELETE_BOARD_MODAL_ID}
        isLoading={mutation.isLoading}
        content={`Are you sure you want to delete the '${taskTitle}' task and its subtasks? This action cannot be reversed.`}
        onDelete={onDelete}
      />
    </>
  )
}
