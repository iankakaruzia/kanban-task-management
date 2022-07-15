import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import { classNames } from 'utils/styles/class-names'

type Option = {
  id: number
  name: string
}

type SelectProps = {
  label: string
  defaultOption?: Option
  options: Option[]
  className?: string
  onChange: (option: Option) => void
}

export function Select({
  label,
  options,
  defaultOption,
  className,
  onChange
}: SelectProps) {
  const [selectedOption, setSelectedOption] = useState(
    defaultOption ?? options[0]
  )

  useEffect(() => {
    onChange(selectedOption)
  }, [onChange, selectedOption])

  return (
    <div className={classNames(className && className, 'flex flex-col')}>
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <div className='relative mt-1'>
          <Listbox.Label className='mb-2 block text-gray-300 dark:text-white text-body-md'>
            {label}
          </Listbox.Label>
          <Listbox.Button className='relative w-full cursor-default rounded-lg bg-transparent py-2 pl-4 pr-10 text-left border border-gray-300 border-opacity-25 focus:outline-none focus-visible:border-purple-500 focus-visible:ring-1 focus-visible:ring-purple-500'>
            <span className='block truncate font-medium text-body-lg'>
              {selectedOption.name}
            </span>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4'>
              <Image
                src='/assets/icon-chevron-down.svg'
                alt=''
                width={10}
                height={7}
              />
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute py-4 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col gap-2 sm:text-sm'>
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none px-4',
                      active && 'bg-purple-500 bg-opacity-5'
                    )
                  }
                  value={option}
                >
                  <span className='block truncate font-medium text-body-lg text-gray-300'>
                    {option.name}
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
