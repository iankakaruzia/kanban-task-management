import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { MobileBoardsMenu } from 'components/MobileBoardsMenu'
import { Fragment } from 'react'
import { classNames } from 'utils/styles/class-names'

export function Header() {
  return (
    <header className='flex p-4 pr-2 md:p-0 md:pl-6 md:pr-4 items-center bg-white dark:bg-gray-500 md:border-b border-gray-200 dark:border-gray-400'>
      <div className='mr-4 md:mr-0 flex items-center md:self-stretch md:border-r border-gray-200 dark:border-gray-400'>
        <div className='md:hidden'>
          <Image src='/assets/logo-mobile.svg' alt='' width={24} height={25} />
        </div>

        <div className='hidden md:block bg-logo-dark dark:bg-logo-light h-[25.22px] w-[152.53px] md:mr-6 lg:mr-28'></div>
      </div>

      <div className='flex-1 md:pl-6'>
        <MobileBoardsMenu />
        <h3 className='hidden md:block text-xl leading-[25px] lg:text-heading-xl'>
          Platform Launch
        </h3>
      </div>

      <div className='flex items-center md:py-4 lg:py-5'>
        <button
          className='mr-2 md:mr-4 bg-purple-500 hover:bg-purple-300 h-8 md:h-auto w-12 md:w-auto md:px-6 md:py-[14px] rounded-3xl transition-colors'
          aria-label='Add new task'
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

        <Menu as='div' className='relative inline-block text-left'>
          <Menu.Button className='p-2 rounded-full'>
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
      </div>
    </header>
  )
}
