import { TextareaHTMLAttributes } from 'react'
import { classNames } from 'utils/styles/class-names'

type TextareaProps = {
  label: string
  id: string
  error?: string
} & TextareaHTMLAttributes<Omit<HTMLTextAreaElement, 'id'>>

export function Textarea({
  label,
  id,
  className,
  error,
  ...props
}: TextareaProps) {
  return (
    <div className={classNames(className && className, 'flex flex-col')}>
      <label
        htmlFor={id}
        className='mb-2 text-gray-300 dark:text-white text-body-md'
      >
        {label}
      </label>
      <div className='relative'>
        <textarea
          id={id}
          {...props}
          className={classNames(
            'w-full bg-transparent py-2 px-4 min-h-[112px] resize-y text-body-lg placeholder:text-[#00011225] placeholder:dark:text-[#FFFFFF25] rounded border-gray-300 border-opacity-25 focus:border-purple-500 focus:ring-0',
            error && 'border-red-500 pr-28'
          )}
        />
        {error && (
          <span className='text-red-500 flex absolute font-medium text-body-lg top-2 right-4'>
            {error}
          </span>
        )}
      </div>
    </div>
  )
}
