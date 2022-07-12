import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'
import NiceModal from '@ebay/nice-modal-react'
import toast from 'react-hot-toast'
import { classNames } from 'utils/styles/class-names'
import { EditBoardModal } from 'components/EditBoardForm'
import { DeleteModal } from 'components/DeleteModal'
import { trpc } from 'lib/trpc'
import { useBoard } from 'hooks'

export function BoardOptions() {
  const { board, removeBoard } = useBoard()
  const utils = trpc.useContext()
  const mutation = trpc.useMutation('board.delete-board', {
    onSuccess: () => {
      utils.invalidateQueries(['board.get-boards'])
      if (board) {
        utils.cancelQuery(['board.get-board-tasks', { boardId: board.id }])
      }
      removeBoard()
    }
  })

  function showEditBoardFormModal() {
    NiceModal.show('edit-board-form-modal')
  }

  function showDeleteBoardModal() {
    NiceModal.show('delete-board-modal')
  }

  function onDelete() {
    if (!board) {
      return
    }

    mutation.mutate(
      { boardId: board.id },
      {
        onSuccess: () => {
          toast.success('Board deleted successfully')
        }
      }
    )
  }

  return (
    <>
      <Menu as='div' className='relative inline-block text-left'>
        <Menu.Button
          className='p-2 rounded-full disabled:cursor-not-allowed disabled:opacity-25'
          disabled={!board}
          aria-label='Board options'
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
          <Menu.Items className='absolute right-0 top-10 md:top-12 bg-white dark:bg-gray-600 w-48 flex flex-col items-start rounded-lg p-4'>
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <button
                  onClick={showEditBoardFormModal}
                  className={classNames(
                    'mb-4 font-medium text-body-lg text-gray-300',
                    active && 'ring-2 ring-gray-600 dark:ring-white'
                  )}
                >
                  Edit Board
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
                  Delete Board
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>

      <EditBoardModal id='edit-board-form-modal' />
      <DeleteModal
        id='delete-board-modal'
        content={`Are you sure you want to delete the '${board?.name}' board? This action will remove all columns and tasks and cannot be reversed.`}
        onDelete={onDelete}
      />
    </>
  )
}
