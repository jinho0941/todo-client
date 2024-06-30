'use client'

import useSWR, { mutate } from 'swr'

import { api } from '@/app/utils'
import { Loading } from '@/components/loading'
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

const fetcher = async (url: string) => {
  const response = await api.get(url)
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useSWR<Todo[]>('/todos', fetcher)

  const onCreate = async (title: string, description: string) => {
    try {
      const response = await api.post('/todos', { title, description })
      const newTodo = response.data
      mutate('/todos', (todos = []) => [newTodo, ...todos], false)
    } catch (error) {
      console.log(error)
    }
  }

  const onDelete = async (id: string) => {
    try {
      await api.delete(`/todos/${id}`)
      mutate(
        '/todos',
        (todos = []) => todos.filter((todo: Todo) => todo.id !== id),
        false,
      )
    } catch (error) {
      console.log(error)
    }
  }

  if (error) {
    return (
      <div className='bg-stone-200 min-h-screen text-black flex justify-center items-center'>
        Error: {error.message}
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-y-2'>
      <CreateTodoForm onCreate={onCreate} />
      <ul className='h-[300px] w-[300px] overflow-y-scroll overflow-x-hidden p-2 bg-slate-100 rounded-md space-y-4 relative'>
        {isLoading && <Loading />}
        {data &&
          data.map((todo) => (
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
