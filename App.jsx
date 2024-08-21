import { useEffect, useState } from 'react'

import './App.css'
import TodoList from './TodoList'
import AddTodoForm from '../AddTodoForm'

function App() {
  //  const useSemiPersistentState = () => {
  let [todoList, setTodoList] = useState([])
  let [isLoading, setIsLoading] = useState(true)

  async function fetchData() {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    }
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
      }))

      setTodoList(todos)
      setIsLoading(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const loadTodoList = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const savedTodoList = localStorage.getItem('savedTodoList')
          const initialList = savedTodoList ? JSON.parse(savedTodoList) : []
          resolve({ data: { todoList: initialList } })
        }, 2000)
      })
    }
    loadTodoList().then((result) => {
      setTodoList(result.data.todoList)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList))
      console.log(todoList)
    }
  }, [todoList, isLoading])

  // useEffect(() => {
  //   localStorage.setItem('savedTodoList', JSON.stringify(todoList))
  //   console.log(todoList)
  // }, [todoList])
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
  // return (
  //   <>
  //     <h1>Todo List</h1>
  //     <AddTodoForm onAddTodo={addTodo} />
  //     <p>{}</p>
  //     <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
  //   </>
  // )
  return (
    <>
      <h1>Todo List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodoForm onAddTodo={addTodo} />
          <p>{}</p>
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
      )}
    </>
  )
}

export default App
