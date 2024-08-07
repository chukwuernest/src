import { useEffect, useState } from 'react'

import './App.css'
import TodoList from './TodoList'
import AddTodoForm from '../AddTodoForm'

function App() {
  //  const useSemiPersistentState = () => {
  let [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem('savedTodoList')
    return savedTodoList ? JSON.parse(savedTodoList) : []
  })

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList))
    console.log(todoList)
  }, [todoList])
  // let [newTodo, setNewTodo] = useState('')
  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo])
    console.log(newTodo)
  }
  // const useSemiPersistentState = () => {
  //   const savedTodoList = localStorage.getItem('savedTodoList')
  //   return savedTodoList ? JSON.parse(savedTodoList) : []
  // }

  // let [todoList, setTodoList] = useState(useSemiPersistentState())

  // useEffect(() => {
  //   localStorage.setItem('savedTodoList', JSON.stringify(todoList))
  //   console.log(todoList)
  // }, [todoList])

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((item) => item.id !== id)
    setTodoList(updatedTodoList)
  }
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <p>{}</p>
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  )
}

export default App
