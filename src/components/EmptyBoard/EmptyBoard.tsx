import { Button } from 'components/Button'

export function EmptyBoard() {
  return (
    <div className='flex h-full flex-col items-center justify-center px-4'>
      <strong className='text-center mb-6 text-heading-lg text-gray-300'>
        This board is empty. Create a new column to get started.
      </strong>
      <Button className='w-fit' size='large'>
        + Add New Column
      </Button>
    </div>
  )
}
