import { useState } from 'react'
import { classNames } from 'utils/styles/class-names'

type DynamicItemsProps = {
  initialItems?: string[]
  label: string
  onChange: (items: string[]) => void
  className?: string
  addMoreLabel: string
}

export function DynamicItems({
  initialItems,
  label,
  onChange,
  className,
  addMoreLabel
}: DynamicItemsProps) {
  const [items, setItems] = useState(initialItems ?? [''])

  function addNewItem() {
    setItems([...items, ''])
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index))
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
          <input
            type='text'
            className={classNames(
              'w-full bg-transparent py-2 px-4 text-body-lg placeholder:text-[#00011225] placeholder:dark:text-[#FFFFFF25] rounded border-gray-300 border-opacity-25 focus:ring-gray-300 focus:border-none'
            )}
            value={item}
            onChange={(e) => onChangeItem(index, e.target.value)}
          />
          <button
            className='ml-2 p-2'
            type='button'
            aria-label={`Remove item ${item}`}
            onClick={() => removeItem(index)}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15'>
              <g fill='#828FA3' fillRule='evenodd'>
                <path d='M12.728 0l2.122 2.122L2.122 14.85 0 12.728z'></path>
                <path d='M0 2.122L2.122 0 14.85 12.728l-2.122 2.122z'></path>
              </g>
            </svg>
          </button>
        </div>
      ))}

      <button
        className='bg-purple-500 bg-opacity-10 dark:bg-white w-full text-purple-500 text-body-lg p-2 rounded-[20px]'
        onClick={addNewItem}
        type='button'
      >
        {addMoreLabel}
      </button>
    </div>
  )
}
