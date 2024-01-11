import './index.css'
import { useState, useEffect } from 'react'
import { type Todo } from './types.d'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'


function App() {
  const initialTodos = JSON.parse(localStorage.getItem('todos') || '[]')
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleCreate = (title: string, description: string) => {
    setTodos((prevState) => [
      ...prevState,
      {
        id: Math.round(Math.random() * 99),
        title,
        description,
        completed: false
      }
    ])
  }

  const handleDelete = (id: number) => {
    setTodos((prevState) => prevState.filter((todo) => todo.id != id))
  }

  const handleEdit = (id: number, newTitle: string, newDescription: string) => {
    setTodos((prevState) => {
      return prevState.map((todo) => todo.id === id ? { ...todo, title: newTitle, description: newDescription } : todo )
    })
  }

  const handleCopy = (titleToCopy: string, descriptionToCopy: string) => {
    const contentToCopy = `${titleToCopy} - ${descriptionToCopy}`

    if (contentToCopy) {
      navigator.clipboard.writeText(contentToCopy)
      alert('Text copied to clipboard');
    } else {
      alert('Nothing to copy');
    }
  }

  const handleToggleComplete = (id: number) => {
    setTodos((prevState) => prevState.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo ))
  }

  return (
    <>
    <header>Todo list</header>
    <main className="app">
      <TodoCreate onCreate={handleCreate} />
      <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} onCopy={handleCopy} onToggleCompleted={handleToggleComplete} />
    </main>
    </>
  )
}

export default App
