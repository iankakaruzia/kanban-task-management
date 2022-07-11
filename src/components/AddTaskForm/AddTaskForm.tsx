import { Modal } from 'components/Modal'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { taskFormValidation } from 'utils/validations/form-validations'
import { Input } from 'components/Input'
import { DynamicItems } from 'components/DynamicItems'
import { Button } from 'components/Button'
import { trpc } from 'lib/trpc'
import { useBoard } from 'hooks'
import { Textarea } from 'components/Textarea'
import { Select } from 'components/Select'

export const AddTaskModal = NiceModal.create(() => {
  const { board } = useBoard()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<{ id: number; name: string } | null>(
    null
  )
  const [subtasks, setSubtasks] = useState<string[]>([])
  const [errors, setErrors] = useState<{
    [key: string]: string | Record<number, string>
  }>({})
  const modal = useModal()
  const utils = trpc.useContext()
  const { data } = trpc.useQuery(
    ['column.get-columns', { boardId: board?.id as number }],
    {
      enabled: !!board?.id
    }
  )
  const mutation = trpc.useMutation('task.create-task', {
    onSuccess: () => {
      if (board) {
        utils.invalidateQueries([
          'board.get-board-tasks',
          { boardId: board.id }
        ])
      }
    }
  })

  function onClose() {
    setTitle('')
    setDescription('')
    setSubtasks([])
    setErrors({})
    modal.hide()
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()

    if (!status) {
      return
    }

    const { isValid, errors: formErrors } = taskFormValidation({
      title,
      description,
      status,
      subtasks
    })

    if (!isValid) {
      setErrors(formErrors)
      return
    }

    setErrors({})

    mutation.mutate(
      { title, subtasks, description, columnId: status.id },
      {
        onSuccess: () => {
          toast.success('Task created successfully')
          onClose()
        }
      }
    )
  }

  return (
    <Modal isOpen={modal.visible} onClose={onClose} title='Add New Task'>
      <form onSubmit={onSubmit}>
        <Input
          label='Title'
          placeholder='e.g. Take coffee break'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title as string}
        />

        <Textarea
          label='Description'
          placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
          id='description'
          value={description}
          className='mt-6'
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description as string}
        />

        <DynamicItems
          label='Subtasks'
          addMoreLabel='+ Add New Subtask'
          onChange={(items) => setSubtasks(items)}
          className='mt-6'
          errors={errors.subtasks}
        />

        {data?.columns && (
          <Select
            options={data.columns}
            label='Status'
            onChange={(option) => setStatus(option)}
            className='mt-6'
          />
        )}

        <Button type='submit' className='mt-5' disabled={mutation.isLoading}>
          Create Task
        </Button>
      </form>
    </Modal>
  )
})
