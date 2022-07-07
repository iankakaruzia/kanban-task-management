import { Button } from 'components/Button/Button'
import { useState } from 'react'
import { classNames } from 'utils/styles/class-names'

type DynamicItemsProps = {
  initialItems?: string[]
  label: string
  onChange: (items: string[]) => void
  className?: string
  addMoreLabel: string
  errors?: Record<number, string>
}

export function DynamicItems({
  initialItems,
  label,
  onChange,
  className,
  addMoreLabel,
  errors
}: DynamicItemsProps) {
  const [items, setItems] = useState(initialItems ?? [''])

  function addNewItem() {
    const itemsAfterAddition = [...items, '']
    setItems(itemsAfterAddition)
    onChange(itemsAfterAddition)
  }

  function removeItem(index: number) {
    const itemsAfterRemoval = items.filter((_, i) => i !== index)
    setItems(itemsAfterRemoval)
    onChange(itemsAfterRemoval)
  }

  function onChangeItem(index: number, value: string) {
    const updatedItems = items.map((item, i) => (i === index ? value : item))
    setItems(updatedItems)
    onChange(updatedItems)
  }

  return (
    <div className={classNames(className && className)}>
      <span
        aria-label={label}
        className='mb-2 block text-gray-300 dark:text-white text-body-md'
      >
        {label}
      </span>

      {items.map((item, index) => (
        <div key={index} className='flex items-center mb-[12px]'>
          <div className='relative flex-1'>
            <input
              type='text'
              className={classNames(
                'w-full bg-transparent py-2 px-4 text-body-lg placeholder:text-[#00011225] placeholder:dark:text-[#FFFFFF25] rounded border-gray-300 border-opacity-25 focus:border-purple-500 focus:ring-0',
                errors && errors[index] && 'border-red-500 pr-28'
              )}
              value={item}
              onChange={(e) => onChangeItem(index, e.target.value)}
            />
            {errors && errors[index] && (
              <span className='text-red-500 flex absolute font-medium text-body-lg top-2 right-4'>
                {errors[index]}
              </span>
            )}
          </div>
          <button
            className='ml-2 p-2 group'
            type='button'
            aria-label={`Remove item ${item}`}
            onClick={() => removeItem(index)}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15'>
              <g
                className='fill-gray-300 group-hover:fill-red-500 group-focus:fill-red-500 transition-colors'
                fillRule='evenodd'
              >
                <path d='M12.728 0l2.122 2.122L2.122 14.85 0 12.728z'></path>
                <path d='M0 2.122L2.122 0 14.85 12.728l-2.122 2.122z'></path>
              </g>
            </svg>
          </button>
        </div>
      ))}

      <Button onClick={addNewItem} variant='secondary'>
        {addMoreLabel}
      </Button>
    </div>
  )
}
