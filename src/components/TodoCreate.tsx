import { ChangeEvent, FormEvent, useState } from 'react'

export interface TodoCreateProps {
  onCreate: (title: string, description: string) => void
}

const TodoCreate = ({ onCreate }: TodoCreateProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(false)

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (title.trim().length > 0 && description.trim().length > 0) {
      onCreate(title, description)
      setTitle('')
      setDescription('')
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <form onSubmit={handleSubmit} >
      <label>Title</label>
      <input className='title-input' value={title} onChange={handleTitleChange} />
      <label>Description</label>
      <input className='description-input' value={description} onChange={handleDescriptionChange} />
      <button>Add</button>
      { error && "You must fill both fields" }
    </form>
  )
}

export default TodoCreate
