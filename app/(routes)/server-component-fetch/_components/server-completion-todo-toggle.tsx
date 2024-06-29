'use client'

import { updateTodoCompletion } from '@/app/action/todo'

type Props = {
  id: string
  isCompleted: boolean
}

export const ServerCompletionTodoToggle = ({ id, isCompleted }: Props) => {
  const handleCompletionToggle = async () => {
    await updateTodoCompletion(id)
  }

  return (
    <button
      onClick={handleCompletionToggle}
      className={`py-1 px-2 rounded-md border text-xs ${
        isCompleted
          ? 'bg-sky-500 text-white'
          : 'bg-green-500 text-white hover:bg-green-600'
      }`}
      disabled={isCompleted}
    >
      {isCompleted ? '완료됨' : '목표 완료'}
    </button>
  )
}
