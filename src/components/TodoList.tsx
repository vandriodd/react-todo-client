import { type TodoListType } from '../types.d'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: TodoListType
  onDelete: (id: number) => void
  onEdit: (id: number, newTitle: string, newDescription: string) => void
  onCopy: (titleToCopy: string, descriptionToCopy: string) => void
  onToggleCompleted: (id: number) => void
}

const TodoList = ({ todos, onDelete, onEdit, onCopy, onToggleCompleted }: TodoListProps) => {
  const todosToRender = todos.map((todo) => {
    return (
      <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} onCopy={onCopy} onToggleCompleted={onToggleCompleted} />
    )
  })

  return (
    <section className="todo-list">
      {todosToRender}
    </section>
  )
}

export default TodoList
