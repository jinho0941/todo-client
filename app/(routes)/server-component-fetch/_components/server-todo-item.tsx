import { ServerTodoTitle } from './server-todo-title'
import { ServerTodoDescription } from './server-todo-description'
import { ServerCompletionTodoToggle } from './server-completion-todo-toggle'
import { ServerDeleteTodoButton } from './server-delete-todo-button'

type Props = {
  id: string
  title: string
  description: string
  completed: boolean
}

export const ServerTodoItem = ({
  id,
  title,
  description,
  completed,
}: Props) => {
  return (
    <li className='p-2 rounded-md bg-stone-200'>
      <ServerTodoTitle id={id} title={title} isCompleted={completed} />
      <ServerTodoDescription
        id={id}
        description={description}
        isCompleted={completed}
      />
      <div className='mt-2 grid grid-cols-2'>
        <ServerCompletionTodoToggle id={id} isCompleted={completed} />
        <ServerDeleteTodoButton id={id} />
      </div>
    </li>
  )
}
