import { Modal } from 'components/Modal'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { boardFormValidation } from 'utils/validations/form-validations'
import { Input } from 'components/Input'
import { DynamicItems } from 'components/DynamicItems'
import { Button } from 'components/Button'
import { trpc } from 'lib/trpc'
import { useBoard } from 'hooks'
import { compareStringArrays } from 'utils/functions/compare-string-arrays'

export const EditBoardModal = NiceModal.create(() => {
  const { board } = useBoard()
  const [name, setName] = useState(board?.name ?? '')
  const defaultColumns = board?.columns.map(({ name }) => name) ?? []
  const [columns, setColumns] = useState(defaultColumns)
  const [errors, setErrors] = useState<{
    [key: string]: string | Record<number, string>
  }>({})
  const modal = useModal()
  const utils = trpc.useContext()
  const mutation = trpc.useMutation('board.update-board', {
    onSuccess: () => {
      utils.invalidateQueries(['board.get-boards'])
      if (board) {
        utils.invalidateQueries([
          'board.get-board-tasks',
          { boardId: board.id }
        ])
      }
    }
  })

  function onClose() {
    setErrors({})
    modal.hide()
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()

    if (!board) {
      return
    }

    if (name === board.name && compareStringArrays(columns, defaultColumns)) {
      return
    }

    const { isValid, errors: formErrors } = boardFormValidation({
      name,
      columns
    })

    if (!isValid) {
      setErrors(formErrors)
      return
    }

    setErrors({})

    mutation.mutate(
      { name, columns, boardId: board.id },
      {
        onSuccess: () => {
          toast.success('Board updated successfully')
          onClose()
        }
      }
    )
  }

  return (
    <Modal isOpen={modal.visible} onClose={onClose} title='Edit Board'>
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

        <Button type='submit' className='mt-5' disabled={mutation.isLoading}>
          Save Changes
        </Button>
      </form>
    </Modal>
  )
})
