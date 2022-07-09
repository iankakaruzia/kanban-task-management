import { ButtonHTMLAttributes } from 'react'
import { classNames } from 'utils/styles/class-names'

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'large'
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  variant = 'primary',
  size = 'small',
  children,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'w-full transition-all',
        variant === 'primary' && 'bg-purple-500 hover:bg-purple-300 text-white',
        variant === 'secondary' &&
          'bg-purple-500 bg-opacity-10 hover:bg-opacity-25 hover:bg-purple-300 dark:bg-white dark:hover:bg-opacity-95 text-purple-500',
        variant === 'danger' && 'bg-red-500 hover:bg-red-300 text-white',
        size === 'small' && 'rounded-[20px] text-body-lg p-2',
        size === 'large' && 'rounded-3xl text-heading-md py-[14px] px-[18px]',
        className && className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
