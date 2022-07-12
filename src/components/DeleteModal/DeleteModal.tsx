import { Modal } from 'components/Modal'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Button } from 'components/Button'

type DeleteModalProps = {
  content: string
  onDelete: () => void
}

export const DeleteModal = NiceModal.create<DeleteModalProps>(
  ({ content, onDelete }) => {
    const modal = useModal()

    function onClose() {
      modal.hide()
    }

    // TODO: Refactor logic to only close the modal only if request is successful
    function handleDelete() {
      onDelete()
      modal.hide()
    }

    return (
      <Modal
        isOpen={modal.visible}
        onClose={onClose}
        title='Delete this board?'
        titleClassNames='text-red-500'
      >
        <p className='text-gray-300 font-medium text-body-lg'>{content}</p>

        <div className='flex gap-4 mt-6'>
          <Button variant='danger' size='large' onClick={handleDelete}>
            Delete
          </Button>
          <Button variant='secondary' size='large' onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    )
  }
)
