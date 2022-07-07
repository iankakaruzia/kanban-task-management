import { Modal } from 'components/Modal'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { FormEvent, useState } from 'react'
import { addBoardFormValidation } from 'utils/validations/form-validations'
import { Input } from 'components/Input'
import { DynamicItems } from 'components/DynamicItems'
import { Button } from 'components/Button'

export const AddBoardModal = NiceModal.create(() => {
  const [name, setName] = useState('')
  const [columns, setColumns] = useState<string[]>([])
  const [errors, setErrors] = useState<{
    [key: string]: string | Record<number, string>
  }>({})
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

  function onClose() {
    setName('')
    setColumns([])
    setErrors({})
    modal.hide()
  }

  return (
    <Modal isOpen={modal.visible} onClose={onClose} title='Add New Board'>
      <form onSubmit={onSubmit}>
        <Input
          label='Board Name'
          placeholder='e.g Web Design'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name as string}
        />

        <DynamicItems
          label='Board Columns'
          addMoreLabel='+ Add New Column'
          onChange={(items) => setColumns(items)}
          className='mt-6'
          errors={errors.columns}
        />

        <Button type='submit' className='mt-5'>
          Create New Board
        </Button>
      </form>
    </Modal>
  )
})
