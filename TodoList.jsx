import React from 'react'
import TodoListitem from './TodoListitem'

// const todoList = [
//   {
//     id: 1,
//     title: 'cleaning',
//   },
//   {
//     id: 2,
//     title: 'painting',
//   },
//   {
//     id: 3,
//     title: 'shopping',
//   },
//   {
//     id: 4,
//     title: ' cooking',
//   },
// ]

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <div>
      <ul>
        {todoList.map((item) => (
          <TodoListitem
            key={item.id}
            title={item.title}
            id={item.id}
            onRemoveTodo={onRemoveTodo}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList
