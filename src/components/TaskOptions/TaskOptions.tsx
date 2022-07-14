import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'
import { classNames } from 'utils/styles/class-names'

type TaskOptionsProps = {
  isLoading: boolean
}

export function TaskOptions({ isLoading }: TaskOptionsProps) {
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
    </>
  )
}
