'use client'

import { useEffect, useState } from 'react'
import { api } from './lib/utils'

export default function Home() {
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get('/todos')
        setTodoList(response.data)
      } catch (error) {
        console.error('Error fetching todo list:', error)
        setError('Error fetching todo list')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTodos()
  }, [])

  useEffect(() => {
    console.log(todoList)
  }, [todoList])

  const onCreate = async (title, description) => {
    try {
      const response = await api.post('/todos', { title, description })
      const todo = response.data
      setTodoList((prev) => [...prev, todo])
    } catch (error) {
      console.log(error)
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
        Error: {error}
      </div>
    )
  }

  return (
    <div className='bg-stone-200 min-h-screen text-black flex justify-center items-center'>
      <div className='flex flex-col gap-y-2'>
        <span>제목</span>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type='text'
          className='border rounded-lg border-black '
        />
        <span>설명</span>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='resize-none border rounded-lg border-black'
        />
        <button
          onClick={() => onCreate(title, description)}
          className='bg-stone-500 text-white rounded-lg hover:bg-stone-600'
        >
          생성
        </button>
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              {todo.title} {todo.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
