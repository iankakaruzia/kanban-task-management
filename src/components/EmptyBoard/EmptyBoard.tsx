import NiceModal from '@ebay/nice-modal-react'
import { Button } from 'components/Button'
import { EditBoardModal } from 'components/EditBoardForm'

export function EmptyBoard() {
  function showEditBoardFormModal() {
    NiceModal.show('edit-board-form-modal')
  }

  return (
    <>
      <div className='flex h-full flex-col items-center justify-center px-4'>
        <strong className='text-center mb-6 text-heading-lg text-gray-300'>
          This board is empty. Create a new column to get started.
        </strong>
        <Button onClick={showEditBoardFormModal} className='w-fit' size='large'>
          + Add New Column
        </Button>
      </div>

      <EditBoardModal id='edit-board-form-modal' />
    </>
  )
}
