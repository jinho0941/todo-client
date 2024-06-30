'use client'
import { useEffect, useState } from 'react'

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

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get<Todo[]>('/todos')
        setTodoList(response.data)
      } catch (error) {
        setError('Error fetching todo list')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTodos()
  }, [])

  const onCreate = async (title: string, description: string) => {
    try {
      const response = await api.post('/todos', { title, description })
      const todo = response.data
      setTodoList((prev) => [todo, ...prev])
    } catch (error) {
      console.log(error)
    }
  }

  const onDelete = async (id: string) => {
    try {
      await api.delete(`/todos/${id}`)
      setTodoList((prev) => prev.filter((todo) => todo.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  if (error) {
    return (
      <div className='bg-stone-200 min-h-screen text-black flex justify-center items-center'>
        Error: {error}
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-y-2'>
      <CreateTodoForm onCreate={onCreate} />
      <ul className='h-[300px] w-[300px] overflow-y-scroll overflow-x-hidden p-2 bg-slate-100 rounded-md space-y-4 relative'>
        {isLoading && <Loading />}
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
