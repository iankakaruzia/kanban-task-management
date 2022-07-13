import { Dialog, Transition } from '@headlessui/react'
import { Skeleton } from 'components/Skeleton'
import { Fragment, ReactNode } from 'react'
import { classNames } from 'utils/styles/class-names'

type ModalProps = {
  isOpen: boolean
  title?: string
  isLoading?: boolean
  onClose: () => void
  children: ReactNode
  titleClassNames?: string
}

export function Modal({
  isOpen,
  title = '',
  isLoading = false,
  onClose,
  children,
  titleClassNames
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-30' onClose={onClose}>
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
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-[480px] transform rounded-2xl bg-white dark:bg-gray-500 p-6 md:p-8 text-left align-middle shadow-xl transition-all'>
                {(title || isLoading) && (
                  <Dialog.Title
                    as='h3'
                    className={classNames(
                      'text-heading-lg mb-6',
                      titleClassNames && titleClassNames
                    )}
                  >
                    {isLoading ? (
                      <Skeleton>
                        <Skeleton.Line className='w-40 h-6' />
                      </Skeleton>
                    ) : (
                      title
                    )}
                  </Dialog.Title>
                )}

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
