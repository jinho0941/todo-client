import { api } from '@/app/utils'
import { ServerCreateTodoForm } from './_components/server-create-todo-form'
import { ServerTodoItem } from './_components/server-todo-item'

export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export default async function Home() {
  const response = await api.get<Todo[]>('/todos')
  const todoList = response.data

  return (
    <div className='flex flex-col gap-y-2'>
      <ServerCreateTodoForm />
      <ul className='h-[300px] w-[300px] overflow-y-scroll overflow-x-hidden p-2 bg-slate-100 rounded-md space-y-4'>
        {todoList.map((todo) => (
          <ServerTodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
          />
        ))}
      </ul>
    </div>
  )
}
