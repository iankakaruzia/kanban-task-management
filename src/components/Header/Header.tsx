import Image from 'next/image'
import { MobileBoardsMenu } from 'components/MobileBoardsMenu'
import NiceModal from '@ebay/nice-modal-react'
import { classNames } from 'utils/styles/class-names'
import { useBoard, useSidebar } from 'hooks'
import { AddTaskModal } from 'components/AddTaskForm'
import { BoardOptions } from 'components/BoardOptions'
import { Skeleton } from 'components/Skeleton'
import { ADD_TASK_MODAL_ID } from 'utils/constants/modal-ids'

export function Header() {
  const { isOpen } = useSidebar()
  const { board, isLoading } = useBoard()

  function showAddTaskFormModal() {
    NiceModal.show(ADD_TASK_MODAL_ID)
  }

  return (
    <>
      <header className='flex py-4 md:p-0 items-center bg-white dark:bg-gray-500'>
        <div
          className={classNames(
            'mr-4 md:mr-0 pl-4 md:pl-6 flex items-center md:self-stretch md:border-r md:border-b transition-all',
            isOpen
              ? 'md:w-[260px] lg:w-[300px] border-transparent border-r-gray-200 dark:border-r-gray-400'
              : 'md:w-[200px] lg:w-[210px] border-gray-200 dark:border-gray-400'
          )}
        >
          <div className='md:hidden'>
            <Image
              src='/assets/logo-mobile.svg'
              alt=''
              width={24}
              height={25}
            />
          </div>

          <div className='hidden md:block bg-logo-dark dark:bg-logo-light h-[25.22px] w-[152.53px]'></div>
        </div>

        <div className='flex-1 md:pl-6 self-stretch flex items-center md:border-b border-gray-200 dark:border-gray-400'>
          <MobileBoardsMenu />
          <h3 className='hidden md:block text-xl leading-[25px] lg:text-heading-xl'>
            {isLoading ? (
              <Skeleton>
                <Skeleton.Line className='h-7 w-52' />
              </Skeleton>
            ) : (
              board?.name ?? 'No board selected'
            )}
          </h3>
        </div>

        <div className='flex items-center pr-2 md:pr-4 md:py-4 lg:py-5 md:border-b border-gray-200 dark:border-gray-400'>
          <button
            className='mr-2 md:mr-4 bg-purple-500 hover:bg-purple-300 h-8 md:h-auto w-12 md:w-auto md:px-6 md:py-[14px] rounded-3xl transition-colors disabled:opacity-25 hover:disabled:bg-purple-500 disabled:cursor-not-allowed'
            aria-label='Add new task'
            disabled={!board?.columns.length}
            onClick={showAddTaskFormModal}
          >
            <div className='block md:hidden'>
              <Image
                src='/assets/icon-add-task-mobile.svg'
                alt=''
                width={12}
                height={12}
              />
            </div>
            <span className='hidden md:block text-heading-md text-white'>
              + Add New Task
            </span>
          </button>

          <BoardOptions />
        </div>
      </header>
      <AddTaskModal id={ADD_TASK_MODAL_ID} />
    </>
  )
}
