'use client'

import { createTodo } from '@/app/action/todo'
import { useState } from 'react'

export const ServerCreateTodoForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    await createTodo(title, description)
    e.preventDefault()
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-y-2'>
      <span>제목</span>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type='text'
        className='border rounded-lg border-black p-2'
      />
      <span>설명</span>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className='resize-none border rounded-lg border-black p-2'
      />
      <button
        type='submit'
        className='bg-stone-500 text-white rounded-lg hover:bg-stone-600'
      >
        생성
      </button>
    </form>
  )
}
