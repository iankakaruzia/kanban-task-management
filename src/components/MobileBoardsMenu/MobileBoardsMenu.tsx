import { Dialog, Transition } from '@headlessui/react'
import { ThemeToggle } from 'components/ThemeToggle'
import NiceModal from '@ebay/nice-modal-react'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import { classNames } from 'utils/styles/class-names'
import { AddBoardModal } from 'components/AddBoardForm'
import { trpc } from 'lib/trpc'
import { useBoard } from 'hooks'
import { ADD_BOARD_MODAL_ID } from 'utils/constants/modal-ids'

export function MobileBoardsMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { data } = trpc.useQuery(['board.get-boards'])
  const { board, selectBoard } = useBoard()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function showAddBoardFormModal() {
    closeModal()
    NiceModal.show(ADD_BOARD_MODAL_ID)
  }

  function updateSelectedProject(id: number) {
    selectBoard(id)
    closeModal()
  }

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        className='flex items-center md:hidden'
      >
        <strong className='mr-2'>{board?.name}</strong>
        <Image
          src={
            isOpen
              ? '/assets/icon-chevron-up.svg'
              : '/assets/icon-chevron-down.svg'
          }
          alt=''
          width={10}
          height={7}
        />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10 md:hidden'
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-start justify-center px-14 pt-20 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-xs transform overflow-hidden rounded-2xl bg-white dark:bg-gray-500 py-4 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h4'
                    className='font-bold text-heading-sm text-gray-300 ml-6 mb-5'
                  >
                    ALL BOARDS ({data?.boards.length ?? 0})
                  </Dialog.Title>
                  <div className='mt-2'>
                    <ul className='pr-6'>
                      {data?.boards.map((project) => (
                        <li key={project.id}>
                          <button
                            className={classNames(
                              'mr-6 flex items-center px-6 py-[14px] w-full text-heading-md',
                              project.id === board?.id &&
                                'bg-purple-500 rounded-tr-full rounded-br-full'
                            )}
                            onClick={() => updateSelectedProject(project.id)}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                            >
                              <path
                                fill={
                                  project.id === board?.id ? '#fff' : '#828FA3'
                                }
                                d='M0 2.889A2.889 2.889 0 012.889 0H13.11A2.889 2.889 0 0116 2.889V13.11A2.888 2.888 0 0113.111 16H2.89A2.889 2.889 0 010 13.111V2.89zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333zm8.445-1.333V1.333h-6.89A1.556 1.556 0 001.334 2.89v4.22h8.445zm4.889-1.333H11.11v4.444h3.556V5.778zm0 5.778H11.11v3.11h2a1.556 1.556 0 001.556-1.555v-1.555zm0-7.112V2.89a1.555 1.555 0 00-1.556-1.556h-2v3.111h3.556z'
                              ></path>
                            </svg>
                            <span
                              className={classNames(
                                'ml-3',
                                project.id === board?.id
                                  ? 'text-white'
                                  : 'text-gray-300'
                              )}
                            >
                              {project.name}
                            </span>
                          </button>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={showAddBoardFormModal}
                          className='mr-6 w-full flex items-center pl-6 pr-2 py-[14px] text-heading-md'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                          >
                            <path
                              fill='#635FC7'
                              d='M0 2.889A2.889 2.889 0 012.889 0H13.11A2.889 2.889 0 0116 2.889V13.11A2.888 2.888 0 0113.111 16H2.89A2.889 2.889 0 010 13.111V2.89zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333zm8.445-1.333V1.333h-6.89A1.556 1.556 0 001.334 2.89v4.22h8.445zm4.889-1.333H11.11v4.444h3.556V5.778zm0 5.778H11.11v3.11h2a1.556 1.556 0 001.556-1.555v-1.555zm0-7.112V2.89a1.555 1.555 0 00-1.556-1.556h-2v3.111h3.556z'
                            ></path>
                          </svg>
                          <span className='ml-3 text-purple-500'>
                            + Create New Board
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className='mt-4 px-4'>
                    <ThemeToggle />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <AddBoardModal id={ADD_BOARD_MODAL_ID} />
    </>
  )
}
