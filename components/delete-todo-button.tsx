type Props = {
  id: string
  onDelete: (id: string) => void
}

export const DeleteTodoButton = ({ id, onDelete }: Props) => {
  const handleDelete = async () => {
    try {
      onDelete(id)
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
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
