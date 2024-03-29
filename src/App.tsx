import './index.css'
import { useState, useEffect } from 'react'
import { type TodoListType } from './types.d'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'


function App() {
  const initialTodos = JSON.parse(localStorage.getItem('todos') || '[]')
  const [todos, setTodos] = useState<TodoListType>(initialTodos)

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

  const handleToggleComplete = (id: number) => {
    setTodos((prevState) => prevState.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo ))
  }

  return (
    <>
    <header>Todo list</header>
    <main className="app">
      <TodoCreate onCreate={handleCreate} />
      <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} onToggleCompleted={handleToggleComplete} />
    </main>
    </>
  )
}

export default App
