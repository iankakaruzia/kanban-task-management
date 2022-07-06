import { Modal } from 'components/Modal'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { FormEvent, useState } from 'react'
import { addBoardFormValidation } from 'utils/validations/form-validations'
import { Input } from 'components/Input'
import { DynamicItems } from 'components/DynamicItems'

export const AddBoardModal = NiceModal.create(() => {
  const [name, setName] = useState('')
  const [columns, setColumns] = useState<string[]>([])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const modal = useModal()

  function onSubmit(event: FormEvent) {
    event.preventDefault()

    const { isValid, errors: formErrors } = addBoardFormValidation({
      name,
      columns
    })

    if (!isValid) {
      setErrors(formErrors)
      return
    }

    setErrors({})

    console.log({ name, columns })
  }

  return (
    <Modal
      isOpen={modal.visible}
      onClose={() => modal.hide()}
      title='Add New Board'
    >
      <form onSubmit={onSubmit}>
        <Input
          label='Board Name'
          placeholder='e.g Web Design'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />

        <DynamicItems
          label='Board Columns'
          addMoreLabel='+ Add New Column'
          onChange={(items) => setColumns(items)}
          className='mt-6'
        />

        <button
          type='submit'
          className='bg-purple-500 w-full text-white text-body-lg p-2 rounded-[20px] mt-5'
        >
          Create New Board
        </button>
      </form>
    </Modal>
  )
})
