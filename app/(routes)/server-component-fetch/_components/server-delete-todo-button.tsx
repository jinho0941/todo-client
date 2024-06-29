'use client'

import { deleteTodo } from '@/app/action/todo'

type Props = {
  id: string
}

export const ServerDeleteTodoButton = ({ id }: Props) => {
  const handleDelete = async () => {
    await deleteTodo(id)
  }

  return (
    <button
      onClick={handleDelete}
      className='ml-2 py-1 px-2 rounded-md border bg-red-500 text-white hover:bg-red-600 text-xs'
    >
      삭제
    </button>
  )
}
