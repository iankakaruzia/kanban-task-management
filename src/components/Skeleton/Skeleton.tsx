import { ReactNode } from 'react'
import { classNames } from 'utils/styles/class-names'

type SkeletonProps = {
  children: ReactNode
}

export function Skeleton({ children }: SkeletonProps) {
  return <div className='flex flex-col animate-pulse w-full'>{children}</div>
}

type SkeletonLineProps = {
  className?: string
}

Skeleton.Line = function SkeletonLine({ className }: SkeletonLineProps) {
  return (
    <div
      aria-label='Loading...'
      className={classNames(
        'bg-gray-300 bg-opacity-25 rounded-full',
        className && className
      )}
    />
  )
}
