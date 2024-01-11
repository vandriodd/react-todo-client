import { FormEvent, useState } from 'react'
import { type Todo } from '../types.d'

export interface TodoItemProps {
  todo: Todo
  onDelete: (id: number) => void
  onEdit: (id: number, newTitle: string, newDescription: string) => void
  onCopy: (titleToCopy: string, descriptionToCopy: string) => void
  onToggleCompleted: (id: number) => void
}

const TodoItem = ({ todo, onDelete, onEdit, onCopy, onToggleCompleted }: TodoItemProps) => {
  const [edit, setEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(todo.title)
  const [newDescription, setNewDescription] = useState(todo.description)
  const [error, setError] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (newTitle.trim().length > 0 && newDescription.trim().length > 0) {
      onEdit(todo.id, newTitle, newDescription)
      setError(false)
      setEdit(false)
    } else {
      setError(true)
    }
  }

  return (
    <>
    {!edit ? (
      <article className="todo-item">
        <div className="buttons">
          <button className="edit" onClick={() => setEdit(!edit)}>Edit</button>
          <button className="delete" onClick={() => onDelete(todo.id)}>Delete</button>
          <button className="copy" onClick={() => onCopy(todo.title, todo.description)}>Copy</button>
          <label className="checkbox">
            <input type="checkbox" checked={todo.completed} onChange={() => onToggleCompleted(todo.id)} />
          </label>
        </div>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </article>
    ) : (
      <form className="edit-form" onSubmit={handleSubmit}>
        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        <button>Save</button>
        { error && "Title and description cannot be empty" }
      </form>
    )
    }
    </>
  )
}

export default TodoItem
