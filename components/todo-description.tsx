import { useState } from 'react'

import { api } from '@/app/utils'

type Props = {
  id: string
  description: string
  isCompleted: boolean
  onUpdate: (newDescription: string) => void
}

export const TodoDescription = ({
  id,
  description,
  isCompleted,
  onUpdate,
}: Props) => {
  const [isDescriptionEdit, setIsDescriptionEdit] = useState(false)
  const [editDescription, setEditDescription] = useState(description)

  const handleDescriptionEdit = async () => {
    if (isDescriptionEdit) {
      try {
        await api.patch(`/todos/${id}/description`, {
          description: editDescription,
        })
        onUpdate(editDescription)
      } catch (error) {
        console.error('Error updating description:', error)
      }
    }
    setIsDescriptionEdit(!isDescriptionEdit)
  }

  const handleCancelEdit = () => {
    setEditDescription(description)
    setIsDescriptionEdit(false)
  }

  return (
    <>
      <p
        className={`break-words ${
          isCompleted ? 'line-through text-gray-500' : ''
        }`}
      >
        내용:<span className='ml-1'>{description}</span>
      </p>

      {isDescriptionEdit ? (
        <>
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            autoFocus
            className='border rounded-md px-2 w-full'
          />
          <div className='mt-2 grid grid-cols-2 gap-x-1'>
            <button
              onClick={handleCancelEdit}
              className='w-full py-1 px-2 rounded-md border bg-red-500 text-white hover:bg-red-600 text-xs'
            >
              취소
            </button>
            <button
              onClick={handleDescriptionEdit}
              className='w-full py-1 px-2 rounded-md border bg-green-500 text-white hover:bg-green-600 text-xs'
            >
              완료
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => setIsDescriptionEdit(true)}
          className='py-1 px-2 rounded-md border bg-zinc-500 text-white hover:bg-zinc-600 text-xs w-full block'
        >
          내용 수정
        </button>
      )}
    </>
  )
}

export default TodoDescription
