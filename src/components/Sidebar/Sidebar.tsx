import { Transition } from '@headlessui/react'
import { ThemeToggle } from 'components/ThemeToggle'
import { useBoard, useSidebar } from 'hooks'
import Image from 'next/image'
import { Fragment } from 'react'
import NiceModal from '@ebay/nice-modal-react'
import { classNames } from 'utils/styles/class-names'
import { AddBoardModal } from 'components/AddBoardForm'
import { trpc } from 'lib/trpc'
import { ADD_BOARD_MODAL_ID } from 'utils/constants/modal-ids'

export function Sidebar() {
  const { isOpen, toggle } = useSidebar()
  const { data } = trpc.useQuery(['board.get-boards'])
  const { board, selectBoard } = useBoard()

  function updateSelectedProject(id: number) {
    selectBoard(id)
  }

  function showAddBoardFormModal() {
    NiceModal.show(ADD_BOARD_MODAL_ID)
  }

  return (
    <>
      <Transition
        as={Fragment}
        show={isOpen}
        enter='transform transition ease-in-out duration-200'
        enterFrom='-translate-x-full'
        enterTo='translate-x-0'
        leave='transform transition ease-in-out duration-200'
        leaveFrom='translate-x-0'
        leaveTo='-translate-x-full'
      >
        <aside className='hidden md:flex flex-col flex-shrink-0 justify-between flex-1 bg-white dark:bg-gray-500 w-full min-w-[260px] lg:min-w-[300px] max-w-[260px] lg:max-w-[300px] transition-all border-r border-gray-200 dark:border-gray-400'>
          <div className='mt-8'>
            <h3 className='font-bold text-heading-sm text-gray-300 ml-6 mb-5'>
              ALL BOARDS ({data?.boards.length ?? 0})
            </h3>
            <ul className='pr-5 lg:pr-6'>
              {data?.boards.map((project) => (
                <li key={project.id}>
                  <button
                    className={classNames(
                      'w-full flex items-center px-6 py-[14px] rounded-tr-[100px] rounded-br-[100px] text-heading-md group transition-all',
                      project.id === board?.id
                        ? 'bg-purple-500 hover:bg-opacity-80'
                        : 'hover:bg-purple-500 hover:bg-opacity-10 hover:dark:bg-white'
                    )}
                    onClick={() => updateSelectedProject(project.id)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                    >
                      <path
                        className={classNames(
                          project.id === board?.id
                            ? 'fill-white'
                            : 'fill-gray-300 group-hover:fill-purple-500'
                        )}
                        d='M0 2.889A2.889 2.889 0 012.889 0H13.11A2.889 2.889 0 0116 2.889V13.11A2.888 2.888 0 0113.111 16H2.89A2.889 2.889 0 010 13.111V2.89zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333zm8.445-1.333V1.333h-6.89A1.556 1.556 0 001.334 2.89v4.22h8.445zm4.889-1.333H11.11v4.444h3.556V5.778zm0 5.778H11.11v3.11h2a1.556 1.556 0 001.556-1.555v-1.555zm0-7.112V2.89a1.555 1.555 0 00-1.556-1.556h-2v3.111h3.556z'
                      ></path>
                    </svg>
                    <span
                      className={classNames(
                        'ml-3 transition-colors',
                        project.id === board?.id
                          ? 'text-white'
                          : 'text-gray-300 group-hover:text-purple-500'
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
                  className='mr-6 flex w-full rounded-tr-[100px] rounded-br-[100px] items-center pl-6 pr-2 py-[14px] text-heading-md group hover:bg-purple-500 hover:bg-opacity-10 hover:dark:bg-white'
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

          <div className='pb-8 pr-3 lg:pr-6'>
            <ThemeToggle className='ml-3 lg:ml-6' />
            <button
              className='mt-4 w-full flex rounded-tr-[100px] group rounded-br-[100px] items-center px-3 py-[14px] transition-colors hover:bg-purple-500 hover:bg-opacity-10 hover:dark:bg-white'
              onClick={toggle}
              aria-label='Hide sidebar'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='16'>
                <path
                  className='fill-gray-300 group-hover:fill-purple-500'
                  d='M8.522 11.223a4.252 4.252 0 01-3.654-5.22l3.654 5.22zM9 12.25A8.685 8.685 0 011.5 8a8.612 8.612 0 012.76-2.864l-.86-1.23A10.112 10.112 0 00.208 7.238a1.5 1.5 0 000 1.524A10.187 10.187 0 009 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 019 12.25zm8.792-3.488a10.14 10.14 0 01-4.486 4.046l1.504 2.148a.375.375 0 01-.092.523l-.648.453a.375.375 0 01-.523-.092L3.19 1.044A.375.375 0 013.282.52L3.93.068a.375.375 0 01.523.092l1.735 2.479A10.308 10.308 0 019 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 010 1.524zM16.5 8a8.674 8.674 0 00-6.755-4.219A1.75 1.75 0 1012.75 5v-.001a4.25 4.25 0 01-1.154 5.366l.834 1.192A8.641 8.641 0 0016.5 8z'
                ></path>
              </svg>
              <span className='ml-[10px] text-gray-300 group-hover:text-purple-500 text-heading-md'>
                Hide Sidebar
              </span>
            </button>
          </div>
        </aside>
      </Transition>
      {!isOpen && (
        <Transition
          as={Fragment}
          show={!isOpen}
          enter='transform transition ease-in-out duration-200'
          enterFrom='-translate-x-full'
          enterTo='translate-x-0'
          leave='transform transition ease-in-out duration-200'
          leaveFrom='translate-x-0'
          leaveTo='-translate-x-full'
        >
          <button
            className='hidden md:block fixed bottom-8 z-10 bg-purple-500 hover:bg-purple-300 transition-colors w-14 h-12 rounded-tr-[100px] rounded-br-[100px]'
            onClick={toggle}
            aria-label='Open sidebar'
          >
            <Image
              src='/assets/icon-show-sidebar.svg'
              alt=''
              width={16}
              height={11}
            />
          </button>
        </Transition>
      )}
      <AddBoardModal id={ADD_BOARD_MODAL_ID} />
    </>
  )
}
