import { type TodoListType } from '../types.d'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: TodoListType
  onDelete: (id: number) => void
  onEdit: (id: number, newTitle: string, newDescription: string) => void
  onToggleCompleted: (id: number) => void
}

const TodoList = ({ todos, onDelete, onEdit, onToggleCompleted }: TodoListProps) => {
  const todosToRender = todos.map((todo) => {
    return (
      <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} onToggleCompleted={onToggleCompleted} />
    )
  })

  return (
    <section className="todo-list">
      {todosToRender}
    </section>
  )
}

export default TodoList
