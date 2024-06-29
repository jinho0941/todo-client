'use client'

import { useQuery, useMutation, useQueryClient } from 'react-query'

import { api } from '@/app/utils'
import { TodoItem } from '@/components/todo-item'
import { CreateTodoForm } from '@/components/create-todo-form'

export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

interface CreateTodoInput {
  title: string
  description: string
}

export default function Home() {
  const queryClient = useQueryClient()

  const {
    data: todoList = [],
    isLoading,
    error,
  } = useQuery<Todo[]>('todos', async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>('/todos')
    return response.data
  })

  const createTodoMutation = useMutation<Todo, unknown, CreateTodoInput>(
    async ({ title, description }: CreateTodoInput) => {
      const response = await api.post<Todo>('/todos', { title, description })
      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos')
      },
    },
  )

  const deleteTodoMutation = useMutation<unknown, unknown, string>(
    async (id: string) => {
      await api.delete(`/todos/${id}`)
    },
    {
      onSuccess: (_, id) => {
        queryClient.setQueryData<Todo[]>('todos', (oldTodos) =>
          oldTodos ? oldTodos.filter((todo) => todo.id !== id) : [],
        )
      },
    },
  )

  const onCreate = async (title: string, description: string) => {
    try {
      await createTodoMutation.mutateAsync({ title, description })
    } catch (error) {
      console.error(error)
    }
  }

  const onDelete = async (id: string) => {
    try {
      await deleteTodoMutation.mutateAsync(id)
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <div className='bg-stone-200 min-h-screen text-black flex justify-center items-center'>
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className='bg-stone-200 min-h-screen text-black flex justify-center items-center'>
        Error: {(error as Error).message}
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-y-2'>
      <CreateTodoForm onCreate={onCreate} />
      <ul className='h-[300px] w-[300px] overflow-y-scroll overflow-x-hidden p-2 bg-slate-100 rounded-md space-y-4'>
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            onDelete={onDelete}
            completed={todo.completed}
          />
        ))}
      </ul>
    </div>
  )
}
