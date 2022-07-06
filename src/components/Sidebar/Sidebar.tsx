import { Transition } from '@headlessui/react'
import { ThemeToggle } from 'components/ThemeToggle'
import { useSidebar } from 'hooks'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import { classNames } from 'utils/styles/class-names'

const PROJECTS = ['Platform Launch', 'Marketing Plan', 'Roadmap']

export function Sidebar() {
  const { isOpen, toggle } = useSidebar()

  const [selectedProject, setSelectedProject] = useState(PROJECTS[0])

  function updateSelectedProject(project: string) {
    setSelectedProject(project)
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
        <aside className='hidden md:flex flex-col justify-between flex-1 bg-white dark:bg-gray-500 max-w-[260px] lg:max-w-[300px] transition-all border-r border-gray-200 dark:border-gray-400'>
          <div className='mt-8'>
            <h3 className='font-bold text-heading-sm text-gray-300 ml-6 mb-5'>
              ALL BOARDS ({PROJECTS.length})
            </h3>
            <ul>
              {PROJECTS.map((project) => (
                <li key={project}>
                  <button
                    className={classNames(
                      'mr-6 flex items-center px-6 py-[14px] text-heading-md',
                      project === selectedProject &&
                        'bg-purple-500 rounded-tr-full rounded-br-full'
                    )}
                    onClick={() => updateSelectedProject(project)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                    >
                      <path
                        fill={project === selectedProject ? '#fff' : '#828FA3'}
                        d='M0 2.889A2.889 2.889 0 012.889 0H13.11A2.889 2.889 0 0116 2.889V13.11A2.888 2.888 0 0113.111 16H2.89A2.889 2.889 0 010 13.111V2.89zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333zm8.445-1.333V1.333h-6.89A1.556 1.556 0 001.334 2.89v4.22h8.445zm4.889-1.333H11.11v4.444h3.556V5.778zm0 5.778H11.11v3.11h2a1.556 1.556 0 001.556-1.555v-1.555zm0-7.112V2.89a1.555 1.555 0 00-1.556-1.556h-2v3.111h3.556z'
                      ></path>
                    </svg>
                    <span
                      className={classNames(
                        'ml-3',
                        project === selectedProject
                          ? 'text-white'
                          : 'text-gray-300'
                      )}
                    >
                      {project}
                    </span>
                  </button>
                </li>
              ))}
              <li>
                <button className='mr-6 flex items-center pl-6 pr-2 py-[14px] text-heading-md'>
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

          <div className='px-3 pb-8'>
            <ThemeToggle />
            <button
              className='mt-4 flex items-center px-3 py-[14px]'
              onClick={toggle}
            >
              <Image
                src='/assets/icon-hide-sidebar.svg'
                alt=''
                width={18}
                height={16}
              />
              <span className='ml-[10px] text-gray-300 text-heading-md'>
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
    </>
  )
}
