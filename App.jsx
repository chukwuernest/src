import { useEffect, useState } from 'react'

import './App.css'
import TodoList from './TodoList'
import AddTodoForm from '../AddTodoForm'

function App() {
  let [newTodo, setNewTodo] = useState('')
  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo])
    console.log(newTodo)
  }
  const useSemiPersistentState = () => {
    const savedTodoList = localStorage.getItem('savedTodoList')
    return savedTodoList ? JSON.parse(savedTodoList) : []
  }

  let [todoList, setTodoList] = useState(useSemiPersistentState)

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList))
    console.log(todoList)
  }, [todoList])

  return (
    <>
      <h1>Todo List</h1>
      <TodoList todoList={todoList} />
      <AddTodoForm onAddTodo={addTodo} />
      <p>{}</p>
    </>
  )
}

export default App
