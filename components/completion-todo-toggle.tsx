import { api } from '@/app/utils'

type Props = {
  id: string
  isCompleted: boolean
  onToggle: () => void
}

export const CompletionTodoToggle = ({ id, isCompleted, onToggle }: Props) => {
  const handleCompletionToggle = async () => {
    try {
      await api.patch(`/todos/${id}/completed`, { completed: !isCompleted })
      onToggle()
    } catch (error) {
      console.error('Error updating completion status:', error)
    }
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
