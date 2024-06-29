'use client'

import { updateTodoTitle } from '@/app/action/todo'
import { useState } from 'react'

type Props = {
  id: string
  title: string
  isCompleted: boolean
}

export const ServerTodoTitle = ({ id, title, isCompleted }: Props) => {
  const [isTitleEdit, setIsTitleEdit] = useState(false)
  const [editTitle, setEditTitle] = useState(title)

  const handleTitleEdit = async () => {
    if (isTitleEdit) {
      await updateTodoTitle(id, editTitle)
    }
    setIsTitleEdit(!isTitleEdit)
  }

  const handleCancelEdit = () => {
    setEditTitle(title)
    setIsTitleEdit(false)
  }

  return (
    <>
      <h2
        className={`font-bold ${
          isCompleted ? 'line-through text-gray-500' : ''
        }`}
      >
        제목:<span className='ml-1'>{title}</span>
      </h2>

      {isTitleEdit ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
            className='border rounded-md px-2'
          />
          <div className='mt-2 grid grid-cols-2 gap-x-1'>
            <button
              onClick={handleCancelEdit}
              className='w-full py-1 px-2 rounded-md border bg-red-500 text-white hover:bg-red-600 text-xs'
            >
              취소
            </button>
            <button
              onClick={handleTitleEdit}
              className='w-full py-1 px-2 rounded-md border bg-green-500 text-white hover:bg-green-600 text-xs'
            >
              완료
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={handleTitleEdit}
          className='py-1 px-2 rounded-md border bg-slate-500 text-white hover:bg-slate-600 text-xs w-full block'
        >
          제목 수정
        </button>
      )}
    </>
  )
}

export default ServerTodoTitle
